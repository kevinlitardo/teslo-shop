'use server';

import prisma from '@/lib/prisma';

export const get_product_by_slug = async (slug: string) => {
  try {
    const product = await prisma.product.findFirst({
      include: {
        product_image: {
          select: {
            url: true,
            id: true
          }
        }
      },
      where: {
        slug
      }
    });

    if (!product) return null;

    const { product_image, ...rest } = product;

    return {
      ...rest,
      images: product_image
    };
  } catch (error) {
    console.log(error);
    throw new Error('Error al obtener producto por slug');
  }
};
