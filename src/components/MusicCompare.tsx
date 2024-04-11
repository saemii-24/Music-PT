'use client';
import {languageMode} from '@/recoil';
import {MusicPtProps} from '@/types/form';
import {useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';

export default function MusicCompare({lyricsVer, music, id}: MusicPtProps) {
  let [thisLyrics, setThisLyrics] = useState<string | null | undefined>();
  let [thisTranslate, setThisTranslate] = useState<string | null | undefined>();

  useEffect(() => {
    if (lyricsVer === 'koCompare') {
      setThisLyrics(music?.kolyrics);
      setThisTranslate(music?.jptranslate);
    } else if (lyricsVer === 'jpCompare') {
      setThisLyrics(music?.jplyrics);
      setThisTranslate(music?.kotranslate);
    }
  }, [lyricsVer]);

  const lan = useRecoilValue(languageMode);

  return (
    <article className='container rounded-lg'>
      <div className=' flex flex-col items-center py-20 '>
        <div className='flex w-full flex-col items-start md:flex-row'>
          <div className='flex w-full flex-col rounded-2xl py-16 md:w-[50%]'>
            <h2 className='mb-2 text-center text-3xl font-bold text-black'>
              {lyricsVer === 'koCompare'
                ? lan['music-title-korean']
                : lan['music-title-japanese']}
            </h2>
            {!thisLyrics ? (
              <p className='text-center text-base leading-8  text-music-subtitle lg:text-lg lg:leading-9'>
                {lan['music-lyrics-none']}
              </p>
            ) : (
              thisLyrics?.split('\n').map((koline, index) => {
                return (
                  <p
                    className='text-center text-base leading-8 text-black lg:text-lg lg:leading-9'
                    key={index}>
                    {koline}
                  </p>
                );
              })
            )}
          </div>
          <div className='container flex size-full flex-col rounded-2xl bg-music-lightgray py-16 md:w-[50%]'>
            <h2 className='mb-2 text-center text-3xl font-bold text-black'>
              {lyricsVer === 'koCompare'
                ? lan['music-title-jpver-korean']
                : lan['music-title-kover-japanese']}
            </h2>
            {!thisTranslate ? (
              <p className='text-center text-base leading-8 text-music-subtitle lg:text-lg lg:leading-9'>
                {lan['music-lyrics-none']}
              </p>
            ) : (
              thisTranslate?.split('\n').map((jptransline, index) => {
                return (
                  <p
                    className='text-center text-base leading-8 text-black lg:text-lg lg:leading-9'
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
