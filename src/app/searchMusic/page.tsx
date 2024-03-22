'use client';

import Pagination from '@/components/Pagination';
import {useInfiniteQuery} from '@tanstack/react-query';
import axios from 'axios';

import {useForm} from 'react-hook-form';

import {useEffect} from 'react';
import {useInView} from 'react-intersection-observer';
import SearchForm from '@/components/SearchForm';

export default function SearchMusic() {
  const {ref, inView} = useInView();

  //tanstack query사용
  const getMusicData = async ({pageParam}: {pageParam: number}) => {
    let postCount: number = 10;
    const {data} = await axios(
      `/api/searchmusic?pageParam=${pageParam}&postCount=${postCount}`,
    );
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

  const {
    register,
    handleSubmit,
    formState: {errors},
    watch,
    reset,
  } = useForm();

  return (
    <main className='flex-1'>
      <div className='container'>
        {/* music 목록 */}
        <SearchForm register={register} />
        <div className='h-4 w-full bg-music-blue' ref={ref}></div>
        {/* <Pagination /> */}
      </div>
    </main>
  );
}
