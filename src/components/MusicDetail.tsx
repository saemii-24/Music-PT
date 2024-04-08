'use client';
import React from 'react';

import {MdOutlineUpdate} from 'react-icons/md';

import cn from 'classnames';

import type {MusicPtPropsOmitId} from '@/types/form';

export default function MusicDetail({
  music,
  lyricsVer,
  setLyricsVer,
}: MusicPtPropsOmitId) {
  return (
    <section className='container mt-0 sm:mt-[10rem]'>
      <article className='relative '>
        <p className='mb-1 flex items-center gap-1 text-black'>
          <MdOutlineUpdate /> {music?.updatedAt?.slice(0, 10)}
        </p>
        <h2 className='text-4xl font-extrabold text-black'>{lyricsVer}</h2>

        <div className='mt-10 flex gap-6 border-b-2 border-music-basicgray'>
          <ul className='flex gap-8'>
            <li
              onClick={() => {
                setLyricsVer('한국어 버전 가사');
              }}
              className={cn(
                'text-center sm:text-left dark:text-black cursor-pointer break-keep',
                lyricsVer === '한국어 버전 가사' &&
                  'border-b-2 border-music-blue pb-5 font-bold text-music-blue dark:text-music-blue',
              )}>
              한국어 버전
            </li>
            <li
              onClick={() => {
                setLyricsVer('일본어 버전 가사');
              }}
              className={cn(
                'text-center sm:text-left dark:text-black cursor-pointer break-keep',
                lyricsVer === '일본어 버전 가사' &&
                  'border-b-2 border-music-blue pb-5 font-bold text-music-blue dark:text-music-blue',
              )}>
              일본어 버전
            </li>
            <li
              onClick={() => {
                setLyricsVer('한국어 비교하기');
              }}
              className={cn(
                'text-center sm:text-left dark:text-black cursor-pointer break-keep',
                lyricsVer === '한국어 비교하기' &&
                  'border-b-2 border-music-blue pb-5 font-bold text-music-blue dark:text-music-blue',
              )}>
              한국어 비교하기
            </li>
            <li
              onClick={() => {
                setLyricsVer('일본어 비교하기');
              }}
              className={cn(
                'text-center sm:text-left dark:text-black cursor-pointer break-keep',
                lyricsVer === '일본어 비교하기' &&
                  'border-b-2 border-music-blue pb-5 font-bold text-music-blue dark:text-music-blue',
              )}>
              일본어 비교하기
            </li>
          </ul>
        </div>
      </article>
    </section>
  );
}
