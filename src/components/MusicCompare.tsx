'use client';
import {MusicPtProps} from '@/types/form';
import {useEffect, useState} from 'react';

export default function MusicCompare({lyricsVer, music, id}: MusicPtProps) {
  let [thisLyrics, setThisLyrics] = useState<string | null | undefined>();
  let [thisTranslate, setThisTranslate] = useState<string | null | undefined>();

  useEffect(() => {
    if (lyricsVer === '한국어 비교하기') {
      setThisLyrics(music?.kolyrics);
      setThisTranslate(music?.jptranslate);
    } else if (lyricsVer === '일본어 비교하기') {
      setThisLyrics(music?.jplyrics);
      setThisTranslate(music?.kotranslate);
    }
  }, [lyricsVer]);

  return (
    <article className='rounded-lg '>
      <div className='container flex flex-col items-center py-20'>
        <div className='flex w-full '>
          <div className='flex w-[50%] flex-col rounded-2xl py-16'>
            <h2 className=' mb-2 text-center text-3xl font-bold'>
              {lyricsVer === '한국어 비교하기'
                ? '한국어 버전 가사'
                : '일본어 버전 가사'}
            </h2>
            {!thisLyrics ? (
              <p className='text-center text-base leading-8 text-gray-600 lg:text-lg lg:leading-9'>
                등록 된 가사가 없습니다.
              </p>
            ) : (
              thisLyrics?.split('\n').map((koline, index) => {
                return (
                  <p
                    className='text-center text-base leading-8 lg:text-lg lg:leading-9'
                    key={index}>
                    {koline}
                  </p>
                );
              })
            )}
          </div>
          <div className='flex w-[50%] flex-col rounded-2xl bg-music-lightgray py-16'>
            <h2 className=' mb-2 text-center text-3xl font-bold'>
              {lyricsVer === '한국어 비교하기'
                ? '일본어 버전의 한국어 번역 가사'
                : '한국어 버전의 일본어 번역 가사'}
            </h2>
            {!thisTranslate ? (
              <p className='text-center text-base leading-8 text-gray-600 lg:text-lg lg:leading-9'>
                등록 된 가사가 없습니다.
              </p>
            ) : (
              thisTranslate?.split('\n').map((jptransline, index) => {
                return (
                  <p
                    className='text-center text-base leading-8 lg:text-lg lg:leading-9'
                    key={index}>
                    {jptransline}
                  </p>
                );
              })
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
