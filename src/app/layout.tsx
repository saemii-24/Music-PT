import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import { Noto_Sans_JP } from 'next/font/google';
import './globals.css';
import { NextProvider } from '@/providers';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

const notoKR = Noto_Sans_KR({ subsets: ['latin'], variable: '--ko' });
const notoJP = Noto_Sans_JP({ subsets: ['latin'], variable: '--jp' });

export const metadata: Metadata = {
  title: 'Music-PT',
  description: '좋아하는 음악으로 공부해요!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <NextProvider>
        <head />
        <body className={`${notoKR.variable} ${notoJP.variable}`}>
          <Header />
          {children}
          <Footer />
        </body>
      </NextProvider>
    </html>
  );
}
