import LikeCard from '@/components/LikeCard';
import {LanguageType} from '@/types/form';
import cn from 'classnames';
import {memo} from 'react';
import {IoHeartCircleOutline} from 'react-icons/io5';

const MyLikeList = ({lan}: {lan: LanguageType}) => {
  return (
    <div className='gap-20 border-gray-900/10 py-12 md:grid md:grid-cols-3'>
      <div className='sm:col-span-12 md:col-span-1'>
        <h2 className='flex items-center gap-2 text-base font-semibold leading-7 text-black '>
          <IoHeartCircleOutline className='text-xl text-music-blue' />
          {lan['mypage-like']}
        </h2>
      </div>
      <div className='mt-6 block sm:col-span-12 md:col-span-2 md:mt-0 xl:flex xl:flex-col'>
        <div className='flex flex-col gap-0 xl:flex-row xl:gap-20'>
          <div className='w-full'>
            <p className='block text-sm font-medium leading-6 text-black '>
              {lan['mypage-like-list']}
            </p>
            <div
              className={cn(
                'dark:bg-white likecard px-6 mt-2 h-[22rem] w-full overflow-auto rounded-md bg-[#fafafa]',
              )}>
              <LikeCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(MyLikeList);
