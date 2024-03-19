import {languageMode} from '@/recoil';
import {useRecoilValue} from 'recoil';

import Error from './Error';
import {FieldErrors, UseFormRegister} from 'react-hook-form';
import {FormValues} from '@/types/form';

interface MusicFormLyricsProps {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  uploadVer: string;
}

export default function MusicFormMusic({
  register,
  errors,
  uploadVer,
}: MusicFormLyricsProps) {
  //recoil 언어모드
  const lan = useRecoilValue(languageMode);

  //uploadVer에 따라서 register값 변경
  const title_lang: 'title_ko' | 'title_jp' = `title_${uploadVer}` as
    | 'title_ko'
    | 'title_jp';
  const singer_lang: 'singer_ko' | 'singer_jp' = `singer_${uploadVer}` as
    | 'singer_ko'
    | 'singer_jp';
  const youtube_lang: 'youtube_ko' | 'youtube_jp' = `youtube_${uploadVer}` as
    | 'youtube_ko'
    | 'youtube_jp';

  return (
    <div className='gap-20 border-b border-gray-900/10 py-12 md:grid md:grid-cols-3'>
      <div className='sm:col-span-12 md:col-span-1'>
        <h2 className='text-base font-semibold leading-7 text-gray-900'>
          {lan['addmusic-music-title']}
        </h2>
        <p className='mt-1 break-keep text-sm leading-6 text-gray-600 '>
          {lan['addmusic-music-description']}
        </p>
      </div>
      <div className='mt-6 block sm:col-span-12 md:col-span-2 md:mt-0 xl:flex xl:flex-col'>
        <div className='flex flex-col gap-0 xl:flex-row xl:gap-20'>
          <div className='w-full'>
            <label
              htmlFor='title'
              className='block text-sm font-medium leading-6 text-gray-900'>
              {lan['addmusic-input-title']}
            </label>
            <div className='mt-2'>
              <input
                type='text'
                {...register(title_lang, {required: true})}
                id='title'
                autoComplete='family-name'
                className='block w-[100%] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-music-blue sm:text-sm sm:leading-6'
              />
              <Error
                errors={uploadVer === 'ko' ? errors.title_ko : errors.title_jp}
                errorTitle={'제목은'}
              />
            </div>
          </div>
          <div className='mt-6 w-full xl:mt-0'>
            <label
              htmlFor='singer'
              className='block text-sm font-medium leading-6 text-gray-900'>
              {lan['addmusic-input-singer']}
            </label>
            <div className='mt-2'>
              <input
                type='text'
                {...register(singer_lang, {required: true})}
                id='singer'
                className='block w-[100%] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-music-blue sm:text-sm sm:leading-6'
              />
              <Error
                errors={
                  uploadVer === 'ko' ? errors.singer_ko : errors.singer_jp
                }
                errorTitle={'가수는'}
              />
            </div>
          </div>
        </div>
        <div className='mt-6 w-full'>
          <label
            htmlFor='youtube'
            className='block text-sm font-medium leading-6 text-gray-900'>
            {lan['addmusic-input-link']}
          </label>
          <div className='mt-2'>
            <input
              type='text'
              {...register(youtube_lang)}
              id='youtube'
              className='block w-[100%] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-music-blue sm:text-sm sm:leading-6'
            />
          </div>
        </div>
      </div>
    </div>
  );
}
