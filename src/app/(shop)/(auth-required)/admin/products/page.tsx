import { get_paginated_products_with_images } from '@/actions';
import { ImagePlaceholder, Pagination, TitleComponent } from '@/components';
import { format_price } from '@/helpers';
import Link from 'next/link';

interface Props {
  searchParams: {
    page?: string;
  };
}

const AdminProductsPage = async ({ searchParams }: Props) => {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products, total_pages } = await get_paginated_products_with_images({
    page
  });

  return (
    <>
      <TitleComponent title="Productos" />

      <div className="flex justify-end mb-5">
        <Link href="/admin/product/new" className="btn-primary">
          Nuevo producto
        </Link>
      </div>

      <div className="mb-10">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Imagen
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Título
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Precio
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Género
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Stock
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Tallas
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => {
              return (
                <tr
                  key={item.id}
                  className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <Link href={`/product/${item.slug}`}>
                      <ImagePlaceholder
                        src={item.images[0].url}
                        width={80}
                        height={80}
                        alt={item.title}
                        className="w-20 h-20 object-cover"
                      />
                    </Link>
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    <Link href={`/admin/product/${item.slug}`}>
                      {item.title}
                    </Link>
                  </td>
                  <td className="text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {format_price(item.price)}
                  </td>
                  <td className="text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {item.gender}
                  </td>
                  <td className="text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {item.in_stock}
                  </td>
                  <td className="text-sm  text-gray-900 font-light px-6 py-4">
                    {item.sizes.join(', ')}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Pagination total_pages={total_pages} />
    </>
  );
};

export default AdminProductsPage;
