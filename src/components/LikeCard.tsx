'use client';
import {SupabaseType} from '@/types/form';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import Like from './Like';

type LikeAllDataType = {
  createdAt: Date;
  id: number;
  music: SupabaseType;
  musicId: number;
  userId: string;
};

export default function LikeCard() {
  //사용자가 이 음악에 좋아요를 눌렀는지 확인이 필요하다.
  const getLikeAllData = async () => {
    const {data} = await axios.get(`/api/likecount`);
    return data;
  };

  const {data: likeAllData, refetch} = useQuery({
    queryKey: ['likeAll'],
    queryFn: getLikeAllData,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  console.log(likeAllData.likeAll);
  return (
    <div>
      {likeAllData?.likeAll.map((item: LikeAllDataType, index: number) => {
        return (
          <div key={index} className='flex items-start gap-3'>
            <div className='mt-[0.4rem]'>
              <Like music={item?.music} />
            </div>
            <div>
              <h2 className='text-xl font-bold'>
                {item?.music.kosinger
                  ? item?.music.kosinger
                  : item?.music.jpsinger}
              </h2>
              <div className='text-sm'>
                {item?.music.kotitle
                  ? item?.music.kotitle
                  : item?.music.jptitle}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
