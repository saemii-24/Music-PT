'use client';
import {languageMode, musicAtom, needRefetch} from '@/recoil';
import {useRecoilState, useRecoilValue} from 'recoil';
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';
import {FiEdit} from 'react-icons/fi';
import {useForm} from 'react-hook-form';

import {onSubmitEditLyrics} from '@/utils/form';
import type {LanguageType, PropsType, TextAreaValue} from '@/types/form';

import TextAreaForm from './TextAreaForm';

export default function MusicLyricsEdit({lang, id}: PropsType) {
  const route = useRouter();
  const lan: LanguageType = useRecoilValue(languageMode);

  //recoil
  const music = useRecoilValue(musicAtom);
  const [needFetch, setNeedFetch] = useRecoilState(needRefetch);

  //textarea 가사에 맞춰 높이 계산
  const [length, setLength] = useState<number>(0);
  const [defaultlyrics, setDefaultLyrics] = useState<string>('');

  useEffect(() => {
    if (lang === 'ko' && music.kolyrics) {
      let lyricslength = music.kolyrics?.split('\n').length;
      setLength(lyricslength);
      setDefaultLyrics(music.kolyrics);
    } else if (lang === 'jp' && music.jplyrics) {
      let lyricslength = music.jplyrics?.split('\n').length;
      setLength(lyricslength);
      setDefaultLyrics(music.jplyrics);
    }
  }, [lang, music.kolyrics, music.jplyrics]);

  //react-hook-form
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<TextAreaValue>();

  return (
    <div className='flex flex-col items-center gap-20 '>
      <section className='container mt-[10rem]'>
        <div className='relative'>
          <p className='mb-1 flex items-center gap-1 text-black'>
            <FiEdit /> {lan['edit-lyrics-title']}
          </p>
          <h2 className='text-4xl font-extrabold text-black'>
            {lang === 'ko'
              ? lan['edit-lyrics-korean']
              : lan['edit-lyrics-japanese']}{' '}
            {lan['edit-lyrics-description']}
          </h2>
          <div className='mt-10 flex gap-6 border-b-2 border-music-basicgray'></div>
        </div>
      </section>
      <section className='container '>
        <form
          className='flex flex-col'
          onSubmit={handleSubmit((data) =>
            onSubmitEditLyrics(data, id, lang, route, setNeedFetch, lan),
          )}>
          <TextAreaForm
            register={register}
            defaultlyrics={defaultlyrics}
            route={route}
            id={id}
            length={length}
          />
        </form>
      </section>
    </div>
  );
}
