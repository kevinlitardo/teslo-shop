'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

export async function get_paginated_users() {
  try {
    const session = await auth();

    if (session?.user.role !== 'admin')
      throw new Error('Debes ser administrador');

    const users = await prisma.user.findMany({ orderBy: { name: 'desc' } });

    return {
      ok: true,
      users
    };
  } catch (error) {
    console.log(error);
    throw new Error('No se pudieron obtener las ordenes');
  }
}
