import { IconShoppingBag } from '@tabler/icons-react';
import Link from 'next/link';

const EmptyPage = () => {
  return (
    <div className="flex justify-center items-center h-[800px]">
      <IconShoppingBag size={80} className="mx-5" />
      <div className="flex flex-col items-center">
        <h1 className="text-xl font-semibold">Tu carrito está vacío</h1>

        <Link href="/" className="text-blue-500 mt-2 text-4xl hover:underline">
          Regresar
        </Link>
      </div>
    </div>
  );
};

export default EmptyPage;
