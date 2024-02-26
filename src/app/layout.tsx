import type { Metadata } from 'next';
import './globals.css';
import { inter } from '@/config/fonts';
import Providers from '@/providers';

export const metadata: Metadata = {
  title: { template: '%s - Teslo | shop', default: 'Home - Teslo | shop' },
  description: 'Best virtual shop'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
