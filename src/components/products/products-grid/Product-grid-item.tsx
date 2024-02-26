'use client';

import { ImagePlaceholder } from '@/components';
import { Product } from '@/interfaces';
import Link from 'next/link';
import { useState } from 'react';

interface Props {
  product: Product;
}

export const ProductGridItem = ({ product }: Props) => {
  const [displayImage, setDisplayImage] = useState(product.images[0].url);

  return (
    <div className="rounded-md overflow-hidden fade-in">
      <Link href={`/product/${product.slug}`}>
        <ImagePlaceholder
          src={displayImage}
          alt={product.title}
          className="w-full object-cover rounded-md"
          width={500}
          height={500}
          onMouseEnter={() => {
            setDisplayImage(product.images[1]?.url);
          }}
          onMouseLeave={() => {
            setDisplayImage(product.images[0]?.url);
          }}
        />
      </Link>

      <div className="p-4 flex flex-col">
        <Link
          className="hover:text-blue-700 hover:underline hover:font-semibold transition-all"
          href={`/product/${product.slug}`}
        >
          {product.title}
        </Link>
        <span className="text-md font-bold">${product.price}</span>
      </div>
    </div>
  );
};
