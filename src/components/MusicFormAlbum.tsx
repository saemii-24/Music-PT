import UploadImage from './UploadImage';
import Error from './Error';

import {
  FieldErrors,
  UseFormRegister,
  UseFormReset,
  UseFormWatch,
} from 'react-hook-form';
import {FormValues, LanguageType} from '@/types/form';

import {useRecoilValue} from 'recoil';
import {languageMode} from '@/recoil';

interface MusicFormLyricsProps {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  watch: UseFormWatch<FormValues>;
  reset: UseFormReset<FormValues>;
  uploadVer: string;
}

export default function MusicFormAlbum({
  register,
  errors,
  watch,
  reset,
  uploadVer,
}: MusicFormLyricsProps) {
  const lan: LanguageType = useRecoilValue(languageMode);

  //uploadVer에 따라서 register값 변경
  const album_lang: 'album_ko' | 'album_jp' = `album_${uploadVer}` as
    | 'album_ko'
    | 'album_jp';
  const release_lang: 'release_ko' | 'release_jp' = `release_${uploadVer}` as
    | 'release_ko'
    | 'release_jp';

  return (
    <div className='gap-20 border-b border-gray-900/10 py-12 md:grid md:grid-cols-3'>
      <div className='sm:col-span-12 md:col-span-1'>
        <h2 className='text-base font-semibold leading-7 text-black'>
          {lan['addmusic-album-title']}
        </h2>
        <p className='mt-1 break-keep text-sm leading-6 text-music-subtitle '>
          {lan['addmusic-album-description']}
        </p>
      </div>
      <div className='mt-6 block sm:col-span-12 md:col-span-2 md:mt-0 xl:flex xl:flex-col'>
        <div className='flex flex-col gap-0 xl:flex-row xl:gap-20'>
          <div className='w-full'>
            <label
              htmlFor='album'
              className='block text-sm font-medium leading-6 text-black '>
              {lan['addmusic-input-album']}
            </label>
            <div className='mt-2'>
              <input
                type='text'
                {...register(album_lang, {required: true})}
                id='album'
                autoComplete='family-name'
                className='block w-[100%] rounded-md border-0 bg-white py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-music-blue sm:text-sm sm:leading-6 dark:ring-music-basicgray'
              />
              <Error
                errors={uploadVer === 'ko' ? errors.album_ko : errors.album_jp}
                errorTitle={lan['error-album']}
              />
            </div>
          </div>
          <div className='mt-6 w-full xl:mt-0'>
            <label
              htmlFor='release'
              className='block text-sm font-medium leading-6 text-black'>
              {lan['addmusic-input-release']}
            </label>
            <div className='mt-2'>
              <input
                type='text'
                {...register(release_lang, {required: true})}
                id='release'
                autoComplete='family-name'
                className='block w-[100%] rounded-md border-0 bg-white py-1.5 text-black  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-music-blue sm:text-sm sm:leading-6 dark:ring-music-basicgray'
              />
              <Error
                errors={
                  uploadVer === 'ko' ? errors.release_ko : errors.release_jp
                }
                errorTitle={lan['error-release']}
              />
            </div>
          </div>
        </div>
        <div>
          <label
            htmlFor='thumbnail-upload'
            className='mt-6  block text-sm font-medium leading-6 text-black'>
            {lan['addmusic-input-thumbnail']}
          </label>
          <UploadImage
            watch={watch}
            register={register}
            reset={reset}
            uploadVer={uploadVer}
          />
        </div>
      </div>
    </div>
  );
}
