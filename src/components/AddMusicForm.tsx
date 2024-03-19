'use client';

import {languageMode} from '@/recoil';
import {useRecoilValue} from 'recoil';

import {useForm} from 'react-hook-form';
import type {FormValues} from '@/types/form';

import Error from './Error';
import {formSubmit} from '@/utils/form';
import {useRouter} from 'next/navigation';

import UploadImage from './UploadImage';
import SubmitButton from './SubmitButton';
import {useState} from 'react';
import cn from 'classnames';
import MusicFormKo from './MusicFormKo';
import MusicFormJp from './MusicFormJp';

type UploadVerType = 'ko' | 'jp';

export default function AddMusicForm() {
  //recoil 언어모드
  const lan = useRecoilValue(languageMode);
  const route = useRouter();

  //react-hook-form
  const {
    register,
    handleSubmit,
    formState: {errors},
    watch,
    reset,
  } = useForm<FormValues>({});

  const [uploadVer, setUploadVer] = useState<UploadVerType>('ko');

  return (
    <form onSubmit={handleSubmit((data) => formSubmit(data, route))}>
      {/* 업로드 음악 버전 선택 */}
      <div>
        <ul className='flex gap-8 border-b'>
          <li
            onClick={() => {
              setUploadVer('ko');
            }}
            className={cn(
              'cursor-pointer break-keep',
              uploadVer === 'ko' &&
                'border-b-2 border-music-blue pb-5 font-bold text-music-blue',
            )}>
            한국어 버전
          </li>
          <li
            onClick={() => {
              setUploadVer('jp');
            }}
            className={cn(
              'cursor-pointer break-keep',
              uploadVer === 'jp' &&
                'border-b-2 border-music-blue pb-5 font-bold text-music-blue',
            )}>
            일본어 버전
          </li>
        </ul>
      </div>
      {uploadVer === 'ko' ? (
        <MusicFormKo
          register={register}
          errors={errors}
          watch={watch}
          reset={reset}
        />
      ) : (
        <MusicFormJp
          register={register}
          errors={errors}
          watch={watch}
          reset={reset}
        />
      )}
      {/* 제출 */}
      <SubmitButton />
    </form>
  );
}
