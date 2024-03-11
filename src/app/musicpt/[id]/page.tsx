'use client';
import React, {useState} from 'react';

import {useQuery} from '@tanstack/react-query';
import axios from 'axios';

import Image from 'next/image';
import Link from 'next/link';

import {IoPlayCircleOutline} from 'react-icons/io5';
import {MdOutlineUpdate} from 'react-icons/md';

import cn from 'classnames';
import Lyrics from '@/components/Lyrics';

interface ParamsProps {
  params: {id: string};
}

export type LyricsVerType = 'ko' | 'jp' | 'kotrans' | 'jptrans';

export default function MusicPt({params}: ParamsProps) {
  const [lyricsVer, setLyricsVer] = useState<LyricsVerType>('ko');
  console.log(lyricsVer);

  const id = params.id;

  //tanstack query사용
  const getMusicData = async () => {
    const {data} = await axios.get(`/api/music/${id}`);
    return data;
  };

  const {status, data: music} = useQuery({
    queryKey: ['music-pt', id],
    queryFn: getMusicData,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  if (status === 'pending') {
    return <span>Loading...</span>;
  }

  if (status === 'error') {
    return <span>에러가 발생</span>;
  }

  return (
    <div className='flex-1'>
      <main className='my-20'>
        <section>
          <div className='container grid grid-cols-4 xl:grid-cols-6 2xl:grid-cols-7 '>
            <div className='col-span-4 overflow-hidden rounded-xl bg-red-100 xl:col-span-2 xl:row-span-5 xl:mr-20'>
              <Image
                priority={true}
                src={
                  music?.post.kothumbnail
                    ? music?.post.kothumbnail
                    : '/default_card.png'
                }
                alt={
                  music?.post.kotitle
                    ? music?.post.kotitle + '이미지'
                    : '음악 썸네일'
                }
                width={0}
                height={0}
                sizes='100vw'
                style={{width: '100%', height: '100%', objectFit: 'cover'}}
              />
            </div>
            <div className='col-span-4 mb-4 mt-10 text-4xl font-bold xl:col-span-3 xl:mt-10 2xl:col-span-4'>
              {music?.post.kotitle}
            </div>
            <div className='order-first col-span-4 mt-[-2.5rem] flex justify-end xl:order-none xl:col-auto xl:mt-10'>
              <div className='right-0 top-[-100vw] flex gap-2 md:top-0'>
                <p className=' after:ml-2 after:content-["|"]'>수정</p>
                <p>삭제</p>
              </div>
            </div>
            <div className='leading-7 xl:mt-3'>가수</div>
            <div className='col-span-3 xl:col-span-3 xl:mt-3 2xl:col-span-4 '>
              {music?.post.kosinger}
            </div>
            <div className='leading-7'>앨범</div>
            <div className='col-span-3 xl:col-span-3 2xl:col-span-4 '>
              {music?.post.koalbum}
            </div>
            <div className='leading-7'>발매년도</div>
            <div className='col-span-3 xl:col-span-3 2xl:col-span-4 '>
              {music?.post.korelease}
            </div>
            <div className='col-span-4 mb-10 mt-5 flex gap-6 xl:col-span-4 2xl:col-span-5 '>
              {music?.post.koyoutube ? (
                <Link
                  href={music?.post.koyoutube}
                  target='_blank'
                  className='flex items-center justify-center gap-1 rounded-full border border-music-orange px-4 py-2 text-music-orange transition hover:bg-music-orange hover:text-white'>
                  한국어 버전
                  <IoPlayCircleOutline />
                </Link>
              ) : (
                <div className='flex items-center justify-center gap-1 rounded-full  bg-gray-100 px-4 py-2 transition'>
                  한국어 버전
                  <IoPlayCircleOutline />
                </div>
              )}
              {music?.post.jpyoutube ? (
                <Link
                  href={music?.post.jpyoutube}
                  target='_blank'
                  className='flex items-center justify-center gap-1 rounded-full border border-music-orange px-4 py-2 text-music-orange transition hover:bg-music-orange hover:text-white'>
                  일본어 버전 <IoPlayCircleOutline />
                </Link>
              ) : (
                <div className='flex items-center justify-center gap-1 rounded-full  bg-gray-100 px-4 py-2 transition'>
                  일본어 버전
                  <IoPlayCircleOutline />
                </div>
              )}
            </div>
          </div>
        </section>

        <section className='container mt-[10rem]'>
          <div className='relative '>
            <p className='mb-1 flex items-center gap-1'>
              <MdOutlineUpdate /> {music?.post?.date?.slice(0, 10)}
            </p>
            <h2 className='text-4xl font-extrabold'>한국어 버전 가사</h2>

            <div className='mt-10 flex gap-6 border-b'>
              <ul className='flex gap-8'>
                <li
                  onClick={() => {
                    setLyricsVer('ko');
                  }}
                  className={cn(
                    'cursor-pointer',
                    lyricsVer === 'ko' &&
                      'border-b-2 border-music-blue pb-5 font-bold text-music-blue',
                  )}>
                  한국어 버전
                </li>
                <li
                  onClick={() => {
                    setLyricsVer('jp');
                  }}
                  className={cn(
                    'cursor-pointer',
                    lyricsVer === 'jp' &&
                      'border-b-2 border-music-blue pb-5 font-bold text-music-blue',
                  )}>
                  일본어 버전
                </li>
                <li
                  onClick={() => {
                    setLyricsVer('kotrans');
                  }}
                  className={cn(
                    'cursor-pointer',
                    lyricsVer === 'kotrans' &&
                      'border-b-2 border-music-blue pb-5 font-bold text-music-blue',
                  )}>
                  한국어 비교하기
                </li>
                <li
                  onClick={() => {
                    setLyricsVer('jptrans');
                  }}
                  className={cn(
                    'cursor-pointer',
                    lyricsVer === 'jptrans' &&
                      'border-b-2 border-music-blue pb-5 font-bold text-music-blue',
                  )}>
                  일본어 비교하기
                </li>
              </ul>
            </div>
          </div>

          <article className='rounded-lg '>
            <Lyrics lyricsVer={lyricsVer} music={music?.post} />
          </article>
        </section>
      </main>
    </div>
  );
}
