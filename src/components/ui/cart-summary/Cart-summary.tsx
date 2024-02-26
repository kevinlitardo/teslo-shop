'use client';

import { useState, useEffect } from 'react';
import { useCartStore } from '@/store';
import { format_price } from '@/helpers';

export const CartSummary = () => {
  const { sub_total, tax, total, total_products } = useCartStore((store) =>
    store.get_summary()
  );

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <></>;
  }

  return (
    <>
      <div className="grid grid-cols-2">
        <span className="">No. Productos</span>
        <span className="text-right">{total_products} artículos</span>

        <span className="">Subtotal</span>
        <span className="text-right">{format_price(sub_total)}</span>

        <span className="">Impuestos (15%)</span>
        <span className="text-right">{format_price(tax)}</span>

        <span className="text-2xl mt-5 font-semibold">Total</span>
        <span className="text-right text-2xl mt-5 font-semibold">
          {format_price(total)}
        </span>
      </div>
    </>
  );
};
