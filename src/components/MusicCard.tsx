'use client';
import {SupabaseType} from '@/types/form';
import Image from 'next/image';
import {useRouter} from 'next/navigation';

import {FaHeart} from 'react-icons/fa6';
import {MdOutlineUpdate} from 'react-icons/md';

import {useRecoilState, useRecoilValue} from 'recoil';
import {mode, language, languageMode} from '@/recoil/index';
import {useState} from 'react';
import cn from 'classnames';

type LangType = 'ko' | 'jp';

export default function MusicCard({musicData}: {musicData: SupabaseType}) {
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

  console.log(selectLang);

  return (
    <div className='mt-20 w-full overflow-hidden rounded-lg bg-white shadow-sm'>
      <div
        onClick={() => {
          route.push(`/musicpt/${musicData.id}`);
        }}
        className=' aspect-[8/5] w-full cursor-pointer overflow-hidden '>
        <Image
          className={cn({
            hidden: selectLang === 'jp',
            block: selectLang === 'ko',
          })}
          priority={true}
          src={kothumbnail ? kothumbnail : '/default_card.png'}
          alt={'음악'}
          width={0}
          height={0}
          sizes='100vw'
          style={{width: '100%', objectFit: 'cover'}}
        />
        <Image
          className={cn({
            hidden: selectLang === 'ko',
            block: selectLang === 'jp',
          })}
          priority={true}
          src={jpthumbnail ? jpthumbnail : '/default_card.png'}
          alt={'음악'}
          width={0}
          height={0}
          sizes='100vw'
          style={{width: '100%', objectFit: 'cover'}}
        />
      </div>
      <div className='h-[150px] p-5'>
        {/* 카드 윗 줄 */}
        <div className='flex items-center'>
          <p className='font-medium'>
            {selectLang === 'ko' ? kosinger : jpsinger}
          </p>
          <div className='relative ml-auto flex gap-2'>
            {kolyrics && (
              <button
                onClick={() => {
                  setSelectLang('ko');
                }}
                type='button'
                className='inline-block w-11 rounded-3xl bg-music-blue py-[0.1rem] text-center text-sm text-white hover:bg-indigo-500'>
                KO
              </button>
            )}
            {jplyrics && (
              <button
                onClick={() => {
                  setSelectLang('jp');
                }}
                type='button'
                className='inline-block w-11 rounded-3xl bg-music-orange py-[0.1rem] text-center text-sm text-white hover:bg-music-lightorange'>
                JP
              </button>
            )}
          </div>
        </div>
        {/* 카드 제목 */}
        <h1 className='mt-2 text-2xl font-medium'>
          {selectLang === 'ko' ? kotitle : jptitle}
        </h1>
      </div>
      {/* 작성자 좋아요 */}
      <div className='flex border-t px-5 py-3'>
        <div className='flex items-center gap-1'>
          <div>
            <MdOutlineUpdate className='text-lg' />
          </div>
          <div className='text-sm'>{date.slice(0, 10)}</div>
        </div>
        <div className='ml-auto flex items-center gap-1 text-sm'>
          <FaHeart className='text-sm' />
          <div>32</div>
        </div>
      </div>
    </div>
  );
}
