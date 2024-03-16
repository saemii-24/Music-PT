'use client';

import Link from 'next/link';
import {LyricsVerType} from './MusicDetail';

import type {SupabaseType} from '@/types/form';

import {useRouter} from 'next/navigation';
import React, {useEffect, useState} from 'react';

import {CgAddR} from 'react-icons/cg';
import {BsTranslate} from 'react-icons/bs';
import {FiEdit} from 'react-icons/fi';

export default function Lyrics({
  lyricsVer,
  music,
  id,
}: {
  lyricsVer: LyricsVerType;
  music: SupabaseType | null;
  id: string;
}) {
  const route = useRouter();

  let [condition, setCondition] = useState<number>(11);
  console.log(music);
  console.log(lyricsVer);

  /*분기
  (한국어 버전 탭을 클릭한 경우)
  1-1.한국어 버전 가사가 등록O, 한TO일 번역 등록O => 한국어 가사 수정하기
  1-2.한국어 버전 가사가 등록O, 한TO일 번역 등록X => 한국어 가사 수정하기
  1-2.한국어 버전 가사가 등록X, 한TO일 번역 등록X => 등록 가사 없음 / 한국어 가사 추가하기
  
  (일본어 버전 탭울 클릭한 경우)
  2-1.일본어 버전 가사가 등록O, 일TO한 번역 등록O => 일본어 가사 수정하기
  2-2.일본어 버전 가사가 등록O, 일TO한 번역 등록X => 일본어 가사 수정하기
  2-2.일본어 버전 가사가 등록X, 일TO한 번역 등록X => 등록 가사 없음 / 일본어 가사 추가하기

  */

  //분기에 따라 state를 교체해준다.
  useEffect(() => {
    if (lyricsVer === '한국어 버전 가사') {
      if (music?.kolyrics) {
        setCondition(11);
      } else {
        setCondition(12);
      }
    } else if (lyricsVer === '일본어 버전 가사') {
      if (music?.jplyrics) {
        setCondition(21);
      } else {
        setCondition(22);
      }
    }
  }, [lyricsVer, music]);

  return (
    <div className='flex flex-col items-center py-20'>
      {/* 한국어 버전 탭 */}
      {condition === 11 && (
        <React.Fragment>
          <div className='flex items-center gap-4'>
            <button
              onClick={() => {
                route.push(`/musicpt/${id}/editlyrics-ko`);
              }}
              className='mb-10 flex items-center gap-2 rounded-md bg-music-blue px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
              <FiEdit className='text-lg' />
              한국어 가사 수정하기
            </button>
            {music?.kotranslate ? (
              <button
                onClick={() => {
                  route.push(`/musicpt/${id}/edittranslate-ko`);
                }}
                className='mb-10 flex items-center gap-2 rounded-md bg-music-orange px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600'>
                <BsTranslate className='text-lg' />
                일본어 번역 수정하기
              </button>
            ) : (
              <button
                onClick={() => {
                  route.push(`/musicpt/${id}/addtranslate-ko`);
                }}
                className='mb-10 flex items-center gap-2 rounded-md bg-music-orange px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600'>
                <BsTranslate className='text-lg' />
                일본어 번역 추가하기
              </button>
            )}
          </div>
          <div>
            {music?.kolyrics
              ?.split('\n')
              .map((koline: string, index: number) => (
                <p
                  className='text-center text-base leading-8 lg:text-lg lg:leading-9'
                  key={index}>
                  {koline}
                </p>
              ))}
          </div>
        </React.Fragment>
      )}

      {condition === 12 && (
        <div className='grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8'>
          <div className='text-center'>
            <p className='mt-4 text-3xl font-bold tracking-tight text-gray-900'>
              등록 된 가사가 없습니다.
            </p>
            <p className='mt-2 text-base leading-7 text-gray-600'>
              가사를 추가하고 번역을 시작해보세요.
            </p>
            <div className='mt-10 flex items-center justify-center gap-x-6'>
              <button
                onClick={() => {
                  route.push(`/musicpt/${id}/addlyrics-ko`);
                }}
                className='mb-10 flex items-center gap-2 rounded-md bg-music-blue px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                <CgAddR />
                가사 등록하기
              </button>
            </div>
          </div>
        </div>
      )}
      {/* 일본어 버전 탭 */}
      {condition === 21 && (
        <React.Fragment>
          <div className='flex flex-col items-center gap-2'>
            <button
              onClick={() => {
                route.push(`/musicpt/${id}/addtranslate-jp`);
              }}
              className='mb-10 flex items-center gap-2 rounded-md bg-music-orange px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600'>
              <CgAddR className='text-lg' />
              한국어 번역 수정하기
            </button>
          </div>
          <div>
            {music?.jplyrics
              ?.split('\n')
              .map((jpline: string, index: number) => (
                <p
                  className='text-center text-base leading-8 lg:text-lg lg:leading-9'
                  key={index}>
                  {jpline}
                </p>
              ))}
          </div>
        </React.Fragment>
      )}
      {condition === 22 && (
        <div className='grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8'>
          <div className='text-center'>
            <p className='mt-4 text-3xl font-bold tracking-tight text-gray-900'>
              등록 된 가사가 없습니다.
            </p>
            <p className='mt-2 text-base leading-7 text-gray-600'>
              가사를 추가하고 번역을 시작해보세요.
            </p>
            <div className='mt-10 flex items-center justify-center gap-x-6'>
              <button
                onClick={() => {
                  route.push(`/musicpt/${id}/addlyrics-jp`);
                }}
                className='mb-10 flex items-center gap-2 rounded-md bg-music-blue px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                <CgAddR />
                가사 등록하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
