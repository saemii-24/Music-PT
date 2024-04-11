'use client';
import {languageMode} from '@/recoil';
import Link from 'next/link';
import {FaGithub} from 'react-icons/fa';
import {useRecoilValue} from 'recoil';

export default function Footer() {
  const lan = useRecoilValue(languageMode);

  return (
    <footer className='w-screen overflow-hidden border-t-2 border-music-basicgray bg-white'>
      <div className='container flex flex-col py-10'>
        <div className='flex'>
          <Link
            href='/'
            className='cursor-pointer text-2xl font-black tracking-tight text-black'>
            Music PT
          </Link>
          <Link
            className='ml-auto flex items-center justify-center'
            href='https://github.com/saemii-24/Music-PT'
            target='_blank'>
            <FaGithub className='text-3xl text-black' />
          </Link>
        </div>
        <div className='mt-5 text-sm font-normal text-music-bluegray'>
          {lan['footer-introduce']}
        </div>
        <div className='mt-1 text-sm font-normal text-[#cccccc]'>
          {lan['footer-notice']}
        </div>
      </div>
    </footer>
  );
}
