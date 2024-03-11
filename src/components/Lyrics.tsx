import Link from 'next/link';
import {LyricsVerType} from './MusicDetail';

import type {SupabaseType} from '@/types/form';

import {useRouter} from 'next/navigation';
import React from 'react';

import {BsTranslate} from 'react-icons/bs';
import {CgAddR} from 'react-icons/cg';

export default function Lyrics({
  lyricsVer,
  music,
  id,
}: {
  lyricsVer: LyricsVerType;
  music: SupabaseType | null;
  id: string;
}) {
  const route = useRouter();

  return (
    <div className='flex flex-col items-center py-20'>
      {lyricsVer === '한국어 버전 가사' &&
        /* {가사가 있을 때} */
        (music?.kolyrics && music?.kotranslate ? (
          <div>
            {music?.kolyrics
              ?.split('\n')
              .map((koline: string, index: number) => (
                <p
                  className='text-center text-base leading-8 lg:text-lg lg:leading-9'
                  key={index}>
                  {koline}
                </p>
              ))}
          </div>
        ) : // 가사는 있지만 번역이 없을때
        music?.kotranslate === null ? (
          <React.Fragment>
            <div className='flex flex-col items-center gap-2'>
              <button
                onClick={() => {
                  route.push(`/addtranslate/${id}?lang=ko`);
                }}
                className='mb-10 flex items-center gap-2 rounded-md bg-music-orange px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600'>
                <CgAddR className='text-lg' />
                일본어 번역 추가하기
              </button>
            </div>
            <div>
              {music?.kolyrics
                ?.split('\n')
                .map((koline: string, index: number) => (
                  <p
                    className='text-center text-base leading-8 lg:text-lg lg:leading-9'
                    key={index}>
                    {koline}
                  </p>
                ))}
            </div>
          </React.Fragment>
        ) : (
          //가사도 번역도 없을 때
          <div className='grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8'>
            <div className='text-center'>
              <p className='mt-4 text-3xl font-bold tracking-tight text-gray-900'>
                등록 된 가사가 없습니다.
              </p>
              <p className='mt-2 text-base leading-7 text-gray-600'>
                가사를 추가하고 번역을 시작해보세요.
              </p>
              <div className='mt-10 flex items-center justify-center gap-x-6'>
                <button
                  onClick={() => {
                    route.push(`/addtranslate/${id}?lang=ko`);
                  }}
                  className='mb-10 flex items-center gap-2 rounded-md bg-music-blue px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                  <CgAddR />
                  가사 등록하기
                </button>
              </div>
            </div>
          </div>
        ))}

      {lyricsVer === '일본어 버전 가사' &&
        /* {가사가 있을 때} */
        (music?.jplyrics && music?.jptranslate ? (
          <div>
            {music?.jplyrics
              ?.split('\n')
              .map((jpline: string, index: number) => (
                <p
                  className='text-center text-base leading-8 lg:text-lg lg:leading-9'
                  key={index}>
                  {jpline}
                </p>
              ))}
          </div>
        ) : // 가사는 있지만 번역이 없을때
        music?.kotranslate === null ? (
          <React.Fragment>
            <div className='flex flex-col items-center gap-2'>
              <button
                onClick={() => {
                  route.push(`/addtranslate/${id}?lang=jp`);
                }}
                className='mb-10 flex items-center gap-2 rounded-md bg-music-orange px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600'>
                <CgAddR className='text-lg' />
                한국어 번역 추가하기
              </button>
            </div>
            <div>
              {music?.jplyrics
                ?.split('\n')
                .map((jpline: string, index: number) => (
                  <p
                    className='text-center text-base leading-8 lg:text-lg lg:leading-9'
                    key={index}>
                    {jpline}
                  </p>
                ))}
            </div>
          </React.Fragment>
        ) : (
          //가사도 번역도 없을 때
          <div className='grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8'>
            <div className='text-center'>
              <p className='mt-4 text-3xl font-bold tracking-tight text-gray-900'>
                등록 된 가사가 없습니다.
              </p>
              <p className='mt-2 text-base leading-7 text-gray-600'>
                가사를 추가하고 번역을 시작해보세요.
              </p>
              <div className='mt-10 flex items-center justify-center gap-x-6'>
                <button
                  onClick={() => {
                    route.push(`/addtranslate/${id}?lang=ko`);
                  }}
                  className='mb-10 flex items-center gap-2 rounded-md bg-music-blue px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                  <CgAddR />
                  가사 등록하기
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
