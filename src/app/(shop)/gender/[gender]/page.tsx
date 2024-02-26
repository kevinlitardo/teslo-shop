export const revalidate = 60; // Segundos

import { get_paginated_products_with_images } from '@/actions';
import { Pagination, ProductsGrid, TitleComponent } from '@/components';
import { Gender } from '@prisma/client';

interface Props {
  params: {
    gender: string;
  };
  searchParams: {
    page: string;
  };
}

const labels: Record<string, string> = {
  kid: 'Niños',
  women: 'Mujeres',
  men: 'Hombres',
  unisex: 'Unisex'
};

const CategoryPage = async ({ params, searchParams }: Props) => {
  const { gender } = params;

  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products, total_pages } = await get_paginated_products_with_images({
    page,
    gender: gender as Gender
  });

  return (
    <>
      <TitleComponent
        title={labels[gender]}
        subtitle="Todos los productos"
        className="mb-2"
      />

      {products.length > 0 ? <ProductsGrid products={products} /> : null}

      <Pagination total_pages={total_pages!} />
    </>
  );
};

export default CategoryPage;
