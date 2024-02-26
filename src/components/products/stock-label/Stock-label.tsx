'use client';

import { get_stock_by_slug } from '@/actions/products/get-stock-by-slug';
import { useEffect, useState } from 'react';

interface Props {
  slug: string;
}

export const StockLabel = ({ slug }: Props) => {
  const [inStock, setInStock] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const get_stock = async () => {
    const stock = await get_stock_by_slug(slug);
    setInStock(stock);
    setIsLoading(false);
  };

  useEffect(() => {
    get_stock();
  }, []);

  return (
    <h1 className="text-lg mb-5 flex gap-3 items-center">
      Stock:{' '}
      {isLoading ? (
        <div className="h-5 bg-gray-200 rounded-md w-10 animate-pulse" />
      ) : (
        inStock
      )}
    </h1>
  );
};
