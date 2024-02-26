'use client';

import { login, new_account } from '@/actions';
import clsx from 'clsx';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

type Fields = {
  name: string;
  email: string;
  password: string;
};

export const RegisterForm = () => {
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Fields>();

  const submit = async (data: Fields) => {
    setError('');
    // server action
    const response = await new_account(data);

    if (!response.ok) return setError(response.message);

    await login({ email: data.email.toLowerCase(), password: data.password });

    window.location.replace('/');
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-4">
      {error ? (
        <div className="bg-red-500 text-white text-center rounded-md p-2">
          {error}
        </div>
      ) : null}

      <div className="">
        <label htmlFor="name">Nombre completo</label>
        <input
          className={clsx('px-5 py-2 border bg-gray-200 rounded', {
            'border-red-500': errors.name
          })}
          type="text"
          autoFocus
          {...register('name', { required: true })}
        />
        {errors.name && (
          <span className="text-red-500 text-sm mt-2 mb-4">
            El nombre es requerido
          </span>
        )}
      </div>

      <div className="">
        <label htmlFor="email">Correo electrónico</label>
        <input
          className={clsx('px-5 py-2 border bg-gray-200 rounded', {
            'border-red-500': errors.email
          })}
          type="email"
          {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
        />
        {errors.email && (
          <span className="text-red-500 text-sm mt-2 mb-4">
            El correo es requerido
          </span>
        )}
      </div>

      <div className="">
        <label htmlFor="password">Contraseña</label>
        <input
          className={clsx('px-5 py-2 border bg-gray-200 rounded', {
            'border-red-500': errors.password
          })}
          type="password"
          {...register('password', { required: true })}
        />
        {errors.password && (
          <span className="text-red-500 text-sm mt-2 mb-4">
            La contraseña es requerida
          </span>
        )}
      </div>

      <button type="submit" className="btn-primary">
        Crear cuenta
      </button>

      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">o</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/login" className="btn-secondary text-center">
        Ingresar
      </Link>
    </form>
  );
};
