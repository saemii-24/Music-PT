import {LanguageType, SupabaseType} from '@/types/form';
import {memo} from 'react';
import Link from 'next/link';
import {IoPlayCircleOutline} from 'react-icons/io5';

const YoutubeButton = ({
  music,
  lan,
}: {
  music: SupabaseType;
  lan: LanguageType;
}) => {
  return (
    <div className=' col-span-4 mb-10 mt-5 flex gap-6 lg:col-span-4 2xl:col-span-5 '>
      {music?.koyoutube ? (
        <Link
          href={music?.koyoutube}
          target='_blank'
          className='flex items-center justify-center gap-2 break-keep rounded-md border-2 border-music-orange px-3 py-2 text-sm font-semibold text-music-orange shadow-sm transition hover:bg-music-orange hover:text-[#fff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
          <IoPlayCircleOutline className='text-lg' />
          {lan['music-youtube-ko']}
        </Link>
      ) : (
        <div className=' flex items-center justify-center gap-2 break-keep rounded-md bg-music-disable px-3 py-2 text-sm font-semibold text-[#333] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:text-[#575B6C]'>
          <IoPlayCircleOutline className='text-lg' />
          {lan['music-youtube-ko']}
        </div>
      )}
      {music?.jpyoutube ? (
        <Link
          href={music?.jpyoutube}
          target='_blank'
          className='flex items-center justify-center gap-2 break-keep rounded-md border-2 border-music-orange px-3 py-2 text-sm font-semibold text-music-orange shadow-sm transition hover:bg-music-orange hover:text-[#fff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
          <IoPlayCircleOutline className='text-lg' />
          {lan['music-youtube-jp']}
        </Link>
      ) : (
        <div className=' flex items-center justify-center gap-2 break-keep rounded-md bg-music-disable px-3 py-2 text-sm font-semibold text-[#333] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:text-[#575B6C]'>
          <IoPlayCircleOutline className='text-lg' />
          {lan['music-youtube-jp']}
        </div>
      )}
    </div>
  );
};

export default memo(YoutubeButton);
