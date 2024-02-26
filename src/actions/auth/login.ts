'use server';

import { signIn } from '@/auth.config';
import { AuthError } from 'next-auth';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn('credentials', {
      redirect: false,
      ...Object.fromEntries(formData)
    });

    return 'Ingreso completado';
  } catch (error) {
    if (error instanceof AuthError) {
      // console.log({ ...error });
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Credenciales incorrectas';
        default:
          return 'Algo salió mal!';
      }
    }
    throw error;
  }
}

export async function login(data: { email: string; password: string }) {
  try {
    await signIn('credentials', data);
    return { ok: true, message: 'Sesión iniciada con éxito' };
  } catch (error) {
    return { ok: false, message: 'No se pudo iniciar sesión' };
  }
}
