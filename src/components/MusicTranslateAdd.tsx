'use client';

import {musicAtom, needRefetch} from '@/recoil';
import {useRecoilState, useRecoilValue} from 'recoil';

import {BsTranslate} from 'react-icons/bs';

import {useForm} from 'react-hook-form';
import {useRouter} from 'next/navigation';

import type {PropsType} from '@/types/form';
import {onSumbitAddTranslate} from '@/utils/form';

export default function MusicTranslateAdd({id, lang}: PropsType) {
  const route = useRouter();

  //recoil
  const music = useRecoilValue(musicAtom);
  const [needFetch, setNeedFetch] = useRecoilState(needRefetch);

  //react-hook-form
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();

  return (
    <div className='flex flex-col items-center gap-20 '>
      <section className='container mt-[10rem]'>
        <div className='relative'>
          <p className='mb-1 flex items-center gap-1'>
            <BsTranslate /> 한국어 가사를 일본어로 번역합니다.
          </p>
          <h2 className='text-4xl font-extrabold'>일본어 번역 등록</h2>
          <div className='mt-10 flex gap-6 border-b'></div>
        </div>
      </section>
      <section className='max-w-full'>
        <form
          className='flex flex-col'
          onSubmit={handleSubmit((data) =>
            onSumbitAddTranslate(data, id, lang, route, setNeedFetch),
          )}>
          {lang === 'ko'
            ? music?.kolyrics
                ?.split('\n')
                .map((koline: string, index: number) => (
                  <div key={index} className='mb-8'>
                    <p className='text-center text-base leading-8 lg:text-lg lg:leading-9'>
                      {koline}
                    </p>
                    <input
                      type='text'
                      {...register(`lyrics_${index}`, {required: true})}
                      id='title'
                      className='block w-[100%] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-music-blue sm:text-sm sm:leading-6'
                    />
                  </div>
                ))
            : music?.jplyrics
                ?.split('\n')
                .map((koline: string, index: number) => (
                  <div key={index} className='mb-8'>
                    <p className='text-center text-base leading-8 lg:text-lg lg:leading-9'>
                      {koline}
                    </p>
                    <input
                      type='text'
                      {...register(`lyrics_${index}`, {required: true})}
                      id='title'
                      className='block w-[100%] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-music-blue sm:text-sm sm:leading-6'
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
              className='text-sm font-semibold leading-6 text-gray-900'>
              취소하기
            </button>
            <button
              type='submit'
              className='rounded-md bg-music-orange px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-music-lightorange focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
              등록하기
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
