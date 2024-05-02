'use client';

import HomeTitle from '@/components/HomeTitle';
import MusicCard from '@/components/MusicCard';
import {SupabaseType} from '@/types/form';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import {atom, useRecoilState} from 'recoil';
import {musicAtom, needRefetch} from '@/recoil';
import {useEffect} from 'react';
import SK_Home from './skeleton/SK_Home';

export default function Home() {
  // //recoil
  const [needFetch, setNeedFetch] = useRecoilState(needRefetch);

  const getFirstMusicData = async () => {
    const {data} = await axios.get(
      `/api/searchmusic?pageParam=1&postCount=9&select=all&search=first`,
    );
    return data;
  };

  const {
    status,
    data: firstMusicData,
    refetch,
  } = useQuery({
    queryKey: ['music-pt', 'first'],
    queryFn: getFirstMusicData,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  useEffect(() => {
    if (needFetch) {
      refetch();
      setNeedFetch(false);
    }
  }, [needFetch]);

  if (status === 'pending') {
    return (
      <main className='flex-1  bg-music-background'>
        <div className='container py-20'>
          <HomeTitle />
          <SK_Home />
        </div>
      </main>
    );
  }

  return (
    <main className='flex-1 bg-music-background'>
      <div className='container py-20'>
        <HomeTitle />
        <div className='grid grid-cols-1 justify-between gap-x-20 gap-y-10 lg:grid-cols-2 xl:grid-cols-3'>
          {firstMusicData?.posts?.map(
            (musicData: SupabaseType, index: number) => {
              return <MusicCard key={index} musicData={musicData} />;
            },
          )}
        </div>
      </div>
    </main>
  );
}
