'use client';
import {useRouter} from 'next/navigation';
import LangButton from './LangButton';
import Like from './Like';
import {LangType, SupabaseType} from '@/types/form';
import {memo, useState} from 'react';

const LikeCardOne = ({music}: {music: SupabaseType}) => {
  const route = useRouter();

  const [selectLang, setSelectLang] = useState<LangType>('ko');

  return (
    <div className='flex w-full items-center justify-between'>
      <div className='flex gap-3'>
        <div className='mt-[0.4rem]'>
          <Like music={music} />
        </div>
        <div
          className='cursor-pointer'
          onClick={() => {
            route.push(`/musicpt/${music?.id}`);
          }}>
          <h2 className='text-base font-medium text-black'>
            {selectLang === 'ko' ? music.kotitle : music.jptitle}
          </h2>
          <div className='mt-1 text-sm text-black'>
            {selectLang === 'ko' ? music.kosinger : music.jpsinger}
          </div>
        </div>
      </div>
      <div className='items-end'>
        <LangButton
          setSelectLang={setSelectLang}
          kolyrics={music?.kolyrics}
          jplyrics={music?.jplyrics}
        />
      </div>
    </div>
  );
};

export default memo(LikeCardOne);
