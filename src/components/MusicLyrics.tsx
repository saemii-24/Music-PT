'use client';

import Button from './Button';

import type {MusicPtProps} from '@/types/form';

import {useRouter} from 'next/navigation';
import React, {useEffect, useState} from 'react';
import MusicLyricsNone from './MusicLyricsNone';
import {useRecoilValue} from 'recoil';
import {languageMode} from '@/recoil';

export default function Lyrics({lyricsVer, music, id}: MusicPtProps) {
  const route = useRouter();

  let [condition, setCondition] = useState<number>(11);
  let [showTranslate, setShowTranslate] = useState<boolean>(false);

  //분기에 따라 state를 교체해준다.
  useEffect(() => {
    if (lyricsVer === 'koVer') {
      if (music?.kolyrics) {
        setCondition(11);
      } else {
        setCondition(12);
      }
    } else if (lyricsVer === 'jpVer') {
      if (music?.jplyrics) {
        setCondition(21);
      } else {
        setCondition(22);
      }
    }
  }, [lyricsVer, music]);

  const lan = useRecoilValue(languageMode);

  return (
    <article className='rounded-lg '>
      <div className='flex flex-col items-center py-20'>
        {/* 한국어 버전 탭 */}
        {condition === 11 && (
          <React.Fragment>
            <div className='grid grid-cols-2 gap-4 sm:grid-cols-3'>
              <Button
                text={lan['music-edit-korean']}
                icon='add'
                onClick={() => {
                  route.push(`/musicpt/${id}/editlyrics-ko`);
                }}
              />

              {music?.kotranslate ? (
                <Button
                  text={lan['music-edit-japanese-translate']}
                  icon='translate'
                  onClick={() => {
                    route.push(`/musicpt/${id}/edittranslate-ko`);
                  }}
                />
              ) : (
                <Button
                  text={lan['music-add-japanese']}
                  icon='add'
                  onClick={() => {
                    route.push(`/musicpt/${id}/addtranslate-ko`);
                  }}
                />
              )}
              {/* 불가능 할 때 */}

              {music?.kotranslate === null || music?.kotranslate === '' ? (
                <Button
                  text={lan['music-together-japanese']}
                  icon='divide'
                  addclass='col-span-2 sm:col-span-1 cursor-default bg-music-disable border-none text-music-textdisable'
                  defaultclass={false}
                />
              ) : (
                <Button
                  text={lan['music-together-japanese']}
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
                text={lan['music-edit-japanese']}
                icon='add'
                onClick={() => {
                  route.push(`/musicpt/${id}/editlyrics-jp`);
                }}
              />

              {music?.kotranslate ? (
                <Button
                  text={lan['music-edit-korean-translate']}
                  icon='translate'
                  onClick={() => {
                    route.push(`/musicpt/${id}/edittranslate-jp`);
                  }}
                />
              ) : (
                <Button
                  text={lan['music-add-korean']}
                  icon='add'
                  onClick={() => {
                    route.push(`/musicpt/${id}/addtranslate-jp`);
                  }}
                />
              )}
              {/* 불가능 할 때 */}

              {music?.kotranslate === null || music?.kotranslate === '' ? (
                <Button
                  text={lan['music-together-korean']}
                  icon='divide'
                  addclass='col-span-2 sm:col-span-1 cursor-default bg-music-disable border-none text-music-textdisable'
                  defaultclass={false}
                />
              ) : (
                <Button
                  text={lan['music-together-korean']}
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
                      className='text-center text-base leading-8 text-black lg:text-lg lg:leading-9'
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
