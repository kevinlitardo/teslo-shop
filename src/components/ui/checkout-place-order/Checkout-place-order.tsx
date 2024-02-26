'use client';

import { placer_order } from '@/actions';
import { format_price } from '@/helpers';
import { useAddressStore, useCartStore } from '@/store';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const CheckoutPlaceOrder = () => {
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [inProcess, setInProcess] = useState(false);

  const router = useRouter();

  const address = useAddressStore((store) => store.address);
  const cart = useCartStore((store) => store.cart);
  const clear_cart = useCartStore((store) => store.clear_cart);
  const { sub_total, tax, total, total_products } = useCartStore((store) =>
    store.get_summary()
  );

  const place_order = async () => {
    setInProcess(true);
    setError('');

    const products = cart.map((item) => ({
      product_id: item.id,
      quantity: item.quantity,
      size: item.size
    }));

    const response = await placer_order(products, address);

    if (!response.ok) {
      setInProcess(false);
      setError(response.message);
      return;
    }

    setInProcess(false);

    router.replace(`/orders/${response.order?.id}`);

    clear_cart();
  };

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return (
      <div className="bg-white rounded-md shadow-xl p-7 h-fit">
        <div className="h-8 rounded animate-pulse bg-gray-200 mb-4"></div>

        <div className="h-6 rounded animate-pulse bg-gray-200 mb-2"></div>
        <div className="h-6 rounded animate-pulse bg-gray-200 mb-2"></div>
        <div className="h-6 rounded animate-pulse bg-gray-200"></div>

        <div className="h-8 rounded animate-pulse bg-gray-200 mt-8 mb-4"></div>

        <div className="h-6 rounded animate-pulse bg-gray-200 mb-2"></div>
        <div className="h-6 rounded animate-pulse bg-gray-200 mb-2"></div>
        <div className="h-6 rounded animate-pulse bg-gray-200"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-md shadow-xl p-7 h-fit">
      <h2 className="text-2xl mb-2 font-bold">Dirección de entrega</h2>
      <div className="mb-10">
        <p className="text-xl">
          {address.first_name} {address.last_name}
        </p>
        <p>{address.address}</p>
        <p>{address.address2}</p>
        <p>CP {address.postal_code}</p>
        <p>
          {address.city}, {address.country}
        </p>
        <p>{address.phone}</p>
      </div>

      {/* Divider */}
      <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

      <h2 className="text-2xl mb-2">Resumen</h2>

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

      <div className="mt-5 mb-2 w-full">
        {/* Disclaimer */}
        <p className="text-sm mb-5">
          Al hacer click en "Colocar orden", aceptas nuestros{' '}
          <a href="" className="underline font-semibold">
            términos y condiciones de uso
          </a>{' '}
          y{' '}
          <a href="" className="underline font-semibold">
            política de privacidad
          </a>
        </p>

        {error && (
          <div className="bg-red-500 text-center p-1 rounded-md my-3 text-white">
            Error al colocar la orden
          </div>
        )}

        <button
          disabled={inProcess}
          className={clsx({
            'btn-primary': !inProcess,
            'btn-primary-disabled': inProcess
          })}
          onClick={place_order}
        >
          Colocar orden
        </button>
      </div>
    </div>
  );
};
