'use client';

import {languageMode, language} from '@/recoil';
import {useRecoilValue} from 'recoil';

import cn from 'classnames';

export default function HomeTitle() {
  const lan = useRecoilValue(languageMode);
  const nowlan = useRecoilValue(language);

  return (
    <div className='mt-5 sm:mt-10'>
      <h1
        className={cn(
          'flex w-full flex-col gap-3 break-keep text-3xl font-bold leading-140% text-black sm:text-4xl sm:font-extrabold sm:leading-[143%] lg:w-[400px]',
          {
            'text-[1.675rem]': nowlan === 'jp',
          },
        )}>
        {lan['home-title']}
      </h1>
    </div>
  );
}
