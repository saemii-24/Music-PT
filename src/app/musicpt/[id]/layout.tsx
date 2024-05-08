'use client';

import MusicDetail from '@/components/MusicDetail';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import MusicProfile from '@/components/MusicProfile';
import {atom, useRecoilState} from 'recoil';
import {musicAtom, needRefetch} from '@/recoil';
import {useEffect, useState} from 'react';
import SK_MusicProfile from '@/app/skeleton/SK_MusicProfile';
import Count from '@/components/Count';

interface ParamsChildrenProps {
  params: {id: string};
  children: React.ReactNode;
}

export default function MusicPtLayout({
  children,
  params,
}: Readonly<ParamsChildrenProps>) {
  const id = params.id;

  //recoil
  const [musicData, setMusicData] = useRecoilState(musicAtom);
  const [needFetch, setNeedFetch] = useRecoilState(needRefetch);

  //tanstack query사용
  const getMusicData = async () => {
    const {data} = await axios.get(`/api/music/${id}`);
    setMusicData(data?.post);
    return data;
  };

  const {
    status,
    data: music,
    refetch,
  } = useQuery({
    queryKey: ['music-pt', id],
    queryFn: getMusicData,
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
      <div className='flex-1 py-20 dark:bg-music-background'>
        <SK_MusicProfile />;
      </div>
    );
  }

  return (
    <div className='flex-1 dark:bg-music-background'>
      <main className='my-20'>
        <MusicProfile music={music?.post} id={id} />
        <div>{children}</div>
      </main>
    </div>
  );
}
