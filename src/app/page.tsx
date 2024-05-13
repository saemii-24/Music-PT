'use client';

import HomeTitle from '@/components/HomeTitle';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import {useRecoilState} from 'recoil';
import {needRefetch} from '@/recoil';
import {useEffect} from 'react';
import SK_Home from './skeleton/SK_Home';
import MusicGrid from '@/components/MusicGrid';
import Preview from '@/components/Preview';

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
      <MusicGrid firstMusicData={firstMusicData} />
    </main>
  );
}
