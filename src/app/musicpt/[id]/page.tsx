'use client';

import {SupabaseType} from '@/types/form';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';

import Image from 'next/image';
import Link from 'next/link';
import React, {useEffect, useState} from 'react';

import {IoPlayCircleOutline} from 'react-icons/io5';

interface ParamsProps {
  params: {id: string};
}

export default function MusicPt({params}: ParamsProps) {
  const id = params.id;

  //tanstack query사용
  const getMusicData = async () => {
    const {data} = await axios(`/api/music/${id}`);
    return data;
  };

  const {
    status,
    data: music,
    error,
  } = useQuery({
    queryKey: ['music-pt', id],
    queryFn: getMusicData,
  });

  // // let musicData = data;
  // const [musicData, setMusicData] = useState<Partial<SupabaseType>>({});

  // useEffect(() => {
  //   setMusicData(music?.post);
  //   console.log(musicData);
  // }, [music]);

  if (status === 'pending') {
    return <span>Loading...</span>;
  }

  if (status === 'error') {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className='flex-1'>
      {/* <main className='my-20'>
        <section>
          <div className='container flex items-center gap-20 border-b pb-20'>
            <div className='size-[20vw] overflow-hidden rounded-3xl'>
              <Image
                priority={true}
                src={
                  musicData.kothumbnail
                    ? musicData.kothumbnail
                    : '/default_card.png'
                }
                alt={
                  musicData.kotitle
                    ? musicData.kotitle + '이미지'
                    : '음악 썸네일'
                }
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
                  <p className='w-auto'>{musicData.kosinger}</p>
                </div>
                <div className='flex'>
                  <p className='w-[100px]'>앨범</p>
                  <p className='w-auto'>{musicData.koalbum}</p>
                </div>
                <div className='flex'>
                  <p className='w-[100px]'>발매년도</p>
                  <p className='w-auto'>{musicData.korelease}</p>
                </div>
                <div></div>
              </div>

              <div className='mt-6 flex gap-6'>
                {musicData.koyoutube ? (
                  <Link
                    href={musicData.koyoutube}
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
                {musicData.jpyoutube ? (
                  <Link
                    href={musicData.jpyoutube}
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
          </div>
        </section>

        <section className='container mt-[10rem]'>
          <div className='relative '>
            <p className='mb-1'>업데이트: {musicData?.date?.slice(0, 10)}</p>
            <h2 className='text-4xl font-extrabold'>한국어 버전 가사</h2>

            <div className='mt-10 flex gap-6'>
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
              {musicData?.kolyrics?.split('\n').map((koline, index) => (
                <React.Fragment key={index}>
                  <p className='text-lg'>{koline}</p>
                  <p className='text-lg'>
                    {musicData?.jplyrics?.split('\n')[index]}
                  </p>
                </React.Fragment>
              ))}
            </div>
          </article>
        </section>
      </main> */}
    </div>
  );
}
