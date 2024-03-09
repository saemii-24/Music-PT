'use client';

import {SupabaseType} from '@/types/form';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';

import Image from 'next/image';
import Link from 'next/link';

import {IoPlayCircleOutline} from 'react-icons/io5';

interface ParamsProps {
  params: {id: string};
}

export default function MusicPt({params}: ParamsProps) {
  // const id = params.id;

  // //tanstack query사용
  // const getMusicData = async () => {
  //   const {data} = await axios(`/api/music?id=${id}`);
  //   return data;
  // };

  // const {status, data, error} = useQuery({
  //   queryKey: ['music-pt', id],
  //   queryFn: getMusicData,
  // });

  // let music = data?.posts[0];

  // console.log();

  // if (status === 'pending') {
  //   return <span>Loading...</span>;
  // }

  // if (status === 'error') {
  //   return <span>Error: {error.message}</span>;
  // }

  return (
    <div className='flex-1'>
      <main className='my-20'>
        <section>
          <div className='container flex items-center gap-20 pb-20'>
            <div className='size-[20vw] overflow-hidden rounded-3xl'>
              <Image
                priority={true}
                src={'/default_card.png'}
                alt={'음악'}
                width={0}
                height={0}
                sizes='100vw'
                style={{width: '100%', height: '100%', objectFit: 'cover'}}
              />
            </div>
            <div className='relative flex-1'>
              <h1 className='text-4xl font-extrabold'>{'버터플라이'}</h1>

              <div className='absolute right-0 top-0 flex gap-2'>
                <p className=' after:ml-2 after:content-["|"]'>수정</p>
                <p>삭제</p>
              </div>

              <div className='mt-6 flex w-full flex-col gap-1'>
                <div className='flex'>
                  <p className='w-[100px]'>가수</p>
                  <p className='w-auto'>전영호</p>
                </div>
                <div className='flex'>
                  <p className='w-[100px]'>앨범</p>
                  <p className='w-auto'>butter-fly 디지몬</p>
                </div>
                <div className='flex'>
                  <p className='w-[100px]'>발매년도</p>
                  <p className='w-auto'>2022</p>
                </div>
                <div></div>
              </div>

              <div className='mt-6 flex gap-6'>
                <Link
                  href={''}
                  className='flex items-center justify-center gap-1 rounded-full border border-music-orange px-4 py-2 text-music-orange transition hover:bg-music-orange hover:text-white'>
                  한국어 버전
                  <IoPlayCircleOutline />
                </Link>
                <Link
                  href={'music.jpyoutube'}
                  className='flex items-center justify-center gap-1 rounded-full border border-music-orange px-4 py-2 text-music-orange transition hover:bg-music-orange hover:text-white'>
                  일본어 버전 <IoPlayCircleOutline />
                </Link>
              </div>
            </div>
            <hr className='border' />
          </div>
        </section>

        <section className='container mt-[10rem]'>
          <div className='relative '>
            <p className='mb-1'>업데이트: 2023-03-21</p>
            <h2 className='text-4xl font-extrabold'>한국어 버전 가사</h2>

            <div className='mt-10 flex gap-6'>
              {/* <button className='rounded-full border border-music-blue px-6 py-2 text-music-blue'>
                한국어 버전
              </button>
              <button className='rounded-full border border-music-blue px-6 py-2 text-music-blue'>
                일본어 버전
              </button>
              <button className='rounded-full border border-music-blue px-6 py-2 text-music-blue'>
                가사 비교하기
              </button> */}
              <ul className='flex gap-3'>
                <li>한국어 버전</li>
                <li>일본어 버전</li>
                <li>가사 비교하기</li>
              </ul>
            </div>

            <p className='absolute right-0 top-0 flex gap-2'>번역 추가</p>
          </div>
          <article className='mt-10 rounded-lg bg-[#FBFEFF]'>
            <div className='flex flex-col items-center py-20'>
              <p className='text-lg'>그래 그리 쉽지는 않겠지</p>
              <p className='mb-8 text-lg text-music-blue'>
                そんなに簡単ではないでしょう
              </p>
              <p className='text-lg'>그래 그리 쉽지는 않겠지</p>
              <p className='mb-8 text-lg text-music-blue'>
                そんなに簡単ではないでしょう
              </p>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}
