import React from 'react';
import SK_MusicCard from './SK_MusicCard';
import HomeTitle from '@/components/HomeTitle';

export default function SK_Home() {
  return (
    <main className='flex-1  bg-music-background'>
      <div className='container py-20'>
        <HomeTitle />
        <div className=' grid animate-pulse grid-cols-1 justify-between gap-x-20 gap-y-10 lg:grid-cols-2 xl:grid-cols-3'>
          {Array.from({length: 3}, (_, index) => {
            return (
              <React.Fragment key={index}>
                <SK_MusicCard />
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </main>
  );
}
