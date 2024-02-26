'use server';

import prisma from '@/lib/prisma';

export async function get_user_address(userId: string) {
  try {
    const address = await prisma.userAddress.findUnique({
      where: {
        user_id: userId
      }
    });

    if (!address) return null;

    const { id, country_id, user_id, ...rest } = address;

    return {
      ...rest,
      country: country_id
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}
