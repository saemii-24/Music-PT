'use client';

import Button from './Button';

import type {MusicPtProps} from '@/types/form';

import {useRouter} from 'next/navigation';
import React, {useEffect, useState} from 'react';
import MusicLyricsNone from './MusicLyricsNone';

export default function Lyrics({lyricsVer, music, id}: MusicPtProps) {
  const route = useRouter();

  let [condition, setCondition] = useState<number>(11);
  let [showTranslate, setShowTranslate] = useState<boolean>(false);

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
    <article className='rounded-lg '>
      <div className='flex flex-col items-center py-20'>
        {/* 한국어 버전 탭 */}
        {condition === 11 && (
          <React.Fragment>
            <div className='grid grid-cols-2 gap-4 sm:grid-cols-3'>
              <Button
                text={'한국어 가사 수정하기'}
                icon='add'
                onClick={() => {
                  route.push(`/musicpt/${id}/editlyrics-ko`);
                }}
              />

              {music?.kotranslate ? (
                <Button
                  text={'일본어 번역 수정하기'}
                  icon='translate'
                  onClick={() => {
                    route.push(`/musicpt/${id}/edittranslate-ko`);
                  }}
                />
              ) : (
                <Button
                  text={'일본어 번역 추가하기'}
                  icon='add'
                  onClick={() => {
                    route.push(`/musicpt/${id}/addtranslate-ko`);
                  }}
                />
              )}
              {/* 불가능 할 때 */}

              {music?.kotranslate === null || music?.kotranslate === '' ? (
                <Button
                  text={'일본어 번역 함께 보기'}
                  icon='divide'
                  addclass='col-span-2 sm:col-span-1 cursor-default'
                />
              ) : (
                <Button
                  text={'일본어 번역 함께 보기'}
                  icon='divide'
                  addclass={
                    showTranslate
                      ? 'col-span-2 sm:col-span-1 bg-music-blue text-white'
                      : 'col-span-2 sm:col-span-1'
                  }
                  onClick={() => {
                    setShowTranslate(!showTranslate);
                  }}
                />
              )}
            </div>
            {showTranslate ? (
              <div className='mt-10'>
                {music?.kolyrics
                  ?.split('\n')
                  .map((koline: string, index: number) => (
                    <React.Fragment key={index}>
                      <p className='text-center text-base leading-8 text-black lg:text-lg lg:leading-9'>
                        {koline}
                      </p>
                      <p className='mb-4 text-center text-base leading-8 text-music-blue lg:text-lg lg:leading-9'>
                        {music?.kotranslate?.split('\n')[index]}
                      </p>
                    </React.Fragment>
                  ))}
              </div>
            ) : (
              <div className='mt-10'>
                {music?.kolyrics
                  ?.split('\n')
                  .map((koline: string, index: number) => (
                    <p
                      className='text-center text-base leading-8 text-black lg:text-lg lg:leading-9'
                      key={index}>
                      {koline}
                    </p>
                  ))}
              </div>
            )}
          </React.Fragment>
        )}

        {condition === 12 && (
          <MusicLyricsNone push={`/musicpt/${id}/addlyrics-ko`} />
        )}

        {/* 일본어 버전 탭 */}
        {condition === 21 && (
          <React.Fragment>
            <div className='grid grid-cols-2 gap-4 sm:grid-cols-3'>
              <Button
                text={'일본어 가사 수정하기'}
                icon='add'
                onClick={() => {
                  route.push(`/musicpt/${id}/editlyrics-jp`);
                }}
              />

              {music?.kotranslate ? (
                <Button
                  text={'한국어 번역 수정하기'}
                  icon='translate'
                  onClick={() => {
                    route.push(`/musicpt/${id}/edittranslate-jp`);
                  }}
                />
              ) : (
                <Button
                  text={'한국어 번역 추가하기'}
                  icon='add'
                  onClick={() => {
                    route.push(`/musicpt/${id}/addtranslate-jp`);
                  }}
                />
              )}
              {/* 불가능 할 때 */}

              {music?.kotranslate === null || music?.kotranslate === '' ? (
                <Button
                  text={'한국어 번역 함께 보기'}
                  icon='divide'
                  addclass='col-span-2 sm:col-span-1 cursor-default'
                />
              ) : (
                <Button
                  text={'한국어 번역 함께 보기'}
                  icon='divide'
                  addclass={
                    showTranslate
                      ? 'col-span-2 sm:col-span-1 bg-music-blue text-white'
                      : 'col-span-2 sm:col-span-1'
                  }
                  onClick={() => {
                    setShowTranslate(!showTranslate);
                  }}
                />
              )}
            </div>
            {showTranslate ? (
              <div className='mt-10'>
                {music?.jplyrics
                  ?.split('\n')
                  .map((jpline: string, index: number) => (
                    <React.Fragment key={index}>
                      <p className='text-center text-base leading-8 text-black lg:text-lg lg:leading-9 '>
                        {jpline}
                      </p>
                      <p className='mb-4 text-center text-base leading-8 text-music-blue lg:text-lg lg:leading-9'>
                        {music?.jptranslate?.split('\n')[index]}
                      </p>
                    </React.Fragment>
                  ))}
              </div>
            ) : (
              <div className='mt-10'>
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
            )}
          </React.Fragment>
        )}

        {condition === 22 && (
          <MusicLyricsNone push={`/musicpt/${id}/addlyrics-jp`} />
        )}
      </div>
    </article>
  );
}
