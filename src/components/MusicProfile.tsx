'use client';
import React, {useState, memo} from 'react';

import Image from 'next/image';
import {useRouter} from 'next/navigation';
import {useSession} from 'next-auth/react';

import type {LanguageType, SupabaseType} from '@/types/form';
import {deleteMusic} from '@/utils/form';

import {useRecoilState, useRecoilValue} from 'recoil';
import {languageMode, needRefetch} from '@/recoil';

import cn from 'classnames';

import LikeCount from './LikeCount';
import LangButton from './LangButton';
import DefaultImageSquare from './DefaultImageSquare';
import YoutubeButton from './YoutubeButton';

type LangType = 'ko' | 'jp';

const MusicProfile = ({music, id}: {music: SupabaseType; id: string}) => {
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
          <div
            className={cn('relative aspect-square w-full', {
              hidden: selectLang === 'jp',
              block: selectLang === 'ko',
            })}>
            {selectLang === 'ko' &&
              (music?.kothumbnail ? (
                <Image
                  src={music?.kothumbnail}
                  fill={true}
                  sizes='(min-width: 1280px) 300px (min-width: 1024px) 250px, (min-width: 640px) 600px, 100vw'
                  alt={music?.kotitle + '앨범 이미지'}
                  priority={true}
                />
              ) : (
                <DefaultImageSquare />
              ))}
          </div>
          <div
            className={cn('relative aspect-square w-full', {
              hidden: selectLang === 'ko',
              block: selectLang === 'jp',
            })}>
            {selectLang === 'jp' &&
              (music?.jpthumbnail ? (
                <Image
                  src={music?.jpthumbnail}
                  fill={true}
                  sizes='(min-width: 1280px) 300px (min-width: 1024px) 250px, (min-width: 640px) 600px, 100vw'
                  alt={music?.jptitle + '앨범 이미지'}
                />
              ) : (
                <DefaultImageSquare />
              ))}
          </div>
        </div>
        <div className='col-span-3 mb-[0.4rem] mt-5 2xl:col-span-4'>
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
        <div className='col-span-4 mb-4 text-4xl font-bold text-black xl:col-span-4  2xl:col-span-5'>
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
        <YoutubeButton music={music} lan={lan} />
      </div>
    </section>
  );
};

export default memo(MusicProfile);
