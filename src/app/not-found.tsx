import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/Button';

export default function Example() {
  return (
    <>
      <main className='grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8'>
        <div className='flex flex-col items-center justify-center text-center'>
          <div className='flex items-center justify-center'>
            <Image
              priority={true}
              src='/musicPT.svg'
              alt='musicPT LOGO'
              width={20}
              height={20}
            />
          </div>
          <h1 className='mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl'>
            404 ERROR
          </h1>
          <p className='mt-6 text-base leading-7 text-gray-600'>
            페이지를 찾을 수 없습니다.
          </p>
          <div className='mt-10 flex items-center justify-center gap-x-6'>
            <Link href='/'>
              <Button text='Go Home' icon='home' />
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
