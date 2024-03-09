'use client';

import {createClient} from '@/supabase/client';
import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import axios from 'axios';

import {useEffect} from 'react';
import {useInView} from 'react-intersection-observer';

export default function SearchMusic() {
  const {ref, inView} = useInView();

  //tanstack query사용
  const getMusicData = async ({pageParam}: {pageParam: number}) => {
    const {data} = await axios(`/api/searchmusic/${pageParam}`);
    return data;
  };

  const {
    data: music,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
    ...result
  } = useInfiniteQuery({
    queryKey: ['searchmusic'],
    queryFn: getMusicData,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  console.log(music);

  return (
    <main className='flex-1'>
      {/* post 목록 */}
      <div className='h-[20vw]'></div>
      <div className='h-[20vw]'></div>
      <div className='h-[20vw]'></div>
      <div className='h-[20vw]'></div>
      <div className='h-[20vw]'></div>
      <div className='h-[20vw]'></div>
      <div className='h-[20vw]'></div>
      <div className='h-[20vw]'></div>
      <div className='h-[20vw]'></div>
      <div className='h-[20vw]'></div>
      <div className='h-[20vw]'></div>
      <div className='h-4 w-full bg-music-blue' ref={ref}></div>
    </main>
  );
}
