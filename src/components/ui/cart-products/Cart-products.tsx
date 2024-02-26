'use client';

import { useEffect, useState } from 'react';
import { ImagePlaceholder, QuantitySelector } from '@/components';
import { format_price } from '@/helpers';
import { useCartStore } from '@/store';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export const CartProducts = () => {
  const products_in_cart = useCartStore((store) => store.cart);
  const update_product = useCartStore((store) => store.update_product);
  const remove_product = useCartStore((store) => store.remove_product);

  const [loaded, setLoaded] = useState(false);

  if (products_in_cart.length === 0) redirect('/empty');

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
      {products_in_cart.map((product) => (
        <div
          key={`${product.slug}-${product.size}`}
          className="flex mb-5 w-full"
        >
          <ImagePlaceholder
            src={product.image.url!}
            width={100}
            height={100}
            style={{
              width: 100,
              height: 100
            }}
            alt={product.title}
            className="mr-5 rounded"
          />

          <div className="grow">
            <Link href={`/product/${product.slug}`} className="hover:underline">
              {product.title}
            </Link>
            <p className="">Talla: {product.size}</p>
            <p className="">{format_price(product.price)}</p>
            <div className="flex items-center justify-between w-full">
              <QuantitySelector
                quantity={product.quantity}
                change_quantity={(quantity) =>
                  update_product(product, quantity)
                }
              />
              <button
                onClick={() => remove_product(product)}
                type="button"
                className="underline text-sm text-red-500 transition-all  hover:bg-gray-100 p-2 rounded-md"
              >
                Remover
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
