'use client';

import { format_price } from '@/helpers';
import { useCartStore } from '@/store';
import { useState, useEffect } from 'react';
import { ImagePlaceholder } from '../image-placeholder/Image-placeholder';

interface Props {
  products_list?: {
    id: string;
    slug: string;
    title: string;
    price: number;
    quantity: number;
    size: string;
    image: { url: string; id: string };
  }[];
}

export const CheckoutProducts = ({ products_list }: Props) => {
  const products = products_list ?? useCartStore((store) => store.cart);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return (
      <div className="flex flex-col gap-3 w-full h-fit">
        <div className="h-28 rounded-md w-full animate-pulse bg-gray-200" />
        <div className="h-28 rounded-md w-full animate-pulse bg-gray-200" />
        <div className="h-28 rounded-md w-full animate-pulse bg-gray-200" />
      </div>
    );
  }

  return (
    <>
      {products.map((product) => (
        <div key={product.slug} className="flex mb-5">
          <ImagePlaceholder
            src={product.image?.url}
            width={100}
            height={100}
            style={{
              width: 100,
              height: 100
            }}
            alt={product.title}
            className="mr-5 rounded"
          />

          <div className="">
            <p className="">{product.title}</p>
            <p className="">
              {format_price(product.price)} x {product.quantity}
            </p>
            <p className="font-bold">
              Subtotal: {format_price(product.price * product.quantity)}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};
