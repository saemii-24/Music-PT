'use client';

import {useEffect} from 'react';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import {useRecoilState} from 'recoil';
import {needRefetch} from '@/recoil';

function useFirstMusicData() {
  // //recoil
  const [needFetch, setNeedFetch] = useRecoilState(needRefetch);

  const getFirstMusicData = async () => {
    const {data} = await axios.get(
      `/api/searchmusic?pageParam=1&postCount=9&select=all&search=first`,
    );
    return data;
  };

  const {
    status,
    data: firstMusicData,
    refetch,
  } = useQuery({
    queryKey: ['music-pt', 'first'],
    queryFn: getFirstMusicData,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  useEffect(() => {
    if (needFetch) {
      refetch();
      setNeedFetch(false);
    }
  }, [needFetch]);

  return {status, firstMusicData};
}
export default useFirstMusicData;
