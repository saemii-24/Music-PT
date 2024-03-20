'use client';

import {languageMode} from '@/recoil';
import {useRecoilValue} from 'recoil';

export default function HomeTitle() {
  // const lan = useRecoilValue(languageMode);

  return (
    <div className='mt-10'>
      <h1 className='flex flex-col gap-3 text-4xl font-extrabold'>
        {/* {lan['home-title'].split('\n').map((item, index) => {
          return <span key={index}>{item}</span>;
        })} */}
      </h1>
    </div>
  );
}
