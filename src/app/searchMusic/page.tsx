'use client';

import React, {useEffect, useState} from 'react';
import Pagination from '@/components/Pagination';
import {useInfiniteQuery} from '@tanstack/react-query';
import axios from 'axios';

import type {SelectType} from '@/types/form';

import {FieldValues, useForm} from 'react-hook-form';

import {useInView} from 'react-intersection-observer';

import SearchForm from '@/components/SearchForm';
import SearchMusicCard from '@/components/SearchMusicCard';
import MusicCard from '@/components/MusicCard';
import SearchMusicTitle from '@/components/SearchMusicTitle';

import cn from 'classnames';

export default function SearchMusic() {
  const {ref, inView} = useInView();
  const [select, setSelect] = useState<SelectType>('all');
  const [clientSelect, setClientSelect] = useState('제목');
  const [selectOpen, setSelectOpen] = useState<boolean>(false);
  const [isNull, setIsNull] = useState<boolean>(false);

  // const [music, setMusic] = useState<any>();
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

  useEffect(() => {
    setSearch('');
    refetch();
  }, [select]);

  //react-hook-form
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();

  //사이즈 별로 렌더링하기 위해, 사이즈 값을 얻는다.
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const windowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', windowResize);

    return () => {
      window.removeEventListener('resize', windowResize);
    };
  }, []);

  return (
    <main className='flex-1 sm:bg-white dark:bg-music-background'>
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
          (data?.pages.map((item) => item.posts).flat()).length > 0 ? (
            data?.pages
              .map((item) => item.posts)
              .flat()
              .map((music, index) => {
                return (
                  <div key={index}>
                    {windowWidth <= 640 ? (
                      <MusicCard musicData={music} />
                    ) : (
                      <div
                        className={
                          index !== 0 ? 'hidden border-t sm:block' : ''
                        }>
                        <SearchMusicCard music={music} />
                      </div>
                    )}
                  </div>
                );
              })
          ) : (
            <div>
              <p className='text-music-subtitle'>찾으시는 내용이 없습니다.</p>
            </div>
          )
        ) : (
          <div>로딩중...</div>
        )}
        {data && <div className='h-4 w-full ' ref={ref}></div>}
      </div>
    </main>
  );
}
