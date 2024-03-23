'use client';

import Pagination from '@/components/Pagination';
import {useInfiniteQuery} from '@tanstack/react-query';
import axios from 'axios';

import type {SelectType} from '@/types/form';

import {FieldValues, useForm} from 'react-hook-form';

import React, {useEffect, useState} from 'react';
import {useInView} from 'react-intersection-observer';
import SearchForm from '@/components/SearchForm';
import SearchMusicCard from '@/components/SearchMusicCard';
import SearchMusicTitle from '@/components/SearchMusicTitle';

export default function SearchMusic() {
  const {ref, inView} = useInView();
  const [select, setSelect] = useState<SelectType>('all');
  const [clientSelect, setClientSelect] = useState('제목');
  const [selectOpen, setSelectOpen] = useState<boolean>(false);

  const [music, setMusic] = useState<any>();
  const [search, setSearch] = useState<string>('');

  //tanstack query사용
  const getMusicData = async ({pageParam}: {pageParam: number}) => {
    let postCount: number = 10;
    const {data} = await axios(
      `/api/searchmusic?pageParam=${pageParam}&postCount=${postCount}&select=${select}&search=${search}`,
    );
    return data;
  };

  const {
    data,
    fetchNextPage,
    fetchPreviousPage,
    refetch,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
    ...result
  } = useInfiniteQuery({
    queryKey: ['searchmusic', select, search],
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

  useEffect(() => {
    refetch();
  }, [select, search]);

  //react-hook-form
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();

  console.log();

  return (
    <main className='flex-1'>
      <div className='container py-20'>
        {/* music 목록 */}
        <SearchMusicTitle />
        <div className='mt-10'>
          <SearchForm
            setSearch={setSearch}
            handleSubmit={handleSubmit}
            register={register}
            select={select}
            setSelect={setSelect}
            clientSelect={clientSelect}
            setClientSelect={setClientSelect}
            selectOpen={selectOpen}
            setSelectOpen={setSelectOpen}
          />
        </div>
        {data ? (
          data?.pages
            .map((item) => item.posts)
            .flat()
            .map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <SearchMusicCard item={item} />
                </React.Fragment>
              );
            })
        ) : (
          <div>없음</div>
        )}
        <div className='h-4 w-full bg-music-blue' ref={ref}></div>
        {/* <Pagination /> */}
      </div>
    </main>
  );
}
