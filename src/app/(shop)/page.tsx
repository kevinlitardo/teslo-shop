export const revalidate = 60; // Segundos

import { get_paginated_products_with_images } from '@/actions';
import { Pagination, ProductsGrid, TitleComponent } from '@/components';

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function ShopPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products, total_pages } = await get_paginated_products_with_images({
    page
  });

  return (
    <>
      <TitleComponent
        title="Tienda"
        subtitle="Todos los productos"
        className="mb-2"
      />

      {products.length > 0 ? <ProductsGrid products={products} /> : null}

      <Pagination total_pages={total_pages!} />
    </>
  );
}
