'use server';

import prisma from '@/lib/prisma';

export async function delete_user_addess(user_id: string) {
  try {
    await prisma.userAddress.delete({
      where: {
        user_id
      }
    });
  } catch (error) {
    console.log(error);
    throw new Error('No se pudo eliminar la dirección del usuario');
  }
}
