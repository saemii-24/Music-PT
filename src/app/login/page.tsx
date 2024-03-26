import {RiKakaoTalkFill} from 'react-icons/ri';
import {SiNaver} from 'react-icons/si';
import {FcGoogle} from 'react-icons/fc';
import Image from 'next/image';

export default function Login() {
  const titleInfo = {
    title: '언어를 즐겁게, Music PT 입니다.',
    description: 'SNS를 이용해 간편하게 로그인하고, Music PT를 시작해보세요.',
  };
  return (
    <main className='flex-1'>
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
            type='button'
            className='flex h-12 items-center rounded-md border-2'>
            <FcGoogle className='mx-10 text-xl text-white' />
            <span>구글로 시작하기</span>
          </button>
          <button
            type='button'
            className='flex h-12 items-center rounded-md	bg-[#FEE500]'>
            <div className='mx-10 aspect-square w-5'>
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
            type='button'
            className='flex h-12 items-center rounded-md bg-[#03c75a]'>
            <SiNaver className='mx-10 text-white' />
            <span className='text-white'>네이버로 시작하기</span>
          </button>
        </div>
      </div>
    </main>
  );
}
