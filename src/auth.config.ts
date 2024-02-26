import NextAuth from 'next-auth';
import type { NextAuthConfig } from 'next-auth';

import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import bcryptjs from 'bcryptjs';

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/new-account'
  },

  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.data = user;
      }

      return token;
    },
    session({ session, token, user }) {
      session.user = token.data as any;
      return session;
    }
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(5) })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        // 1. buscar correo

        const user = await prisma.user.findFirst({
          where: { email: email.toLocaleLowerCase() }
        });

        if (!user) return null;

        // 2. comparar contraseñas

        if (!bcryptjs.compareSync(password, user.password)) return null;

        // 3. regresar usuario sin password

        const { password: _, ...rest } = user;

        return rest;
      }
    })
  ]
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);
