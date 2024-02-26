'use server';

import prisma from '@/lib/prisma';

export async function get_countries() {
  try {
    const countries = await prisma.country.findMany({
      orderBy: {
        name: 'asc'
      }
    });

    return countries;
  } catch (error) {
    console.log({ error });
    return [];
  }
}
