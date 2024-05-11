'use client';
import {useState, memo} from 'react';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
import Link from 'next/link';

import type {LangType, StatusType} from '@/types/form';

import cn from 'classnames';
import LikeCount from './LikeCount';
import LangButton from './LangButton';
import DefaultImageSquare from './DefaultImageSquare';
import SK_SearchCard from '@/app/skeleton/SK_SeachCard';

import {useRecoilValue} from 'recoil';
import {languageMode} from '@/recoil';

const SearchMusicCard = ({music, status}: {music: any; status: StatusType}) => {
  const lan = useRecoilValue(languageMode);

  const route = useRouter();
  //현재 보고 있는 버전 설정
  const [selectLang, setSelectLang] = useState<LangType>(
    music.kotitle ? 'ko' : 'jp',
  );

  if (status === 'pending') {
    return <SK_SearchCard />;
  }

  return (
    <div className=' relative flex cursor-pointer items-center gap-10 py-10 sm:flex sm:flex-row'>
      <Link
        className='aspect-square w-[full] overflow-hidden rounded-xl sm:w-[10.5rem] '
        href={`/musicpt/${music?.id}`}
        onClick={(e) => {
          e.stopPropagation();
        }}>
        <div
          className={cn('relative aspect-square w-full', {
            hidden: selectLang === 'jp',
            block: selectLang === 'ko',
          })}>
          {selectLang === 'ko' &&
            (music?.kothumbnail ? (
              <Image
                src={music?.kothumbnail}
                width={168}
                height={168}
                alt={music?.kotitle + '앨범 이미지'}
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
                width={168}
                height={168}
                alt={music?.jptitle + '앨범 이미지'}
              />
            ) : (
              <DefaultImageSquare />
            ))}
        </div>
      </Link>
      <div className='absolute right-0 top-12 flex gap-2'>
        <LangButton
          setSelectLang={setSelectLang}
          kolyrics={music?.kolyrics}
          jplyrics={music?.jplyrics}
        />
      </div>
      <div className='flex flex-1 flex-col'>
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}>
          <LikeCount music={music} />
        </div>
        <h1 className='mb-2 mt-1 text-2xl font-medium text-black'>
          {selectLang === 'ko' ? music?.kotitle : music?.jptitle}
        </h1>

        <div className='mb-1 flex text-base'>
          <span className='w-[6.5rem] text-black'>{lan['music-singer']}</span>
          <span className='text-black'>
            {selectLang === 'ko' ? music?.kosinger : music?.jpsinger}
          </span>
        </div>
        <div className='mb-1 flex text-base'>
          <span className='w-[6.5rem] text-black'>{lan['music-album']}</span>
          <span className='text-black'>
            {selectLang === 'ko' ? music?.koalbum : music?.jpalbum}
          </span>
        </div>
        <div className='mb-1 flex text-base'>
          <span className='w-[6.5rem] text-black'>{lan['music-release']}</span>
          <span className='text-black'>
            {selectLang === 'ko' ? music?.korelease : music?.jprelease}
          </span>
        </div>
      </div>
    </div>
  );
};

export default memo(SearchMusicCard);
