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

export default function MusicFormLyrics({
  register,
  errors,
  uploadVer,
}: MusicFormLyricsProps) {
  //recoil 언어모드
  const lan = useRecoilValue(languageMode);

  //uploadVer에 따라서 register값 변경
  const lyrics_lang: 'lyrics_ko' | 'lyrics_jp' = `lyrics_${uploadVer}` as
    | 'lyrics_ko'
    | 'lyrics_jp';

  return (
    <div className='gap-20 border-b border-gray-900/10 py-12 md:grid md:grid-cols-3'>
      <div className='sm:col-span-12 md:col-span-1'>
        <h2 className='text-base font-semibold leading-7 text-gray-900'>
          {lan['addmusic-lyrics-title']}
        </h2>
        <p className='mt-1 text-sm leading-6 text-gray-600'>
          {lan['addmusic-lyrics-description']}
        </p>
      </div>
      <div className='col-span-2'>
        <div className='col-span-full'>
          <label
            htmlFor='lyrics'
            className='block text-sm font-medium leading-6 text-gray-900'>
            {lan['addmusic-input-lyrics']}
          </label>
          <div className='mt-2'>
            <textarea
              id='lyrics'
              {...register(lyrics_lang, {required: true})}
              rows={10}
              className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-music-blue sm:text-sm sm:leading-6'
              defaultValue={''}
            />
            <Error
              errors={uploadVer === 'ko' ? errors.lyrics_ko : errors.lyrics_jp}
              errorTitle={'가사는'}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
