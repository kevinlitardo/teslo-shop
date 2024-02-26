'use server';

import { Gender, Product, Size } from '@prisma/client';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config(process.env.CLOUDINARY_URL ?? '');

const product_schema = z.object({
  id: z.string().uuid().optional().nullable(),
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  description: z.string(),
  price: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(2))),
  in_stock: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(0))),
  category_id: z.string().uuid(),
  sizes: z.coerce.string().transform((val) => val.split(',')),
  tags: z.string(),
  gender: z.nativeEnum(Gender)
});

export async function create_product(form_data: FormData) {
  try {
    const data = Object.fromEntries(form_data);

    const product_parsed = product_schema.safeParse(data);

    if (!product_parsed.success) {
      console.log(product_parsed.error);
      return {
        ok: false,
        message: 'Esquema de producto no coincide'
      };
    }

    const fd_images = form_data.getAll('images') as File[];

    if (fd_images.length === 0) {
      return {
        ok: false,
        message: 'Necesita adjuntar al menos una imagen'
      };
    }

    const product = product_parsed.data;
    product.slug = product.slug.toLowerCase().replace(/\s/g, '_').trim();

    const { id, ...rest } = product;

    const prisma_tx = await prisma.$transaction(async () => {
      let product: Product;
      const tags_arr = rest.tags.split(',').map((t) => t.trim().toLowerCase());

      // Actualización
      if (id) {
        product = await prisma.product.update({
          where: { id },
          data: {
            ...rest,
            sizes: {
              set: rest.sizes as Size[]
            },
            tags: {
              set: tags_arr
            }
          }
        });

        const images = await upload_images(fd_images);

        if (images === null || images.length === 0) {
          throw new Error('No se pudieron guardar las imágenes');
        }

        await prisma.productImage.createMany({
          data: images.map((img) => ({ url: img!, product_id: product.id }))
        });

        return {
          ok: true,
          product
        };
      }

      // Crear
      product = await prisma.product.create({
        data: {
          ...rest,
          sizes: {
            set: rest.sizes as Size[]
          },
          tags: {
            set: tags_arr
          }
        }
      });

      const images = await upload_images(fd_images);

      if (images === null || images.length === 0) {
        throw new Error('No se pudieron guardar las imágenes');
      }

      await prisma.productImage.createMany({
        data: images.map((img) => ({ url: img!, product_id: product.id }))
      });

      return { product };
    });

    revalidatePath('/admin/products');
    revalidatePath(`/admin/products/${product.slug}`);
    revalidatePath(`/products/${product.slug}`);

    return {
      ok: true,
      product: prisma_tx.product
    };
  } catch (error) {
    console.log(error);
    return { ok: false, message: 'No se pudo actualizar el producto' };
  }
}

async function upload_images(images: File[]) {
  try {
    const upload_promises = images.map(async (img) => {
      try {
        const buffer = await img.arrayBuffer();
        const base_64_img = Buffer.from(buffer).toString('base64');
        return cloudinary.uploader
          .upload(`data:image/png;base64,${base_64_img}`, {
            folder: 'teslo-shop'
          })
          .then((r) => r.secure_url);
      } catch (error) {
        console.log(error);
      }
    });

    const uploaded_images = await Promise.all(upload_promises);
    return uploaded_images;
  } catch (error) {
    console.log(error);
    return null;
  }
}
