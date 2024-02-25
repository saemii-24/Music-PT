import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const noto = Noto_Sans_KR({ subsets: ['latin'] });

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
      <head />
      <body className={noto.className}>
        <div className="flex flex-col">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
