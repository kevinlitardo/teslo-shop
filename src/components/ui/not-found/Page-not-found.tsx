import { title_font } from '@/config/fonts';
import Image from 'next/image';
import Link from 'next/link';

export const PageNotFound = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row h-screen w-full justify-center items-center align-middle">
      <div className="text-center px-5 mx-5">
        <h2 className={`${title_font.className} antialiased text-7xl`}>404</h2>
        <p className="font-semibold text-xl">Whoops! Lo sentimos mucho</p>
        <div className="font-light">
          <span>Puedes regresar al</span>
          <Link
            className="font-semibold hover:underline transition-all text-blue-700"
            href="/"
          >
            {' '}
            inicio
          </Link>
        </div>
      </div>

      <div className="px-5 mx-5">
        <Image
          alt="Not found"
          src="/imgs/starman_750x750.png"
          className="p-5 sm:p-0"
          width={550}
          height={550}
        />
      </div>
    </div>
  );
};
