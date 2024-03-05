'use client';
import {HiPhoto} from 'react-icons/hi2';

import {languageMode} from '@/recoil';
import {useRecoilValue} from 'recoil';

import {useForm} from 'react-hook-form';
import {FormValues} from '@/types/form';

import Error from './Error';
import {onSubmit, checkFileType} from '@/utils/form';

export default function AddMusicForm() {
  //recoil 언어모드
  const lan = useRecoilValue(languageMode);

  //react-hook-form
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<FormValues>();

  //제출 후 id 값을 받아온다.
  const formSubmit = async (data: any) => {
    // toast.success('업데이트 중입니다.');
    const res = await onSubmit(data);
    console.log(res);

    const obj: any = Object.values(res)[1];
    console.log(obj.id);
  };

  return (
    <form onSubmit={handleSubmit(formSubmit)}>
      {/* 음악 정보 업로드 */}
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
                  {...register('title', {required: true})}
                  id='title'
                  autoComplete='family-name'
                  className='block w-[100%] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-music-blue sm:text-sm sm:leading-6'
                />
                <Error errors={errors.title} errorTitle={'제목은'} />
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
                  {...register('singer', {required: true})}
                  id='singer'
                  className='block w-[100%] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-music-blue sm:text-sm sm:leading-6'
                />
                <Error errors={errors.singer} errorTitle={'가수는'} />
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
                {...register('youtube')}
                id='youtube'
                className='block w-[100%] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-music-blue sm:text-sm sm:leading-6'
              />
            </div>
          </div>
        </div>
      </div>

      {/* 앨범 정보 업로드 */}
      <div className='gap-20 border-b border-gray-900/10 py-12 md:grid md:grid-cols-3'>
        <div className='sm:col-span-12 md:col-span-1'>
          <h2 className='text-base font-semibold leading-7 text-gray-900'>
            {lan['addmusic-album-title']}
          </h2>
          <p className='mt-1 break-keep text-sm leading-6 text-gray-600 '>
            {lan['addmusic-album-description']}
          </p>
        </div>
        <div className='mt-6 block sm:col-span-12 md:col-span-2 md:mt-0 xl:flex xl:flex-col'>
          <div className='flex flex-col gap-0 xl:flex-row xl:gap-20'>
            <div className='w-full'>
              <label
                htmlFor='album'
                className='block text-sm font-medium leading-6 text-gray-900'>
                {lan['addmusic-input-album']}
              </label>
              <div className='mt-2'>
                <input
                  type='text'
                  {...register('album', {required: true})}
                  id='album'
                  autoComplete='family-name'
                  className='block w-[100%] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-music-blue sm:text-sm sm:leading-6'
                />
                <Error errors={errors.album} errorTitle={'앨범명은'} />
              </div>
            </div>
            <div className='mt-6 w-full xl:mt-0'>
              <label
                htmlFor='release'
                className='block text-sm font-medium leading-6 text-gray-900'>
                {lan['addmusic-input-release']}
              </label>
              <div className='mt-2'>
                <input
                  type='text'
                  {...register('release', {required: true})}
                  id='release'
                  autoComplete='family-name'
                  className='block w-[100%] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-music-blue sm:text-sm sm:leading-6'
                />
                <Error errors={errors.release} errorTitle={'발매년도는'} />
              </div>
            </div>
          </div>
          <div>
            <label
              htmlFor='thumbnail-upload'
              className='mt-6 block text-sm font-medium leading-6 text-gray-900'>
              {lan['addmusic-input-thumbnail']}
            </label>
            <div className='mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10'>
              <div className='text-center'>
                <HiPhoto
                  className='mx-auto size-12 text-gray-300'
                  aria-hidden='true'
                />
                <div className='mt-4 flex text-sm leading-6 text-gray-600'>
                  <label
                    htmlFor='thumbnail'
                    className='relative cursor-pointer rounded-md bg-white font-semibold text-music-blue focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500'>
                    <span>{lan['addmusic-input-thumbnail-foucs']}</span>
                    <input
                      id='thumbnail'
                      {...register('thumbnail', {
                        validate: checkFileType,
                      })}
                      type='file'
                      className='sr-only'
                    />
                  </label>
                  <p>{lan['addmusic-input-thumbnail-description']}</p>
                </div>
                <p className='text-xs leading-5 text-gray-600'>
                  PNG, JPG up to 1MB
                </p>
              </div>
            </div>
            {errors.thumbnail && (
              <p className=' mt-1 text-sm text-music-orange'>
                {errors.thumbnail.message}
              </p>
            )}
          </div>
        </div>
      </div>
      {/* 가사 업로드 */}
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
          <div className='mt-6 md:mt-0'>
            <label
              htmlFor='language'
              className='block text-sm font-medium leading-6 text-gray-900'>
              {lan['addmusic-input-language']}
            </label>
            <div className='mt-2 w-full lg:w-[40%] xl:w-[30%]'>
              <select
                id='language'
                {...register('language', {required: true})}
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-music-blue sm:max-w-xs sm:text-sm sm:leading-6'>
                <option>{lan['addmusic-input-language-ko']}</option>
                <option>{lan['addmusic-input-language-jp']}</option>
              </select>
            </div>
          </div>
          <div className='col-span-full mt-6'>
            <label
              htmlFor='lyrics'
              className='block text-sm font-medium leading-6 text-gray-900'>
              {lan['addmusic-input-lyrics']}
            </label>
            <div className='mt-2'>
              <textarea
                id='lyrics'
                {...register('lyrics', {required: true})}
                rows={10}
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-music-blue sm:text-sm sm:leading-6'
                defaultValue={''}
              />
              <Error errors={errors.lyrics} errorTitle={'가사는'} />
            </div>
          </div>
        </div>
      </div>
      {/* 제출 */}
      <div className='mt-6 flex items-center justify-end gap-x-6'>
        <button
          type='button'
          className='text-sm font-semibold leading-6 text-gray-900'>
          {lan['addmusic-button-cancle']}
        </button>
        <button
          type='submit'
          className='rounded-md bg-music-blue px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
          {lan['addmusic-button-submit']}
        </button>
      </div>
    </form>
  );
}
