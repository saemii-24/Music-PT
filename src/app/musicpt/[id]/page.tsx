'use client';

import MusicDetail from '@/components/MusicDetail';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
export interface ParamsProps {
  params: {id: string};
}

export default function MusicPt({params}: ParamsProps) {
  const id = params.id;

  //tanstack query사용
  const getMusicData = async () => {
    const {data} = await axios.get(`/api/music/${id}`);
    return data;
  };

  const {status, data: music} = useQuery({
    queryKey: ['music-pt', id],
    queryFn: getMusicData,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  if (status === 'pending') {
    return <span>Loading...</span>;
  }

  if (status === 'error') {
    return <span>에러가 발생</span>;
  }

  return <MusicDetail music={music?.post} id={id} />;
}
