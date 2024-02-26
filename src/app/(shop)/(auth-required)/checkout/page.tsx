import {
  CheckoutPlaceOrder,
  CheckoutProducts,
  TitleComponent
} from '@/components';
import Link from 'next/link';

const CheckoutPage = () => {
  return (
    <div className="flex justify-center items-center mb-27 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <TitleComponent title="Verificar orden" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Carrito */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Editar carrito</span>
            <Link
              href="/cart"
              className="underline mb-5 hover:text-blue-500 transition-all"
            >
              Volver...
            </Link>

            {/* Items */}
            <CheckoutProducts />
          </div>

          {/* Summary */}
          <CheckoutPlaceOrder />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
