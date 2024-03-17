'use client';

import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';

import {needRefetch} from '@/recoil';
import {useRecoilState} from 'recoil';

import {MdOutlineUpdate} from 'react-icons/md';
import {IoAlertCircle} from 'react-icons/io5';

import {useForm} from 'react-hook-form';

import TextAreaForm from './TextAreaForm';
import type {PropsType, TextAreaValue} from '@/types/form';
import {onSubmitAddLyrics} from '@/utils/form';

export default function MusicLyricsAdd({lang, id}: PropsType) {
  const route = useRouter();

  //recoil
  const [needFetch, setNeedFetch] = useRecoilState(needRefetch);

  //react-hook-form
  const {
    register,
    handleSubmit,
    formState: {errors},
    watch,
  } = useForm<TextAreaValue>();

  // 'lyrics'필드 입력 enter 수에 따라 textarea 길이가 변동한다.
  let [length, setLength] = useState<number>(1);
  const lyricsValue = watch('lyrics');

  useEffect(() => {
    if (lyricsValue) {
      const linelength = lyricsValue.split('\n').length;
      setLength(linelength);
    } else {
      setLength(1);
    }
  }, [lyricsValue]);

  return (
    <div className='flex flex-col items-center gap-20 '>
      <section className='container mt-[10rem]'>
        <div className='relative'>
          <p className='mb-1 flex items-center gap-1'>
            <MdOutlineUpdate /> {lang === 'ko' ? '한국어' : '일본어'} 가사를
            추가합니다.
          </p>
          <h2 className='text-4xl font-extrabold'>
            {lang === 'ko' ? '한국어' : '일본어'} 가사 추가
          </h2>
          <div className='mt-10 flex gap-6 border-b'></div>
        </div>
      </section>
      <section className='container flex flex-col gap-3'>
        <p className='flex items-center justify-center gap-1 text-music-orange'>
          <IoAlertCircle />한 문장씩 줄바꿈하며 입력해주세요.
        </p>
        <form
          className='flex flex-col'
          onSubmit={handleSubmit((data) =>
            onSubmitAddLyrics(data, id, lang, route, setNeedFetch),
          )}>
          <TextAreaForm
            register={register}
            defaultlyrics={''}
            route={route}
            id={id}
            buttontext={'작성완료'}
            length={length}
          />
        </form>
      </section>
    </div>
  );
}
