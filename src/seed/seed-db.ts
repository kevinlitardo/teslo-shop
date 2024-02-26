import prisma from '../lib/prisma';
import { ValidTypes, initialData } from './seed';
import { countries } from './seed-countries';

async function main() {
  const { categories, products, users } = initialData;

  // 1. Limpiar db - en este orden o da error la db por llaves foraneas
  await prisma.orderAddress.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.userAddress.deleteMany();
  await prisma.user.deleteMany();
  await prisma.country.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  // 2. Agregar categorías
  const categories_data = categories.map((item) => ({ name: item }));

  await prisma.category.createMany({
    data: categories_data
  });

  const categories_db = await prisma.category.findMany();

  const categories_table = categories_db.reduce(
    (acc, el) => ({ ...acc, [el.name]: el.id }),
    {} as Record<ValidTypes, string>
  );

  // 3. Agregar productos
  products.forEach(async (product) => {
    const { type, images, inStock, ...rest } = product;

    const new_product = await prisma.product.create({
      data: {
        ...rest,
        category_id: categories_table[type],
        in_stock: inStock
      }
    });

    // 4. Agregar imágenes
    const images_data = images.map((url) => ({
      url,
      product_id: new_product.id
    }));

    await prisma.productImage.createMany({
      data: images_data
    });
  });

  // 4. Agregar users
  await prisma.user.createMany({
    data: users
  });

  // 5. Agregar paises
  await prisma.country.createMany({
    data: countries
  });

  console.log('\x1b[33mSeed completed successfully! \x1b[0m');
  console.log('\x1b[32mCategories created. \x1b[0m');
  console.log('\x1b[32mProducts created \x1b[0m');
  console.log('\x1b[32mImages created \x1b[0m');
  console.log('\x1b[32mUsers created \x1b[0m');
  console.log('\x1b[32mCountries created \x1b[0m');
}

(() => {
  if (process.env.NODE_ENV === 'production') return;

  main();
})();
