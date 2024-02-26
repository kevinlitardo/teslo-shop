export const revalidate = 10080; // 7 días 60 * 60 * 24 * 7

import { get_product_by_slug } from '@/actions';
import {
  AddToCart,
  MobileSlideshow,
  QuantitySelector,
  SizeSelector,
  Slideshow,
  StockLabel
} from '@/components';
import { title_font } from '@/config/fonts';
import { format_price } from '@/helpers';
import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug;

  // fetch data
  const product = await get_product_by_slug(slug);

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: product?.title ?? 'Cargando producto',
    description: product?.description ?? 'Cargando descripción...',
    openGraph: {
      title: (product?.title ?? 'Cargando producto') + ' - Teslo | shop',
      description: product?.description ?? 'Cargando descripción...',
      // images: ['/some-specific-page-image.jpg', ...previousImages],
      images: [`/products/${product?.images[1]}`]
    }
  };
}

const ProductBySlugPage = async ({ params }: Props) => {
  const { slug } = params;

  const product = await get_product_by_slug(slug);

  if (!product) notFound();

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
      {/* Slideshow */}
      <div className="col-span-1 md:col-span-2">
        {/* Mobile slideshow */}
        <MobileSlideshow
          images={product.images}
          title={product.title}
          className="block sm:hidden"
        />

        {/* Desktop slideshow */}
        <Slideshow
          images={product.images}
          title={product.title}
          className="hidden sm:block"
        />
      </div>

      {/* Detalles */}
      <div className="col-span-1 px-5">
        <StockLabel slug={slug} />

        <h1 className={`${title_font.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className="text-lg mb-5">{format_price(product.price)}</p>

        <AddToCart product={product} />

        {/* Descripción */}
        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
};

export default ProductBySlugPage;
