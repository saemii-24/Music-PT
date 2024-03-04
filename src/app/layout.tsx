import type {Metadata} from 'next';
import './globals.css';
import {NextProvider} from '@/providers';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
      <NextProvider>
        <head />
        <body className={`font-[noto]`}>
          <div className='flex min-h-screen flex-col overflow-x-hidden'>
            <Header />
            {children}
            <Footer />
          </div>
        </body>
      </NextProvider>
    </html>
  );
}
