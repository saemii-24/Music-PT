import {LanguageType} from '@/types/form';
import {memo} from 'react';

const SearchMusicTitle = ({lan}: {lan: LanguageType}) => {
  return (
    <div className='border-gray-900/10 text-black'>
      <h1 className='flex flex-col gap-3 text-4xl font-extrabold text-black'>
        {lan['search-title']}
      </h1>
      <p className='mt-2 leading-6 text-music-subtitle'>
        {lan['search-description']}
      </p>
    </div>
  );
};
export default memo(SearchMusicTitle);
