'use client';

import { logout } from '@/actions';
import { useUIStore } from '@/store';
import {
  IconLogin2,
  IconLogout2,
  IconPackage,
  IconSearch,
  IconShirt,
  IconUser,
  IconUsers,
  IconX
} from '@tabler/icons-react';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export const Sidebar = () => {
  const is_open = useUIStore((store) => store.is_open);
  const close = useUIStore((store) => store.close);

  const { data: session } = useSession();

  const is_logged = !!session?.user;
  const is_admin = session?.user.role === 'admin';

  return (
    <div>
      {is_open ? (
        <>
          {/* Background */}
          <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30" />

          {/* Blur */}
          <div
            className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
            onClick={close}
          />
        </>
      ) : null}

      {/* Side menu */}
      <nav
        className={clsx(
          'fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300',
          { 'translate-x-full': !is_open }
        )}
      >
        <IconX
          size={40}
          className="absolute top-5 right-5 cursor-pointer"
          onClick={close}
        />

        {/* Input */}
        <div className="relative mt-14">
          <IconSearch size={20} className="absolute top-2 left-2" />
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full bg-gray-50 rounded pl-10 py-1 pr-5 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Menu */}
        {is_logged ? (
          <>
            <Link
              href="/profile"
              onClick={close}
              className="flex items-center mt-10 p-2 hover:bg-gray-100 transition-all rounded"
            >
              <IconUser size={30} />
              <span className="ml-3 text-xl">Perfil</span>
            </Link>
            <Link
              href="/orders"
              onClick={close}
              className="flex items-center mt-10 p-2 hover:bg-gray-100 transition-all rounded"
            >
              <IconPackage size={30} />
              <span className="ml-3 text-xl">Ordenes</span>
            </Link>
            <button
              onClick={() => {
                logout();
                close();
              }}
              className="flex items-center mt-10 p-2 hover:bg-gray-100 transition-all rounded w-full"
            >
              <IconLogout2 size={30} />
              <span className="ml-3 text-xl">Salir</span>
            </button>
          </>
        ) : (
          <Link
            href="/auth/login"
            onClick={close}
            className="flex items-center mt-10 p-2 hover:bg-gray-100 transition-all rounded"
          >
            <IconLogin2 size={30} />
            <span className="ml-3 text-xl">Ingresar</span>
          </Link>
        )}

        {is_admin ? (
          <>
            {/* Separator */}
            <div className="w-full h-px bg-gray-200 my-10 rounded relative">
              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-gray-400 pointer-events-none">
                Administración
              </span>
            </div>

            <Link
              href="/admin/products"
              onClick={close}
              className="flex items-center mt-10 p-2 hover:bg-gray-100 transition-all rounded"
            >
              <IconShirt size={30} />
              <span className="ml-3 text-xl">Productos</span>
            </Link>
            <Link
              href="/admin/orders"
              onClick={close}
              className="flex items-center mt-10 p-2 hover:bg-gray-100 transition-all rounded"
            >
              <IconPackage size={30} />
              <span className="ml-3 text-xl">Ordenes</span>
            </Link>
            <Link
              href="/admin/users"
              onClick={close}
              className="flex items-center mt-10 p-2 hover:bg-gray-100 transition-all rounded"
            >
              <IconUsers size={30} />
              <span className="ml-3 text-xl">Usuarios</span>
            </Link>
          </>
        ) : null}
      </nav>
    </div>
  );
};
