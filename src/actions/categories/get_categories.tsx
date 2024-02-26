'use server';

import prisma from '@/lib/prisma';

export async function get_categories() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: 'desc'
      }
    });
    return categories;
  } catch (error) {
    return [];
  }
}
