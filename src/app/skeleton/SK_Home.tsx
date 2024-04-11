import React from 'react';
import SK_MusicCard from './SK_MusicCard';

export default function SK_Home() {
  return (
    <main className='flex-1  bg-music-background'>
      <div className='container animate-pulse py-20'>
        <div className='mt-5 h-[84px] w-[full] rounded-md bg-music-skeleton   sm:mt-10 sm:h-[102px] lg:w-[400px] '></div>

        <div className='grid grid-cols-1 justify-between gap-x-20 gap-y-10 lg:grid-cols-2 xl:grid-cols-3'>
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
