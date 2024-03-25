'use client';
import {languageMode} from '@/recoil';
import {useRecoilValue} from 'recoil';

interface TitleProps {
  LoginTitleInfo: {
    title: string;
    description: string;
  };
}
export default function Title({LoginTitleInfo}: TitleProps) {
  const {title, description} = LoginTitleInfo;
  const lan = useRecoilValue(languageMode);
  return (
    <div className=' border-gray-900/10 pb-12'>
      <h1 className='flex flex-col gap-3 text-4xl font-extrabold'>{title}</h1>
      <p className='mt-2 leading-6 text-gray-600'>{description}</p>
    </div>
  );
}
