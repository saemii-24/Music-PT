'use client';
import {SiNaver} from 'react-icons/si';
import {FcGoogle} from 'react-icons/fc';
import Image from 'next/image';

import {signIn, useSession} from 'next-auth/react';
import {useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {LanguageType} from '@/types/form';
import {languageMode} from '@/recoil';
import {useRecoilValue} from 'recoil';

export default function Login() {
  const {status} = useSession();
  const route = useRouter();
  const lan: LanguageType = useRecoilValue(languageMode);

  useEffect(() => {
    if (status === 'authenticated') {
      route.replace('/');
    }
  }, [route, status]);

  return (
    <main className='flex flex-1 pb-20 dark:bg-music-background'>
      <div className='container flex flex-col items-center justify-center  py-20'>
        <div className=' flex flex-col items-center justify-center border-gray-900/10'>
          <h1 className='flex flex-col items-center justify-center gap-3 text-center text-4xl font-extrabold leading-tight text-black'>
            {lan['login-title-one']}
            <br />
            {lan['login-title-two']}
          </h1>
          <div className='relative'>
            <div className='absolute left-1/2 top-[55%] z-0 w-[20rem] -translate-x-1/2 translate-y-1/2 border border-gray-400 dark:border-[#cccccc]'></div>
            <p className='dark:[#cccccc] relative mt-2 bg-white px-4 leading-6 text-gray-400 dark:bg-music-background dark:text-[#cccccc]'>
              {lan['login-description']}
            </p>
          </div>
        </div>
        <div className='mt-8 flex w-[20rem] flex-col gap-3'>
          <button
            onClick={() => signIn('google', {callbackUrl: '/'})}
            type='button'
            className='relative flex  h-12 items-center justify-center rounded-md border-2 bg-[#fff]'>
            <FcGoogle className='absolute left-6 text-xl text-white' />
            <span>{lan['login-google']}</span>
          </button>
          <button
            onClick={() => signIn('kakao', {callbackUrl: '/'})}
            type='button'
            className=' relative flex h-12 items-center justify-center rounded-md	bg-[#FEE500]'>
            <div className='absolute left-6 aspect-square w-5'>
              <Image
                priority={true}
                src={'/kakao.svg'}
                alt='카카오 로고'
                width={20}
                height={20}
              />
            </div>
            <span className='text-[#191919]'>{lan['login-kakao']}</span>
          </button>
          <button
            onClick={() => signIn('naver', {callbackUrl: '/'})}
            type='button'
            className='relative flex  h-12 items-center justify-center rounded-md bg-[#03c75a]'>
            <SiNaver className='absolute left-6 text-[#fff]' />
            <span className='text-[#fff]'>{lan['login-naver']}</span>
          </button>
        </div>
      </div>
    </main>
  );
}
