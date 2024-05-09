'use client';
import {LangType, SupabaseType} from '@/types/form';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import Like from './Like';
import cn from 'classnames';
import SK_Load from '@/app/skeleton/SK_Load';
import {useRouter} from 'next/navigation';
import LangButton from './LangButton';
import {useState} from 'react';
import LikeCardOne from './LikeCardOne';

type LikeAllDataType = {
  createdAt: Date;
  id: number;
  music: SupabaseType;
  musicId: number;
  userId: string;
};

export default function LikeCard() {
  const route = useRouter();

  //사용자가 이 음악에 좋아요를 눌렀는지 확인이 필요하다.
  const getLikeAllData = async () => {
    const {data} = await axios.get(`/api/likecount`);
    return data;
  };

  const {
    status,
    data: likeAllData,
    refetch,
  } = useQuery({
    queryKey: ['likeAll'],
    queryFn: getLikeAllData,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  if (status === 'pending') {
    return (
      <div className='flex h-full items-center justify-center text-center text-music-subtitle'>
        <SK_Load />
      </div>
    );
  }

  return (
    <div>
      {likeAllData?.likeAll.map((item: LikeAllDataType, index: number) => {
        return (
          <div
            key={index}
            className={cn(
              'w-full flex items-start gap-3 py-4 border-music-basicgray',
              {
                'border-b': likeAllData?.likeAll.length - 1 !== index,
              },
            )}>
            <LikeCardOne music={item?.music} />
          </div>
        );
      })}
    </div>
  );
}
