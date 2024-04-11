'use client';

import {languageMode, musicAtom, needRefetch} from '@/recoil';
import {useRecoilState, useRecoilValue} from 'recoil';

import {BsTranslate} from 'react-icons/bs';

import {useForm} from 'react-hook-form';
import {useRouter} from 'next/navigation';

import type {PropsType} from '@/types/form';
import {onSumbitAddTranslate, makeDefaultObj} from '@/utils/form';
import {useEffect, useState} from 'react';

export default function MusicTranslateEdit({id, lang}: PropsType) {
  const route = useRouter();

  //recoil
  const music = useRecoilValue(musicAtom);
  const [needFetch, setNeedFetch] = useRecoilState(needRefetch);

  //이미 작성되어 있는 가사 불러오기
  let [defaultTranslate, setDefaultTranslate] = useState<string[]>([]);
  let [defaultFormValue, setDefaultFormValue] = useState<{
    [key: string]: string;
  }>({});

  useEffect(() => {
    let translatedText = '';

    if (lang === 'ko' && music.kotranslate) {
      translatedText = music.kotranslate;
    } else if (lang === 'jp' && music.jptranslate) {
      translatedText = music.jptranslate;
    }

    if (translatedText) {
      const splitTranslate = translatedText.split('\n');
      setDefaultTranslate(splitTranslate);
      const defaultObj = makeDefaultObj(splitTranslate);
      setDefaultFormValue(defaultObj);
      reset(defaultObj); //react-hook-form의 기본값 설정
    }
  }, [music, lang]);

  //react-hook-form
  const {
    register,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({
    defaultValues: defaultFormValue,
  });

  const lan = useRecoilValue(languageMode);

  return (
    <div className='flex flex-col items-center gap-20 '>
      <section className='container mt-0 sm:mt-[10rem]'>
        <div className='relative'>
          <p className='mb-1 flex items-center gap-1 text-music-subtitle'>
            <BsTranslate />{' '}
            {lang === 'ko'
              ? lan['edittranslate-description-korean']
              : lan['edittranslate-description-japanese']}
          </p>
          <h2 className='text-4xl font-extrabold text-black'>
            {' '}
            {lang === 'ko'
              ? lan['edittranslate-title-korean']
              : lan['edittranslate-title-japanese']}
          </h2>
          <div className='mt-10 flex gap-6 border-b'></div>
        </div>
      </section>
      <section className='max-w-full'>
        <form
          className='flex flex-col'
          onSubmit={handleSubmit((data) =>
            onSumbitAddTranslate(data, id, lang, route, setNeedFetch),
          )}>
          {lang === 'jp'
            ? music?.jplyrics
                ?.split('\n')
                .map((jpline: string, index: number) => (
                  <div key={index} className='mb-8'>
                    <p className='text-center text-base leading-8 text-black lg:text-lg lg:leading-9'>
                      {jpline}
                    </p>
                    <input
                      type='text'
                      {...register(`lyrics_${index}`, {required: true})}
                      id='title'
                      className='block w-[100%] rounded-md border-0 bg-white py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-music-blue sm:text-sm sm:leading-6 dark:ring-music-basicgray'
                    />
                  </div>
                ))
            : music?.kolyrics
                ?.split('\n')
                .map((koline: string, index: number) => (
                  <div key={index} className='mb-8'>
                    <p className='text-center text-base leading-8 text-black lg:text-lg lg:leading-9'>
                      {koline}
                    </p>
                    <input
                      type='text'
                      {...register(`lyrics_${index}`, {required: true})}
                      id='title'
                      className='block w-[100%] rounded-md border-0 bg-white py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-music-blue sm:text-sm sm:leading-6 dark:ring-music-basicgray'
                    />
                  </div>
                ))}

          {/* 제출 */}
          <div className='mt-6 flex items-center justify-center gap-x-6'>
            <button
              onClick={() => {
                route.push(`/musicpt/${id}`);
              }}
              type='button'
              className='text-sm font-semibold leading-6 text-black '>
              {lan['addtranslate-button-cancle']}
            </button>
            <button
              type='submit'
              className='rounded-md bg-music-blue px-3 py-2 text-sm font-semibold text-[#fff] shadow-sm transition hover:bg-music-lightblue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
              {lan['addtranslate-button-submit']}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
