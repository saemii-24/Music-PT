'use client';

import MusicCompare from '@/components/MusicCompare';
import MusicDetail from '@/components/MusicDetail';
import MusicLyrics from '@/components/MusicLyrics';
import {musicAtom} from '@/recoil';
import type {LyricsVerType, ParamsProps} from '@/types/form';

import {useState} from 'react';
import {useRecoilValue} from 'recoil';

export default function MusicPt({params}: ParamsProps) {
  const [lyricsVer, setLyricsVer] = useState<LyricsVerType>('koVer');

  const id = params.id;

  //recoil
  const music = useRecoilValue(musicAtom);

  return (
    <div className='flex-1'>
      <MusicDetail
        music={music}
        setLyricsVer={setLyricsVer}
        lyricsVer={lyricsVer}
      />

      {lyricsVer === 'jpVer' || lyricsVer === 'koVer' ? (
        <MusicLyrics id={id} lyricsVer={lyricsVer} music={music} />
      ) : (
        <MusicCompare id={id} lyricsVer={lyricsVer} music={music} />
      )}
    </div>
  );
}
