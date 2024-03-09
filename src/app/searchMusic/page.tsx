'use client';

import {createClient} from '@/supabase/client';
import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import axios from 'axios';

import {useEffect} from 'react';
import {useInView} from 'react-intersection-observer';

export default function SearchMusic() {
  const {ref, inView} = useInView();

  // const id = params.id;

  //tanstack query사용
  const getMusicData = async () => {
    const {data} = await axios(`/api/music`);
    return data;
  };

  const {status, data, error} = useQuery({
    queryKey: ['search-music'],
    queryFn: getMusicData,
  });

  // let music = data?.posts[0];

  // console.log();

  if (status === 'pending') {
    return <span>Loading...</span>;
  }

  if (status === 'error') {
    return <span>Error: {error.message}</span>;
  }

  // const supabase = createClient();

  // //  supabase에서 10개씩 데이터를 가지고 온다.
  // const getMusicData = async (pageParam: number) => {
  //   const {data} = await supabase
  //     .from('Post')
  //     .select('*')
  //     .order('created_at', {ascending: false})
  //     .range(pageParam, pageParam + 9);

  //   console.log(data);

  //   if (!data) {
  //     return {
  //       musics: [],
  //       nextPage: null,
  //     };
  //   }
  //   return {
  //     musics: data,
  //     nextPage: data.length === 10 ? pageParam + 10 : null,
  //   };
  // };

  // const {
  //   fetchNextPage,
  //   fetchPreviousPage,
  //   hasNextPage,
  //   hasPreviousPage,
  //   isFetchingNextPage,
  //   isFetchingPreviousPage,
  //   ...result
  // } = useInfiniteQuery({
  //   queryKey: ['searchmusic'],
  //   queryFn: ({pageParam}: {pageParam: number}) => getMusicData(pageParam),
  //   initialPageParam: 0,
  //   getNextPageParam: (lastPage) => lastPage.nextPage,
  // });

  // useEffect(() => {
  //   if (inView && hasNextPage) fetchNextPage();
  // }, [inView, hasNextPage, fetchNextPage]);

  return (
    <div>
      {/* post 목록 */}
      <div ref={ref}></div>
    </div>
  );
}
