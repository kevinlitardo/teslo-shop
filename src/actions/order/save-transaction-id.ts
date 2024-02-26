'use server';

import prisma from '@/lib/prisma';

export async function save_transaction_id(
  order_id: string,
  transaction_id: string
) {
  try {
    const order = await prisma.order.update({
      where: {
        id: order_id
      },
      data: {
        transaction_id
      }
    });

    if (!order)
      return {
        ok: false,
        message: `No existe la orden ${order_id}`
      };

    return {
      ok: true,
      message: 'Trasacción completada'
    };
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      message: 'No se pudo realizar la transacción'
    };
  }
}
