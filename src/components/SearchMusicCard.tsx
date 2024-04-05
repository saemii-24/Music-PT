'use client';
import type {LangType} from '@/types/form';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
import {useState} from 'react';
import cn from 'classnames';
import Like from './Like';
import LikeCount from './LikeCount';

export default function SearchMusicCard({music}: {music: any}) {
  const route = useRouter();
  //현재 보고 있는 버전 설정
  const [selectLang, setSelectLang] = useState<LangType>(
    music.kotitle ? 'ko' : 'jp',
  );

  return (
    <div className=' relative flex cursor-pointer items-center gap-10 py-10 sm:flex sm:flex-row'>
      <div
        className='aspect-square w-[full] overflow-hidden rounded-xl sm:w-[10.5rem] '
        onClick={(e) => {
          e.stopPropagation();
          route.push(`/musicpt/${music?.id}`);
        }}>
        <Image
          className={cn({
            hidden: selectLang === 'jp',
            block: selectLang === 'ko',
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
            hidden: selectLang === 'ko',
            block: selectLang === 'jp',
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
      <div className='absolute right-0 top-12 flex gap-2'>
        {music?.kolyrics && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectLang('ko');
            }}
            type='button'
            className='inline-block w-11 rounded-3xl bg-music-blue py-[0.1rem] text-center text-sm text-white hover:bg-music-lightblue'>
            KO
          </button>
        )}
        {music?.jplyrics && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectLang('jp');
            }}
            type='button'
            className='inline-block w-11 rounded-3xl bg-music-orange py-[0.1rem] text-center text-sm text-white hover:bg-music-lightorange'>
            JP
          </button>
        )}
      </div>
      <div className='flex flex-1 flex-col'>
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}>
          <LikeCount music={music} />
        </div>
        <h1 className='mb-2 mt-1 text-2xl font-medium '>
          {selectLang === 'ko' ? music?.kotitle : music?.jptitle}
        </h1>

        <div className='mb-1 flex text-base'>
          <span className='w-[6.5rem]'>가수</span>
          <span>{selectLang === 'ko' ? music?.kosinger : music?.jpsinger}</span>
        </div>
        <div className='mb-1 flex text-base'>
          <span className='w-[6.5rem]'>앨범</span>
          <span>{selectLang === 'ko' ? music?.koalbum : music?.jpalbum}</span>
        </div>
        <div className='mb-1 flex text-base'>
          <span className='w-[6.5rem]'>발매년도</span>
          <span>
            {selectLang === 'ko' ? music?.korelease : music?.jprelease}
          </span>
        </div>
      </div>
    </div>
  );
}
