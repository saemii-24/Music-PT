'use client';
import {SiNaver} from 'react-icons/si';
import {FcGoogle} from 'react-icons/fc';
import Image from 'next/image';

import {signIn, useSession} from 'next-auth/react';
import {useEffect} from 'react';
import {useRouter} from 'next/navigation';

export default function Login() {
  const {status} = useSession();
  const route = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      route.replace('/');
    } else if (status === 'loading') {
      //스켈레톤 추가 예정
    }
  }, [route, status]);

  return (
    <main className='mb-20 flex flex-1'>
      <div className='container flex flex-col items-center justify-center py-20'>
        <div className=' flex flex-col items-center justify-center border-gray-900/10'>
          <h1 className='flex flex-col items-center justify-center gap-3 text-center text-4xl font-extrabold leading-tight'>
            언어를 즐겁게,
            <br /> Music PT 입니다.
          </h1>
          <div className='relative'>
            <div className='absolute left-1/2 top-[55%] z-0 w-[20rem] -translate-x-1/2 translate-y-1/2 border'></div>
            <p className='relative  mt-2 bg-white px-4 leading-6 text-gray-400'>
              SNS 계정으로 간편 로그인하기
            </p>
          </div>
        </div>
        <div className='mt-8 flex w-[20rem] flex-col gap-3'>
          <button
            onClick={() => signIn('google', {callbackUrl: '/'})}
            type='button'
            className='relative  flex h-12 items-center justify-center rounded-md border-2'>
            <FcGoogle className='absolute left-6 text-xl text-white' />
            <span>구글로 시작하기</span>
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
                width={0}
                height={0}
                sizes='100vw'
                style={{width: '100%', height: '100%', objectFit: 'cover'}}
              />
            </div>
            <span className='text-[#191919]'>카카오로 시작하기</span>
          </button>
          <button
            onClick={() => signIn('naver', {callbackUrl: '/'})}
            type='button'
            className='relative flex  h-12 items-center justify-center rounded-md bg-[#03c75a]'>
            <SiNaver className='absolute left-6 text-white' />
            <span className='text-white'>네이버로 시작하기</span>
          </button>
        </div>
      </div>
    </main>
  );
}
