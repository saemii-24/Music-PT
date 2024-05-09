'use client';
import {memo, useState} from 'react';
import cn from 'classnames';

import {useForm} from 'react-hook-form';
import type {FormValues, LanguageType, SupabaseType} from '@/types/form';

import {editMusicForm} from '@/utils/form';
import {useRouter} from 'next/navigation';

import SubmitButton from './SubmitButton';
import MusicFormKo from './MusicFormKo';
import MusicFormJp from './MusicFormJp';

import {languageMode, needRefetch} from '@/recoil';
import {useRecoilState, useRecoilValue} from 'recoil';

type UploadVerType = 'ko' | 'jp';

const EditMusicForm = ({
  id,
  music,
}: {
  id: string;
  music: Partial<SupabaseType>;
}) => {
  const route = useRouter();
  const lan: LanguageType = useRecoilValue(languageMode);

  //recoil
  const [needFetch, setNeedFetch] = useRecoilState(needRefetch);

  //react-hook-form
  const {
    register,
    handleSubmit,
    formState: {errors},
    watch,
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      title_ko: music?.kotitle || '',
      singer_ko: music?.kosinger || '',
      youtube_ko: music?.koyoutube || '',
      album_ko: music?.koalbum || '',
      release_ko: music?.korelease || '',
      lyrics_ko: music?.kolyrics || '',
      title_jp: music?.jptitle || '',
      singer_jp: music?.jpsinger || '',
      youtube_jp: music?.jpyoutube || '',
      album_jp: music?.jpalbum || '',
      release_jp: music?.jprelease || '',
      lyrics_jp: music?.jplyrics || '',
    },
  });

  const [uploadVer, setUploadVer] = useState<UploadVerType>('ko');

  return (
    <form
      onSubmit={handleSubmit((data) =>
        editMusicForm(id, data, route, music, setNeedFetch, lan),
      )}>
      {/* 업로드 음악 버전 선택 */}
      <div>
        <ul className='flex gap-8 border-b border-music-basicgray'>
          <li
            onClick={() => {
              setUploadVer('ko');
            }}
            className={cn(
              'text-black cursor-pointer break-keep',
              uploadVer === 'ko' &&
                'border-b-2 border-music-blue pb-5 font-bold text-music-blue',
            )}>
            {lan['language-button-korean']}
          </li>
          <li
            onClick={() => {
              setUploadVer('jp');
            }}
            className={cn(
              'text-black cursor-pointer break-keep',
              uploadVer === 'jp' &&
                'border-b-2 border-music-blue pb-5 font-bold text-music-blue',
            )}>
            {lan['language-button-japanese']}
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
};

export default memo(EditMusicForm);
