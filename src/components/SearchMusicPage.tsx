'use client';

import React, {useEffect, useState} from 'react';

import type {SelectType} from '@/types/form';

import {useForm} from 'react-hook-form';
import {useInView} from 'react-intersection-observer';

import SearchForm from '@/components/SearchForm';
import SearchMusicCard from '@/components/SearchMusicCard';
import MusicCard from '@/components/MusicCard';
import SearchMusicTitle from '@/components/SearchMusicTitle';

import {languageMode} from '@/recoil';
import {useRecoilValue} from 'recoil';

import {useSearchMusic} from '@/hook/useSearchMusic';
import useWindowSize from '@/hook/useWindowSize';
import SK_SearchCard from '@/skeleton/SK_SeachCard';
import SK_MusicCard from '@/skeleton/SK_MusicCard';

export default function SearchMusicPage() {
  const lan = useRecoilValue(languageMode);

  const {ref, inView} = useInView();
  const [select, setSelect] = useState<SelectType>('all');
  const [clientSelect, setClientSelect] = useState(lan['search-rule-all']);
  const [selectOpen, setSelectOpen] = useState<boolean>(false);

  // const [music, setMusic] = useState<any>();
  const [search, setSearch] = useState<string>('');

  //tanstack query사용
  const {status, data, fetchNextPage, refetch, hasNextPage} = useSearchMusic(
    select,
    search,
    ref,
    inView,
  );

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

  //현재 window 사이즈 확인
  const {width} = useWindowSize();

  return (
    <main className='flex-1 sm:bg-white dark:bg-music-background'>
      <div className='container py-20'>
        {/* music 목록 */}
        <SearchMusicTitle lan={lan} />
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
                    {width! <= 640 ? (
                      <div>
                        <MusicCard index={index} musicData={music} />
                      </div>
                    ) : (
                      <div className='border-t border-music-basicgray'>
                        <SearchMusicCard music={music} status={status} />
                      </div>
                    )}
                  </div>
                );
              })
          ) : (
            <div>
              <p className='mt-[40px] flex h-20 items-center justify-center text-music-subtitle'>
                {lan['search-none']}
              </p>
            </div>
          )
        ) : (
          // 로딩중
          <>
            {width! <= 640 ? (
              <div>
                <SK_MusicCard />
              </div>
            ) : (
              <div>
                <SK_SearchCard />
              </div>
            )}
          </>
        )}
        {data && <div className='h-4 w-full ' ref={ref}></div>}
      </div>
    </main>
  );
}
