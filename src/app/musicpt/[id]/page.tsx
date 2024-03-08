'use client';

import {SupabaseType} from '@/types/form';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';

import Image from 'next/image';

interface ParamsProps {
  params: {id: string};
}

export default function MusicPt({params}: ParamsProps) {
  const id = params.id;

  //tanstack query사용
  const getMusicData = async () => {
    const {data} = await axios(`/api/music?id=${id}`);
    return data;
  };

  const {status, data, error} = useQuery({
    queryKey: ['music-pt', id],
    queryFn: getMusicData,
  });

  let music = data?.posts[0];

  console.log();

  if (status === 'pending') {
    return <span>Loading...</span>;
  }

  if (status === 'error') {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className='flex-1'>
      <main className='container'>
        <section>
          <div>
            <Image
              priority={true}
              src={music.kothumbnail}
              alt={music.title}
              fill
            />
          </div>
        </section>
        <section>
          <button>한국어 버전</button>
          <button>일본어 버전</button>
          <article>
            <div>
              {music.kolyrics.split('\n').map((item: string, index: number) => {
                return <p key={index}>{item}</p>;
              })}
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}
