import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/Button';

export default function Example() {
  return (
    <>
      <main className='grid min-h-full flex-1 place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8 dark:bg-music-background'>
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
          <h1 className='mt-4 text-3xl font-bold tracking-tight text-black sm:text-5xl'>
            404 ERROR
          </h1>
          <div className='mt-5 flex items-center justify-center gap-x-6'>
            <Link href='/'>
              <Button text='Go Home' icon='home' />
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
