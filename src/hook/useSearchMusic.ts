import {useEffect} from 'react';
import {useInfiniteQuery} from '@tanstack/react-query';
import axios from 'axios';
import {SelectType} from '@/types/form';

const getMusicData = async ({
  pageParam = 0,
  queryKey,
}: {
  pageParam: number;
  queryKey: any;
}) => {
  const [, select, search] = queryKey;
  const postCount = 10;
  const {data} = await axios.get(
    `/api/searchmusic?pageParam=${pageParam}&postCount=${postCount}&select=${select}&search=${search}`,
  );
  return data;
};

export const useSearchMusic = (
  select: SelectType,
  search: string,
  ref: any,
  inView: any,
) => {
  const {
    status,
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

  return {
    status,
    data,
    fetchNextPage,
    fetchPreviousPage,
    refetch,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
    ref,
    ...result,
  };
};
