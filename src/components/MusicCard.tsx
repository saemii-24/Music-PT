'use client';
import type {LangType, SupabaseType} from '@/types/form';
import Image from 'next/image';
import {useRouter} from 'next/navigation';

import {FaHeart} from 'react-icons/fa6';
import {MdOutlineUpdate} from 'react-icons/md';

import {useRecoilValue} from 'recoil';
import {languageMode} from '@/recoil/index';
import {useState} from 'react';
import cn from 'classnames';
import LikeCount from './LikeCount';
import LangButton from './LangButton';

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
}
