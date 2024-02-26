'use client';

import { useEffect, useState } from 'react';
import { title_font } from '@/config/fonts';
import { useCartStore, useUIStore } from '@/store';
import { IconSearch, IconShoppingBag } from '@tabler/icons-react';
import Link from 'next/link';

export const TopMenu = () => {
  const open = useUIStore((store) => store.open);
  const total_products = useCartStore((store) => store.get_total_products());

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="flex px-5 justify-between items-center w-full">
      {/* Logo */}
      <div>
        <Link href="/">
          <span className={`${title_font.className} font-bold`}>Teslo</span>
          <span> | Shop</span>
        </Link>
      </div>

      {/* Centered menu */}
      <div className="hidden sm:block font-medium">
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          href="/gender/men"
        >
          Hombres
        </Link>
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          href="/gender/women"
        >
          Mujeres
        </Link>
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          href="/gender/kid"
        >
          Niños
        </Link>
      </div>

      {/* search - cart - menu */}
      <div className="flex items-center gap-3">
        <Link href="/search">
          <IconSearch className="w-5 h-5" />
        </Link>
        <Link href={total_products > 0 && loaded ? '/cart' : '/empty'}>
          <div className="relative">
            {loaded && total_products > 0 ? (
              <span className="fade-in absolute text-xs rounded-full px-1 -top-2 bg-blue-700 text-white -right-2">
                {total_products}
              </span>
            ) : null}
            <IconShoppingBag className="w-5 h-5" />
          </div>
        </Link>
        <button
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          onClick={open}
          type="button"
        >
          Menú
        </button>
      </div>
    </div>
  );
};
