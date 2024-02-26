'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

export async function get_orders_by_user() {
  try {
    const session = await auth();

    if (!session) throw new Error('Necesitas estar autenticado');

    const orders = await prisma.order.findMany({
      where: {
        user_id: session.user.id
      },
      include: {
        order_address: {
          select: {
            first_name: true,
            last_name: true
          }
        }
      }
    });

    return orders;
  } catch (error) {
    console.log(error);
    throw new Error('No se pudieron obtener las ordenes de este usuario');
  }
}
