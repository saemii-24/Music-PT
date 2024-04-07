'use client';
import React, {useEffect, useLayoutEffect, useState} from 'react';

import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {useSession} from 'next-auth/react';

import {IoPlayCircleOutline} from 'react-icons/io5';

import type {SupabaseType} from '@/types/form';
import {deleteMusic} from '@/utils/form';

import {useRecoilState} from 'recoil';
import {needRefetch} from '@/recoil';

import cn from 'classnames';
import Like from './Like';
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

  //recoil
  const [needFetch, setNeedFetch] = useRecoilState(needRefetch);

  const {status} = useSession();

  //렌더링 될 data
  const [selectLang, setSelectLang] = useState<LangType>(
    music.kolyrics ? 'ko' : 'jp',
  );

  return (
    <section className='dark:bg-music-background'>
      <div className=' container grid grid-cols-4 xl:grid-cols-6 2xl:grid-cols-7 '>
        <div className='relative col-span-4 aspect-square overflow-hidden rounded-xl transition after:absolute after:left-0 after:top-0  after:z-10 after:size-full after:bg-black after:opacity-0 after:transition after:content-[""] hover:after:opacity-40 xl:col-span-2 xl:row-span-6 xl:mr-20'>
          <div className='absolute right-4 top-4 z-20 ml-auto flex gap-2'>
            <LangButton
              setSelectLang={setSelectLang}
              selectLang={selectLang}
              kosinger={music?.kosinger}
              jpsinger={music?.jpsinger}
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
        <div className='col-span-4 mb-[0.4rem] mt-5 xl:col-span-4'>
          <LikeCount music={music} />
        </div>
        <div className='order-first col-span-4 mt-[-2.5rem] flex justify-end xl:order-none xl:col-auto xl:mt-5'>
          <div className='right-0 top-[-100vw] flex items-center justify-center gap-2 md:top-0'>
            <p
              className='cursor-pointer text-black'
              onClick={() => {
                route.push(`/editmusic/${id}/`);
                setNeedFetch(true);
              }}>
              수정
            </p>
            {status === 'authenticated' && (
              <p
                className='cursor-pointer text-black before:mr-2 before:content-["|"]'
                onClick={async () => {
                  setNeedFetch(true);
                  await deleteMusic(id, route);
                }}>
                삭제
              </p>
            )}
          </div>
        </div>
        <div className='col-span-4 mb-4 text-4xl font-bold text-black xl:col-span-3  2xl:col-span-5'>
          {selectLang === 'ko' ? music?.kotitle : music?.jptitle}
        </div>
        <div className='leading-7 text-black xl:mt-3'>가수</div>
        <div className='col-span-3 text-black xl:col-span-3 xl:mt-3 2xl:col-span-4 '>
          {selectLang === 'ko' ? music?.kosinger : music?.jpsinger}
        </div>
        <div className='leading-7 text-black'>앨범</div>
        <div className='col-span-3 text-black xl:col-span-3 2xl:col-span-4 '>
          {selectLang === 'ko' ? music?.koalbum : music?.jpalbum}
        </div>
        <div className='leading-7 text-black'>발매년도</div>
        <div className='col-span-3 text-black xl:col-span-3 2xl:col-span-4 '>
          {selectLang === 'ko' ? music?.korelease : music?.jprelease}
        </div>
        <div className=' col-span-4 mb-10 mt-5 flex gap-6 xl:col-span-4 2xl:col-span-5 '>
          {music?.koyoutube ? (
            <Link
              href={music?.koyoutube}
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
          {music?.jpyoutube ? (
            <Link
              href={music?.jpyoutube}
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
  );
}
