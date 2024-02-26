import { title_font } from '@/config/fonts';
import Link from 'next/link';

export const Footer = () => {
  return (
    <div className="flex w-full justify-center text-sm my-10 gap-10">
      <Link href="/" className="hover:underline">
        <span className={`${title_font.className} antialiased font-bold`}>
          Teslo
        </span>
        <span className=""> | shop</span>
        <span className=""> &copy; {new Date().getFullYear()}</span>
      </Link>

      <Link href="/" className="hover:underline">
        Privacidad y legal
      </Link>
    </div>
  );
};
