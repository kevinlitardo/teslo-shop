'use server';

import prisma from '@/lib/prisma';
import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from 'next/cache';
cloudinary.config(process.env.CLOUDINARY_URL ?? '');

export async function remove_image(id: string, url: string) {
  try {
    if (!url.startsWith('http'))
      throw new Error('No se pueden borrar imagenes del file system');

    const img_name = url.split('/').pop()?.split('.')[0] ?? '';

    await cloudinary.api.delete_resources([img_name]);
    const deleted_image = await prisma.productImage.delete({
      where: { id },
      select: { product: { select: { slug: true } } }
    });

    revalidatePath('/admin/products');
    revalidatePath(`/admin/product/${deleted_image.product.slug}`);
    revalidatePath(`/product/${deleted_image.product.slug}`);
  } catch (error) {
    console.log(error);
    throw new Error('No se pudo eliminar la imagen');
  }
}
