'use client';

import {useQuery} from '@tanstack/react-query';
import axios from 'axios';

import EditMusicForm from '@/components/EditMusicForm';
import Title from '@/components/Title';

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

  const titleInfo = {
    title: '음악 수정하기',
    description: '기존에 등록한 음악 내용을 수정합니다.',
  };

  return (
    <main className=' flex-1 dark:bg-music-background'>
      <div className='container py-20'>
        <Title titleInfo={titleInfo} />
        <EditMusicForm id={id} music={music?.post} />
      </div>
    </main>
  );
}
