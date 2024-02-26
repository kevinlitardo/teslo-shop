import { get_categories, get_product_by_slug } from '@/actions';
import { Product_form, TitleComponent } from '@/components';
import { redirect } from 'next/navigation';

interface Props {
  params: {
    slug: string;
  };
}

const AdminProductBySlug = async ({ params }: Props) => {
  const { slug } = params;

  const [product, categories] = await Promise.all([
    get_product_by_slug(slug),
    get_categories()
  ]);

  if (!product && slug !== 'new') {
    redirect('/admin/products');
  }

  const title = slug === 'new' ? 'Nuevo producto' : 'Editar producto';

  return (
    <>
      <TitleComponent title={product?.title ?? ''} />
      <Product_form product={product ?? {}} categories={categories} />
    </>
  );
};

export default AdminProductBySlug;
