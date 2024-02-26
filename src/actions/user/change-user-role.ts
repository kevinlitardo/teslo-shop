'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';
import { Role } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export async function change_user_role(user_id: string, role: Role) {
  try {
    const session = await auth();

    if (!session) {
      return {
        ok: false,
        message: 'Debes estar autenticado'
      };
    }

    if (role !== 'admin' && role !== 'user') {
      return {
        ok: false,
        message: 'Rol no válido'
      };
    }

    await prisma.user.update({
      where: {
        id: user_id
      },
      data: {
        role
      }
    });

    revalidatePath('/admin/users');

    return {
      ok: true
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'No se pudo actualizar el usuario'
    };
  }
}
