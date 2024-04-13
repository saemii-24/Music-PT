'use client';
import React, {useEffect, useLayoutEffect, useState} from 'react';

import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {useSession} from 'next-auth/react';

import {IoPlayCircleOutline} from 'react-icons/io5';

import type {LanguageType, SupabaseType} from '@/types/form';
import {deleteMusic} from '@/utils/form';

import {useRecoilState, useRecoilValue} from 'recoil';
import {languageMode, needRefetch} from '@/recoil';

import cn from 'classnames';
import LikeCount from './LikeCount';
import LangButton from './LangButton';

type LangType = 'ko' | 'jp';

export default function MusicProfile({
  music,
  id,
}: {
  music: SupabaseType;
  id: string;
}) {
  const route = useRouter();
  const lan: LanguageType = useRecoilValue(languageMode);

  //recoil
  const [needFetch, setNeedFetch] = useRecoilState(needRefetch);

  const {status} = useSession();

  //렌더링 될 data
  const [selectLang, setSelectLang] = useState<LangType>(
    music?.kolyrics ? 'ko' : 'jp',
  );

  return (
    <section className='dark:bg-music-background'>
      <div className=' container grid grid-cols-4 lg:grid-cols-6 2xl:grid-cols-7 '>
        <div className='relative col-span-4 aspect-square overflow-hidden rounded-lg transition after:absolute after:left-0 after:top-0  after:z-10 after:size-full after:bg-[#000] after:opacity-0 after:transition after:content-[""] hover:after:opacity-40 lg:col-span-2 lg:row-span-6 lg:mr-20'>
          <div className='absolute right-4 top-4 z-20 ml-auto flex gap-2'>
            <LangButton
              setSelectLang={setSelectLang}
              kolyrics={music?.kolyrics}
              jplyrics={music?.jplyrics}
            />
          </div>
          <Image
            className={cn({
              block: selectLang === 'ko',
              hidden: selectLang === 'jp',
            })}
            priority={true}
            src={music?.kothumbnail ? music?.kothumbnail : '/default_card.png'}
            alt={music?.kotitle ? music?.kotitle + '이미지' : '음악 썸네일'}
            width={0}
            height={0}
            sizes='100vw'
            style={{width: '100%', height: '100%', objectFit: 'cover'}}
          />

          <Image
            className={cn({
              block: selectLang === 'jp',
              hidden: selectLang === 'ko',
            })}
            priority={true}
            src={music?.jpthumbnail ? music?.jpthumbnail : '/default_card.png'}
            alt={music?.jptitle ? music?.jptitle + '이미지' : '음악 썸네일'}
            width={0}
            height={0}
            sizes='100vw'
            style={{width: '100%', height: '100%', objectFit: 'cover'}}
          />
        </div>
        <div className='col-span-3 mb-[0.4rem] mt-5 sm:col-span-4'>
          <LikeCount music={music} />
        </div>
        <div className='order-first col-span-4 mt-[-2.5rem] flex justify-end lg:order-none lg:col-auto lg:mt-5'>
          <div className='right-0 top-[-100vw] flex items-center justify-center gap-2 md:top-0'>
            <p
              className='cursor-pointer text-black'
              onClick={() => {
                route.push(`/editmusic/${id}/`);
                setNeedFetch(true);
              }}>
              {lan['music-edit']}
            </p>
            {status === 'authenticated' && (
              <p
                className='cursor-pointer text-black before:mr-2 before:content-["|"]'
                onClick={async () => {
                  setNeedFetch(true);
                  await deleteMusic(id, route, lan);
                }}>
                {lan['music-delete']}
              </p>
            )}
          </div>
        </div>
        <div className='col-span-4 mb-4 text-4xl font-bold text-black lg:col-span-4  2xl:col-span-5'>
          {selectLang === 'ko' ? music?.kotitle : music?.jptitle}
        </div>
        <div className='leading-7 text-black lg:mt-3'>
          {' '}
          {lan['music-singer']}
        </div>
        <div className='col-span-3 text-black lg:col-span-3 lg:mt-3 2xl:col-span-4 '>
          {selectLang === 'ko' ? music?.kosinger : music?.jpsinger}
        </div>
        <div className='leading-7 text-black'> {lan['music-album']}</div>
        <div className='col-span-3 text-black lg:col-span-3 2xl:col-span-4 '>
          {selectLang === 'ko' ? music?.koalbum : music?.jpalbum}
        </div>
        <div className='leading-7 text-black'> {lan['music-release']}</div>
        <div className='col-span-3 text-black lg:col-span-3 2xl:col-span-4 '>
          {selectLang === 'ko' ? music?.korelease : music?.jprelease}
        </div>
        <div className=' col-span-4 mb-10 mt-5 flex gap-6 lg:col-span-4 2xl:col-span-5 '>
          {music?.koyoutube ? (
            <Link
              href={music?.koyoutube}
              target='_blank'
              className='flex items-center justify-center gap-2 break-keep rounded-md border-2 border-music-orange px-3 py-2 text-sm font-semibold text-music-orange shadow-sm transition hover:bg-music-orange hover:text-[#fff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
              <IoPlayCircleOutline className='text-lg' />
              {lan['music-youtube-ko']}
            </Link>
          ) : (
            <div className=' flex items-center justify-center gap-2 break-keep rounded-md bg-music-disable px-3 py-2 text-sm font-semibold text-[#333] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:text-[#575B6C]'>
              <IoPlayCircleOutline className='text-lg' />
              {lan['music-youtube-ko']}
            </div>
          )}
          {music?.jpyoutube ? (
            <Link
              href={music?.jpyoutube}
              target='_blank'
              className='flex items-center justify-center gap-2 break-keep rounded-md border-2 border-music-orange px-3 py-2 text-sm font-semibold text-music-orange shadow-sm transition hover:bg-music-orange hover:text-[#fff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
              <IoPlayCircleOutline className='text-lg' />
              {lan['music-youtube-jp']}
            </Link>
          ) : (
            <div className=' flex items-center justify-center gap-2 break-keep rounded-md bg-music-disable px-3 py-2 text-sm font-semibold text-[#333] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:text-[#575B6C]'>
              <IoPlayCircleOutline className='text-lg' />
              {lan['music-youtube-jp']}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
