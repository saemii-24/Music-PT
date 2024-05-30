import React, {memo} from 'react';
import HomeTitle from './HomeTitle';
import {SupabaseType} from '@/types/form';
import MusicCard from './MusicCard';

const MusicGrid = ({firstMusicData}: {firstMusicData: any}) => {
  return (
    <div className='container py-20'>
      <HomeTitle />
      <div className='grid grid-cols-1 justify-between gap-x-20 gap-y-10 lg:grid-cols-2 xl:grid-cols-3'>
        {firstMusicData?.posts?.map(
          (musicData: SupabaseType, index: number) => {
            return (
              <MusicCard key={index} musicData={musicData} index={index} />
            );
          },
        )}
      </div>
    </div>
  );
};

export default MusicGrid;
