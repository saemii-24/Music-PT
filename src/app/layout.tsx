import type {Metadata} from 'next';
import './globals.css';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {NextProvider} from '@/NextProvider';

import {ReactQueryDevtools} from '@tanstack/react-query-devtools';

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
    <html lang='ko'>
      <head />
      <body className={`font-[noto]`}>
        <NextProvider>
          <ReactQueryDevtools />
          <div className='flex min-h-screen flex-col overflow-x-hidden'>
            <Header />
            <div>{children}</div>
            <Footer />
          </div>
        </NextProvider>
      </body>
    </html>
  );
}
