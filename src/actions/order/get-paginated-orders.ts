'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

export async function get_paginated_orders() {
  try {
    const session = await auth();

    if (session?.user.role !== 'admin')
      throw new Error('Debes ser administrador');

    const orders = await prisma.order.findMany({
      orderBy: {
        created_at: 'desc'
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

    return {
      ok: true,
      orders
    };
  } catch (error) {
    console.log(error);
    throw new Error('No se pudieron obtener las ordenes');
  }
}
