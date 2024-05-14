'use client';
import type {LangType, SupabaseType} from '@/types/form';
import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/navigation';

import {MdOutlineUpdate} from 'react-icons/md';

import {useRecoilValue} from 'recoil';
import {languageMode} from '@/recoil/index';
import {memo, useState} from 'react';
import cn from 'classnames';

import LikeCount from './LikeCount';
import LangButton from './LangButton';
import DefaultImage from './DefaultImage';

const MusicCard = ({musicData}: {musicData: SupabaseType}) => {
  const {
    id,
    jpalbum,
    jplyrics,
    jprelease,
    jpsinger,
    jpthumbnail,
    jptitle,
    jptranslate,
    jpyoutube,
    koalbum,
    kolyrics,
    korelease,
    kosinger,
    kothumbnail,
    kotitle,
    kotranslate,
    koyoutube,
    date,
  } = musicData;

  const lan = useRecoilValue(languageMode);
  const route = useRouter();

  //현재 보고 있는 버전 설정
  const [selectLang, setSelectLang] = useState<LangType>(kotitle ? 'ko' : 'jp');

  return (
    <div className='mt-20 w-full overflow-hidden rounded-lg bg-white shadow-sm'>
      <Link
        href={`/musicpt/${musicData.id}`}
        className='block aspect-[8/5] w-full cursor-pointer overflow-hidden '>
        <div
          className={cn('relative aspect-square w-full', {
            hidden: selectLang === 'jp',
            block: selectLang === 'ko',
          })}>
          {selectLang === 'ko' &&
            (kothumbnail ? (
              <Image
                src={kothumbnail}
                sizes='(min-width: 1024px) 20vw, (min-width: 640px) 600px, 100vw'
                alt={kotitle + '앨범 이미지'}
                priority={true}
                fill={true}
                quality={80}
              />
            ) : (
              <DefaultImage />
            ))}
        </div>
        <div
          className={cn('relative aspect-square w-full', {
            hidden: selectLang === 'ko',
            block: selectLang === 'jp',
          })}>
          {selectLang === 'jp' &&
            (jpthumbnail ? (
              <Image
                src={jpthumbnail}
                sizes='(min-width: 1024px) 20vw, (min-width: 640px) 600px, 100vw'
                alt={jptitle + '앨범 이미지'}
                priority={true}
                fill={true}
                quality={80}
              />
            ) : (
              <DefaultImage />
            ))}
        </div>
      </Link>
      <div className='h-[150px] p-5'>
        {/* 카드 윗 줄 */}
        <div className='flex items-center'>
          <p className='font-medium text-black'>
            {selectLang === 'ko' ? kosinger : jpsinger}
          </p>
          <div className='relative ml-auto '>
            <LangButton
              setSelectLang={setSelectLang}
              kolyrics={kolyrics}
              jplyrics={jplyrics}
            />
          </div>
        </div>
        {/* 카드 제목 */}
        <h1 className='mt-2 text-2xl font-medium text-black'>
          {selectLang === 'ko' ? kotitle : jptitle}
        </h1>
      </div>
      {/* 작성자 좋아요 */}
      <div className='flex border-t border-music-basicgray px-5 py-3'>
        <div className='flex items-center gap-1'>
          <div>
            <MdOutlineUpdate className='text-lg text-black' />
          </div>
          <div className='text-sm text-black '>{date.slice(0, 10)}</div>
        </div>
        <div className='ml-auto flex items-center gap-1 text-sm'>
          <div>
            <LikeCount music={musicData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(MusicCard);
