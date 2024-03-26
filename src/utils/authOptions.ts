import {PrismaAdapter} from '@auth/prisma-adapter';
import GoogleProivder from 'next-auth/providers/google';
import NaverProvider from 'next-auth/providers/naver';
import KakaoProvider from 'next-auth/providers/kakao';
import {Adapter} from 'next-auth/adapters';
import {NextAuthOptions} from 'next-auth';
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt' as const,
    maxAge: 60 * 60 * 24,
    updateAge: 60 * 60 * 2,
  },
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProivder({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID || '',
      clientSecret: process.env.NAVER_CLIENT_SECRET || '',
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID || '',
      clientSecret: process.env.KAKAO_CLIENT_SECRET || '',
    }),
  ],
  pages: {
    signIn: '/users/login',
  },
  callbacks: {
    session: ({session, token}) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
      },
    }),
    jwt: async ({user, token}) => {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
};
