'use client';
import HomeTitle from '@/components/HomeTitle';
import MusicCard from '@/components/MusicCard';
import {SupabaseType} from '@/types/form';

import {useInfiniteQuery} from '@tanstack/react-query';
import axios from 'axios';

import {useEffect} from 'react';
import {useInView} from 'react-intersection-observer';

export default function MusicCardLayout() {
  const {ref, inView} = useInView();
  // // //tanstack query사용
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
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
    refetchOnMount: true,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
  console.log(isFetched, isFetchedAfterMount);

  if (!isFetchedAfterMount) {
    fetchNextPage();
  }

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
    <>
      {music?.pages
        .flatMap((page) => page.posts)
        .map((musicData: SupabaseType, index) => {
          return <MusicCard key={index} musicData={musicData} />;
        })}

      <div className='mt-20 h-10 w-full bg-black' ref={ref}></div>
    </>
  );
}
