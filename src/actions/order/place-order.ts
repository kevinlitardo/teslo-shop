'use server';

import { auth } from '@/auth.config';
import { ProductSizes, UserAddress } from '@/interfaces';
import prisma from '@/lib/prisma';

interface Product_to_order {
  product_id: string;
  quantity: number;
  size: ProductSizes;
}

export async function placer_order(
  products_ids: Product_to_order[],
  address: UserAddress
) {
  try {
    const session = await auth();
    const user_id = session?.user.id;

    // verificar sesión de user
    if (!user_id)
      return { ok: false, code: 500, message: 'No hay sesión de usuario' };

    // obtener info de productos
    // pueden tener mismo id (por que hay tallas)
    const products = await prisma.product.findMany({
      where: {
        id: {
          in: products_ids.map((item) => item.product_id)
        }
      }
    });

    const quantity = products_ids.reduce((acc, el) => {
      return acc + el.quantity;
    }, 0);

    const { sub_total, tax, total } = products_ids.reduce(
      (acc, el) => {
        const quantity = el.quantity;
        const product = products.find((item) => item.id === el.product_id);

        if (!product)
          throw new Error(`El producto con id "${el.product_id}" no existe`);

        const sub_total = product.price * quantity;

        acc.sub_total += sub_total;
        acc.tax += sub_total * 0.15;
        acc.total += sub_total * 1.15;

        return acc;
      },
      { sub_total: 0, tax: 0, total: 0 }
    );

    // transacción con db
    const prisma_tx = await prisma.$transaction(async (tx) => {
      // 1. actualizar el stock de los productos

      const updated_products_promises = products.map((item) => {
        // acumular valroes
        const product_quantity = products_ids
          .filter((p) => p.product_id === item.id)
          .reduce((acc, el) => el.quantity + acc, 0);

        if (product_quantity === 0)
          throw new Error(
            `El producto ${item.title} no tiene cantidad definida`
          );

        return tx.product.update({
          where: { id: item.id },
          data: { in_stock: { decrement: product_quantity } }
        });
      });

      const updated_product = await Promise.all(updated_products_promises);

      // verificar valores negativos en stock

      updated_product.forEach((item) => {
        if (item.in_stock < 0)
          throw new Error(`${item.title} no tiene inventario suficiente`);
      });

      // 2. crear la orden (encabezado - detalle)

      const order = await tx.order.create({
        data: {
          user_id,
          quantity,
          sub_total,
          tax,
          total,
          order_items: {
            createMany: {
              data: products_ids.map((item) => ({
                quantity: item.quantity,
                size: item.size,
                product_id: item.product_id,
                price: products.find((p) => p.id === item.product_id)?.price!
              }))
            }
          }
        }
      });

      // 3. crear la dirección de la orden

      const { country, ...rest } = address;

      const order_address = await tx.orderAddress.create({
        data: {
          ...rest,
          country_id: country,
          order_id: order.id
        }
      });

      return {
        order,
        order_address
      };
    });

    return {
      ok: true,
      message: 'Transacción completa con éxito',
      order: prisma_tx.order,
      transaction: prisma_tx
    };
  } catch (error: any) {
    console.log(error);
    return {
      ok: false,
      message: error.message
    };
  }
}
