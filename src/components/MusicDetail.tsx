'use client';
import React, {useState} from 'react';

import {MdOutlineUpdate} from 'react-icons/md';

import cn from 'classnames';

import type {SupabaseType} from '@/types/form';
import MusicLyrics from './MusicLyrics';

export type LyricsVerType =
  | '한국어 버전 가사'
  | '일본어 버전 가사'
  | '한국어 비교하기'
  | '일본어 비교하기';

export default function MusicDetail({
  music,
  id,
}: {
  music: SupabaseType;
  id: string;
}) {
  const [lyricsVer, setLyricsVer] = useState<LyricsVerType>('한국어 버전 가사');

  return (
    <div className='flex-1'>
      <section className='container mt-[10rem]'>
        <div className='relative '>
          <p className='mb-1 flex items-center gap-1'>
            <MdOutlineUpdate /> {music?.date?.slice(0, 10)}
          </p>
          <h2 className='text-4xl font-extrabold'>{lyricsVer}</h2>

          <div className='mt-10 flex gap-6 border-b'>
            <ul className='flex gap-8'>
              <li
                onClick={() => {
                  setLyricsVer('한국어 버전 가사');
                }}
                className={cn(
                  'cursor-pointer',
                  lyricsVer === '한국어 버전 가사' &&
                    'border-b-2 border-music-blue pb-5 font-bold text-music-blue',
                )}>
                한국어 버전
              </li>
              <li
                onClick={() => {
                  setLyricsVer('일본어 버전 가사');
                }}
                className={cn(
                  'cursor-pointer',
                  lyricsVer === '일본어 버전 가사' &&
                    'border-b-2 border-music-blue pb-5 font-bold text-music-blue',
                )}>
                일본어 버전
              </li>
              <li
                onClick={() => {
                  setLyricsVer('한국어 비교하기');
                }}
                className={cn(
                  'cursor-pointer',
                  lyricsVer === '한국어 비교하기' &&
                    'border-b-2 border-music-blue pb-5 font-bold text-music-blue',
                )}>
                한국어 비교하기
              </li>
              <li
                onClick={() => {
                  setLyricsVer('일본어 비교하기');
                }}
                className={cn(
                  'cursor-pointer',
                  lyricsVer === '일본어 비교하기' &&
                    'border-b-2 border-music-blue pb-5 font-bold text-music-blue',
                )}>
                일본어 비교하기
              </li>
            </ul>
          </div>
        </div>

        <article className='rounded-lg '>
          <MusicLyrics id={id} lyricsVer={lyricsVer} music={music} />
        </article>
      </section>
    </div>
  );
}
