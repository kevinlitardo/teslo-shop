'use client';

import { useState } from 'react';
import { CartProduct, Product, ProductSizes } from '@/interfaces';
import { QuantitySelector } from '../quantity-selector/Quantity-selector';
import { SizeSelector } from '../size-selector/Size-selector';
import { useCartStore } from '@/store';

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const [size, setSize] = useState<ProductSizes | undefined>();
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);

  const add_product = useCartStore((store) => store.add_product);

  const select_size = (size: ProductSizes) => setSize(size);
  const change_quantity = (value: number) => {
    if (value > product.in_stock) return;
    setQuantity(value);
  };

  const add_to_cart = () => {
    setSizeError(false);

    if (!size) return setSizeError(true);

    const cart_product: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity: quantity,
      size: size,
      image: product.images[0]
    };

    add_product(cart_product);

    setSize(undefined);
    setQuantity(1);
  };

  return (
    <>
      {sizeError && (
        <div className="bg-red-500 p-2 rounded-md text-white text-center text-sm w-full fade-in">
          Debes seleccionar una talla
        </div>
      )}

      {/* Selector de talla */}
      <SizeSelector
        selected_size={size}
        available_sizes={product.sizes}
        select_size={select_size}
      />

      {/* Selector de cantidad */}
      <QuantitySelector quantity={quantity} change_quantity={change_quantity} />

      {/* Botón */}
      <button type="button" onClick={add_to_cart} className="btn-primary my-5">
        Agregar al carrito
      </button>
    </>
  );
};
