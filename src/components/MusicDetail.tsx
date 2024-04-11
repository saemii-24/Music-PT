'use client';
import React, {useEffect, useState} from 'react';

import {MdOutlineUpdate} from 'react-icons/md';

import cn from 'classnames';

import type {MusicPtPropsOmitId} from '@/types/form';
import {languageMode} from '@/recoil';
import {useRecoilValue} from 'recoil';

export default function MusicDetail({
  music,
  lyricsVer,
  setLyricsVer,
}: MusicPtPropsOmitId) {
  const lan = useRecoilValue(languageMode);

  const [thisTitle, setThisTitle] = useState<string>(lan['music-title-korean']);

  const setTitle = (lyricsVer: string) => {
    switch (lyricsVer) {
      case 'koVer':
        setThisTitle(lan['music-title-korean']);
        break;
      case 'jpVer':
        setThisTitle(lan['music-title-japanese']);
        break;
      case 'koCompare':
        setThisTitle(lan['music-title-jpver-korean']);
        break;
      case 'jpCompare':
        setThisTitle(lan['music-title-kover-japanese']);
        break;
      default:
        setThisTitle(lan['music-title-korean']);
    }
  };

  useEffect(() => {
    setTitle(lyricsVer);
  }, [lyricsVer]);

  return (
    <section className='container mt-0 sm:mt-[10rem]'>
      <article className='relative '>
        <p className='mb-1 flex items-center gap-1 text-black'>
          <MdOutlineUpdate /> {music?.updatedAt?.slice(0, 10)}
        </p>
        <h2 className='text-4xl font-extrabold text-black'>{thisTitle}</h2>

        <div className='mt-10 flex gap-6 border-b-2 border-music-basicgray'>
          <ul className='flex gap-8'>
            <li
              onClick={() => {
                setLyricsVer('koVer');
              }}
              className={cn(
                'text-center sm:text-left dark:text-black cursor-pointer break-keep',
                lyricsVer === 'koVer' &&
                  'border-b-2 border-music-blue pb-5 font-bold text-music-blue dark:text-music-blue',
              )}>
              {lan['music-tab-korean']}
            </li>
            <li
              onClick={() => {
                setLyricsVer('jpVer');
              }}
              className={cn(
                'text-center sm:text-left dark:text-black cursor-pointer break-keep',
                lyricsVer === 'jpVer' &&
                  'border-b-2 border-music-blue pb-5 font-bold text-music-blue dark:text-music-blue',
              )}>
              {lan['music-tab-japanese']}
            </li>
            <li
              onClick={() => {
                setLyricsVer('koCompare');
              }}
              className={cn(
                'text-center sm:text-left dark:text-black cursor-pointer break-keep',
                lyricsVer === 'koCompare' &&
                  'border-b-2 border-music-blue pb-5 font-bold text-music-blue dark:text-music-blue',
              )}>
              {lan['music-tab-korean-compare']}
            </li>
            <li
              onClick={() => {
                setLyricsVer('jpCompare');
              }}
              className={cn(
                'text-center sm:text-left dark:text-black cursor-pointer break-keep',
                lyricsVer === 'jpCompare' &&
                  'border-b-2 border-music-blue pb-5 font-bold text-music-blue dark:text-music-blue',
              )}>
              {lan['music-tab-japanese-compare']}
            </li>
          </ul>
        </div>
      </article>
    </section>
  );
}
