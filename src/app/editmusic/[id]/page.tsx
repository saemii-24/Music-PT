'use client';

import {useQuery} from '@tanstack/react-query';
import axios from 'axios';

import EditMusicForm from '@/components/EditMusicForm';
import Title from '@/components/Title';
import Count from '@/components/Count';
import {useMemo, useState} from 'react';

import {languageMode} from '@/recoil';
import {useRecoilValue} from 'recoil';

interface ParamsChildrenProps {
  params: {id: string};
  children: React.ReactNode;
}

export default function EditMusic({
  children,
  params,
}: Readonly<ParamsChildrenProps>) {
  const id = params.id;

  //tanstack query사용
  const getMusicData = async () => {
    const {data} = await axios.get(`/api/music/${id}`);
    return data;
  };
  const lan = useRecoilValue(languageMode);

  const titleInfo = useMemo(() => {
    return {
      title: lan['edit-music-title'],
      description: lan['edit-music-description'],
    };
  }, [lan]);

  const {
    status,
    data: music,
    // refetch,
  } = useQuery({
    queryKey: ['music-pt', id],
    queryFn: getMusicData,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return (
    <main className=' flex-1 dark:bg-music-background'>
      <div className='container py-20'>
        <Title titleInfo={titleInfo} />
        <EditMusicForm id={id} music={music?.post} />
      </div>
    </main>
  );
}
