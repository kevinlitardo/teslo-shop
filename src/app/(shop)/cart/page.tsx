import { CartProducts, CartSummary, TitleComponent } from '@/components';
import Link from 'next/link';

const CartPage = () => {
  return (
    <div className="flex justify-center items-center mb-27 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <TitleComponent title="Carrito" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Carrito */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Agregar más items</span>
            <Link
              href="/"
              className="underline mb-5 hover:text-blue-500 transition-all"
            >
              Tienda...
            </Link>

            {/* Items */}
            <CartProducts />
          </div>

          {/* Summary */}
          <div className="bg-white rounded-md shadow-xl p-7 h-fit">
            <h2 className="text-2xl mb-2">Resumen</h2>

            <CartSummary />

            <div className="mt-5 mb-2 w-full">
              <Link
                className="flex btn-primary justify-center"
                href="/checkout/address"
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
