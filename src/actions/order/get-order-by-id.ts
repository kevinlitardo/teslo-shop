'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

export async function get_order_by_id(order_id: string) {
  const session = await auth();

  if (!session) throw new Error('Debe de estar autenticado');

  try {
    const order = await prisma.order.findFirst({
      where: { id: order_id },
      select: {
        id: true,
        quantity: true,
        sub_total: true,
        tax: true,
        total: true,
        order_address: true,
        user_id: true,
        is_paid: true,
        order_items: {
          select: {
            id: true,
            price: true,
            quantity: true,
            size: true,
            product: {
              select: {
                slug: true,
                title: true,
                product_image: {
                  select: { url: true, id: true },
                  take: 1
                }
              }
            }
          }
        }
      }
    });

    if (!order) throw new Error(`La orden ${order_id} no existe`);

    if (session.user.role === 'user') {
      if (session.user.id !== order.user_id) {
        throw new Error(`Orden no perteneciente al usuario`);
      }
    }

    return order;
  } catch (error) {
    console.log(error);
    throw new Error(`La orden ${order_id} no existe`);
  }
}
