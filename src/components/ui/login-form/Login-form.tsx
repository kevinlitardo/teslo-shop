'use client';

import Link from 'next/link';
import { authenticate } from '@/actions';
import { useFormState, useFormStatus } from 'react-dom';
import { IconAlertTriangle, IconLoader2 } from '@tabler/icons-react';
import { useEffect } from 'react';

export const LoginForm = () => {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  useEffect(() => {
    if (errorMessage === 'Ingreso completado') {
      window.location.replace('/');
    }
  }, [errorMessage]);

  return (
    <form action={dispatch} className="flex flex-col">
      {errorMessage !== undefined && errorMessage !== 'Ingreso completado' && (
        <div className="flex items-center gap-2 my-3 fade-in">
          <IconAlertTriangle className="h-5 w-5 text-red-500" />
          <p className="text-red-500">{errorMessage}</p>
        </div>
      )}

      <label htmlFor="email">Correo electrónico</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="email"
        name="email"
      />

      <label htmlFor="email">Contraseña</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="password"
        name="password"
      />

      <LoginButton />

      {/* divisor */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">o</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/new-account" className="btn-secondary text-center">
        Crear una nueva cuenta
      </Link>
    </form>
  );
};

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className={pending ? 'btn-primary-disabled' : 'btn-primary'}
    >
      {pending ? (
        <IconLoader2 className="animate-spin mx-auto" size="1.5rem" />
      ) : (
        'Ingresar'
      )}
    </button>
  );
}
