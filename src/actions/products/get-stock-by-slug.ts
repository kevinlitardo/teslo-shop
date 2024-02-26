'use server';

import prisma from '@/lib/prisma';

export const get_stock_by_slug = async (slug: string) => {
  try {
    const stock = await prisma.product.findFirst({
      where: {
        slug
      },
      select: {
        in_stock: true
      }
    });

    return stock?.in_stock ?? 0;
  } catch (error) {
    console.log(error);
    return 0;
  }
};
