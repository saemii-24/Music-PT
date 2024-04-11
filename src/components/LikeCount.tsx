'use client';
import {FaHeart, FaRegHeart} from 'react-icons/fa6';
import {useSession} from 'next-auth/react';
import {SupabaseType} from '@/types/form';
import axios from 'axios';
import {useQuery} from '@tanstack/react-query';
import {toast} from 'react-toastify';
import {useRecoilValue} from 'recoil';
import {languageMode} from '@/recoil';

type LikeType = {
  music: SupabaseType;
};

export default function LikeCount({music}: LikeType) {
  const {data: session} = useSession();
  const lan = useRecoilValue(languageMode);

  const toggleLike = async () => {
    if (session?.user) {
      try {
        const {data} = await axios.post(`/api/like`, {
          musicId: music.id,
        });
        //찜하기 취소하기 로직
        if (data.now === 'add') {
          toast.success(lan['toast-music-add']);
        } else {
          toast.warning(lan['toast-music-cancle']);
        }
      } catch (err) {
        console.log(err);
      }
      likeDataRefetch();
      likeCountRefetch();
    } else {
      toast.warning(lan['toast-music-login']);
    }
  };

  //사용자가 이 음악에 좋아요를 눌렀는지 확인이 필요하다.
  const getLikeData = async () => {
    const {data} = await axios.get(`/api/like?id=${music?.id}`);
    return data;
  };

  const {data: likeData, refetch: likeDataRefetch} = useQuery({
    queryKey: ['like', music?.id],
    queryFn: getLikeData,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  //각 음악에 몇 개의 좋아요가 쌓여있는지 확인이 필요하다.
  const likeCount = async () => {
    const {data} = await axios.post(`/api/likecount`, {
      musicId: music?.id,
    });
    return data;
  };

  const {data: likeCountData, refetch: likeCountRefetch} = useQuery({
    queryKey: ['likeCount', music?.id],
    queryFn: likeCount,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return (
    <div className='flex items-center gap-2'>
      <button
        onClick={() => {
          toggleLike();
          likeCount();
        }}
        type='button'
        className='cursor-pointer'>
        {session ? (
          likeData?.like ? (
            <FaHeart className='text-music-orange' />
          ) : (
            <FaRegHeart className='text-black' />
          )
        ) : (
          <FaRegHeart className='text-black' />
        )}
      </button>
      <div className='text-black '>
        {likeCountData ? likeCountData?.count : 0}
      </div>
    </div>
  );
}
