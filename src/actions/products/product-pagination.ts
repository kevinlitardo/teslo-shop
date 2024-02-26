'use server';

import prisma from '@/lib/prisma';
import { Gender } from '@prisma/client';

interface PaginationOptions {
  page?: number;
  take?: number;
  gender?: Gender;
}

export const get_paginated_products_with_images = async ({
  page = 1,
  take = 12,
  gender
}: PaginationOptions) => {
  if (isNaN(Number(page))) page = 1;

  if (page < 1) page = 1;

  try {
    // 1. Obtener productos
    const products = await prisma.product.findMany({
      take,
      skip: (page - 1) * take,
      // ? Filtro por género
      where: {
        gender: gender
      },
      include: {
        product_image: {
          take: 2,
          select: {
            url: true,
            id: true
          }
        }
      }
    });

    // 2. Obtener total de páginas
    // todo:
    const count = await prisma.product.count({
      // ? Filtro por género
      where: {
        gender: gender
      }
    });

    const total_pages = Math.ceil(count / take);

    return {
      total_pages,
      products: products.map(({ product_image, ...product }) => ({
        ...product,
        images: product_image
      }))
    };
  } catch (error) {
    throw new Error('La categoría no existe');
  }
};
