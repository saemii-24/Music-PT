'use client';
import {HiPhoto} from 'react-icons/hi2';

import {languageMode} from '@/recoil';
import {useRecoilValue} from 'recoil';

export default function AddMusic() {
  const lan = useRecoilValue(languageMode);

  return (
    <main className=' flex-1 '>
      <div className='container py-20'>
        {/* 페이지 제목 */}
        <div className='border-b border-gray-900/10 pb-12'>
          <h1 className='flex flex-col gap-3 text-4xl font-extrabold'>
            {lan['addmusic-title']}
          </h1>
          <p className='mt-2 leading-6 text-gray-600'>
            {lan['addmusic-description']}
          </p>
        </div>
        <form>
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
                      name='title'
                      id='title'
                      autoComplete='family-name'
                      className='block w-[100%] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-music-blue sm:text-sm sm:leading-6'
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
                      name='singer'
                      id='singer'
                      className='block w-[100%] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-music-blue sm:text-sm sm:leading-6'
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
                    name='youtube'
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
                      name='album'
                      id='album'
                      autoComplete='family-name'
                      className='block w-[100%] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-music-blue sm:text-sm sm:leading-6'
                    />
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
                      name='release'
                      id='release'
                      autoComplete='family-name'
                      className='block w-[100%] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-music-blue sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>
              </div>
              <div>
                <label
                  htmlFor='cover-photo'
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
                          name='thumbnail'
                          type='file'
                          className='sr-only'
                        />
                      </label>
                      <p className='pl-1'>
                        {lan['addmusic-input-thumbnail-descrirption']}
                      </p>
                    </div>
                    <p className='text-xs leading-5 text-gray-600'>
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
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
                    name='language'
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
                    name='lyrics'
                    rows={10}
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-music-blue sm:text-sm sm:leading-6'
                    defaultValue={''}
                  />
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
      </div>
    </main>
  );
}
