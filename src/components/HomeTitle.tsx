'use client';

import {languageMode} from '@/recoil';
import {useRecoilValue} from 'recoil';

export default function HomeTitle() {
  const lan = useRecoilValue(languageMode);

  return (
    <div className='mt-5 sm:mt-10'>
      <h1 className='232429flex max-w-[400px] flex-col gap-3 break-keep text-3xl font-bold leading-[140%] text-black sm:text-4xl sm:font-extrabold sm:leading-[143%]'>
        {lan['home-title']}
      </h1>
    </div>
  );
}
