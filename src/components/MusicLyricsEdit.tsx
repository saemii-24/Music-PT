'use client';
import {musicAtom} from '@/recoil';
import {useRecoilValue} from 'recoil';
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';
import {FiEdit} from 'react-icons/fi';

type PropsType = {
  lang: string;
  id: string;
};

export default function MusicLyricsEdit({lang, id}: PropsType) {
  const route = useRouter();
  console.log(id);

  //recoil
  const music = useRecoilValue(musicAtom);

  //textarea 가사에 맞춰 높이 계산
  const [length, setLength] = useState<number>(0);

  useEffect(() => {
    if (lang === 'ko' && music.kolyrics) {
      let lyricslength = music.kolyrics?.split('\n').length;
      setLength(lyricslength);
    } else if (lang === 'jp' && music.jplyrics) {
      let lyricslength = music.jplyrics?.split('\n').length;
      setLength(lyricslength);
    }
  }, [lang, music.kolyrics, music.jplyrics]);

  return (
    <div className='flex flex-col items-center gap-20 '>
      <section className='container mt-[10rem]'>
        <div className='relative'>
          <p className='mb-1 flex items-center gap-1'>
            <FiEdit /> 가사를 수정합니다.
          </p>
          <h2 className='text-4xl font-extrabold'>
            {lang === 'ko' ? '한국어' : '일본어'} 버전 가사 수정
          </h2>
          <div className='mt-10 flex gap-6 border-b'></div>
        </div>
      </section>
      <section className='container '>
        <form className='flex flex-col'>
          <textarea
            rows={length}
            className='rounded-lg border-2 border-black py-10 text-center  text-base leading-8 focus-visible:outline-indigo-600 lg:text-lg lg:leading-9'>
            {lang === 'ko' ? music.kolyrics : music.jplyrics}
          </textarea>
          {/* 제출 */}
          <div className='mt-6 flex items-center justify-center gap-x-6'>
            <button
              onClick={() => {
                route.push(`/musicpt/${id}`);
              }}
              type='button'
              className='text-sm font-semibold leading-6 text-gray-900'>
              취소하기
            </button>
            <button
              type='submit'
              className='rounded-md bg-music-orange px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-music-lightorange focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
              수정완료
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
