'use client';
import {language, languageMode} from '@/recoil';
import {MusicPtProps} from '@/types/form';
import cn from 'classnames';
import {memo, useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';

const MusicCompare = ({lyricsVer, music, id}: MusicPtProps) => {
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
  const nowLanguage = useRecoilValue(language);

  return (
    <article className='container rounded-lg'>
      <div className=' flex flex-col items-center py-20 '>
        <div className='flex w-full flex-col items-start md:flex-row'>
          <div className='flex w-full flex-col rounded-2xl py-16 md:w-[50%]'>
            <h2
              className={cn(
                'mb-2 min-h-[80px] break-all text-center text-3xl font-bold text-black',
                lyricsVer === 'koVer'
                  ? 'border-b-2 border-music-blue pb-5 font-bold text-music-blue dark:text-music-blue'
                  : '',
                nowLanguage === 'ko' ? 'break-keep' : 'break-all',
              )}>
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
            <h2
              className={cn(
                'mb-2 min-h-[80px] break-all text-center text-3xl font-bold text-black',
                lyricsVer === 'koVer'
                  ? 'border-b-2 border-music-blue pb-5 font-bold text-music-blue dark:text-music-blue'
                  : '',
                nowLanguage === 'ko' ? 'break-keep' : 'break-all',
              )}>
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
};
export default memo(MusicCompare);
