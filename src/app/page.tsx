'use client';

import HomeTitle from '@/components/HomeTitle';
import MusicCard from '@/components/MusicCard';
import {SupabaseType} from '@/types/form';

import {useInfiniteQuery} from '@tanstack/react-query';
import axios from 'axios';

import {useEffect} from 'react';
import {useInView} from 'react-intersection-observer';

export default function Home() {
  const {ref, inView} = useInView();

  // //tanstack query사용
  const getMusicData = async ({pageParam}: {pageParam: number}) => {
    try {
      let postCount: number = 6;
      const {data} = await axios.get(
        `/api/searchmusic?pageParam=${pageParam}&postCount=${postCount}`,
      );
      return data;
    } catch (error) {
      console.error('에러가 발생했습니다.:', error);
    }
  };

  const {
    data: music,
    isError,
    isLoading,
    isFetched,
    isFetchedAfterMount,
    fetchNextPage,
    hasNextPage,
    refetch,
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
    refetchInterval: 2000, // 2초마다 refetch 시도
    refetchOnMount: true, // 컴포넌트가 마운트될 때 refetch하지 않음
    refetchOnReconnect: false, // 재연결 시 refetch하지 않음
    refetchOnWindowFocus: false, // 창 포커스 시 refetch하지 않음
  });

  console.log(isFetched, isFetchedAfterMount);
  useEffect(() => {
    if (!isFetchedAfterMount) {
      fetchNextPage();
    }
  }, [fetchNextPage, isFetchedAfterMount]);

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) {
    return <div>로딩중입니다.</div>;
  }
  if (isError) {
    return <div>에러입니다.</div>;
  }

  return (
    <main className=' flex-1 bg-[#F8F9FA] '>
      <div className='container pt-20'>
        <HomeTitle />
        <div className='grid grid-cols-1 justify-between gap-x-20 gap-y-10 md:grid-cols-2 lg:grid-cols-3'>
          {music?.pages
            .flatMap((page) => page.posts)
            .map((musicData: SupabaseType, index) => {
              return <MusicCard key={index} musicData={musicData} />;
            })}
        </div>
        <div className='mt-20 h-10 w-full' ref={ref}></div>
      </div>
    </main>
  );
}
