'use client';

import EditMusicTitle from '@/components/EditMusicTitle';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';

import EditMusicForm from '@/components/EditMusicForm';

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

  if (status === 'pending') {
    return <span>Loading...</span>;
  }

  if (status === 'error') {
    return <span>에러가 발생</span>;
  }

  return (
    <main className=' flex-1 '>
      <div className='container py-20'>
        <EditMusicTitle />
        <EditMusicForm id={id} music={music?.post} />
      </div>
    </main>
  );
}
