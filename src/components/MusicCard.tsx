'use client';
import Image from 'next/image';
import {FaHeart} from 'react-icons/fa6';
import {MdOutlineUpdate} from 'react-icons/md';

export default function MusicCard() {
  return (
    <div className='mt-20 w-[350px] cursor-pointer overflow-hidden rounded-lg bg-white'>
      <Image
        priority={true}
        src='/default_card.png'
        alt='프로필 이미지'
        width={350}
        height={230}
      />
      <div className='h-[150px] p-5'>
        {/* 카드 윗 줄 */}
        <div className='flex items-center'>
          <p className='font-medium'>스폰지송</p>
          <div className='ml-auto flex gap-2'>
            <div className='inline-block w-11 rounded-3xl bg-[#9ED3FF] py-[0.1rem] text-center text-sm text-white'>
              KO
            </div>
            <div className='inline-block w-11 rounded-3xl bg-[#FF9D9D] py-[0.1rem] text-center text-sm text-white'>
              JP
            </div>
          </div>
        </div>
        {/* 카드 제목 */}
        <h1 className='mt-2 text-2xl font-medium'>월요일 좋아</h1>
      </div>
      {/* 작성자 좋아요 */}
      <div className='flex border-t px-5 py-3'>
        <div className='flex items-center gap-1'>
          <div>
            <MdOutlineUpdate className='text-lg' />
          </div>
          <div className='text-sm'>2024.03.01</div>
        </div>
        <div className='ml-auto flex items-center gap-1 text-sm'>
          <FaHeart className='text-sm' />
          <div>32</div>
        </div>
      </div>
    </div>
  );
}
