import HomeTitle from '@/components/HomeTitle';
import MusicCard from '@/components/MusicCard';
import MusicCardLayout from '@/components/MusicCardLayout';
import {SupabaseType} from '@/types/form';

import {useInfiniteQuery} from '@tanstack/react-query';
import axios from 'axios';

import {useEffect} from 'react';

export default async function Home() {
  //getStaticProps
  const firstMusicData = await fetch(
    `http://localhost:3000/api/searchmusic?pageParam=1&postCount=9`,
    {
      next: {revalidate: 10},
    },
  )
    .then((res) => res.json())
    .then((data) => data.posts);

  // console.log(firstMusicData);

  return (
    <main className=' flex-1 bg-[#F8F9FA] '>
      <div className='container py-20'>
        <HomeTitle />
        <div className='grid grid-cols-1 justify-between gap-x-20 gap-y-10 md:grid-cols-2 lg:grid-cols-3'>
          {firstMusicData.map((musicData: SupabaseType, index: number) => {
            return <MusicCard key={index} musicData={musicData} />;
          })}
        </div>
        {/* <MusicCardLayout /> */}
      </div>
    </main>
  );
}
