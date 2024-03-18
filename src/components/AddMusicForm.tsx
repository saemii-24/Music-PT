'use client';
import {HiPhoto} from 'react-icons/hi2';

import {languageMode} from '@/recoil';
import {useRecoilValue} from 'recoil';

import {useForm} from 'react-hook-form';
import {FormValues} from '@/types/form';

import Error from './Error';
import {onSubmit, checkFileType} from '@/utils/form';
import {toast} from 'react-toastify';
import {useRouter} from 'next/navigation';
import UploadImage from './UploadImage';

export default function AddMusicForm() {
  //recoil 언어모드
  const lan = useRecoilValue(languageMode);
  const router = useRouter();

  //react-hook-form
  const {
    register,
    handleSubmit,
    formState: {errors},
    watch,
    reset,
  } = useForm<FormValues>();

  //폼 제출
  const formSubmit = async (data: any) => {
    // 로딩 메시지 표시
    const loadingToast = toast.loading('음악을 등록 중입니다.');
    console.log(data);

    try {
      const res = await onSubmit(data);
      // console.log(res);
      const obj: any = Object.values(res)[1];

      //업로드 완료시 로딩메세지 닫고, 페이지 이동
      toast.dismiss(loadingToast);
      router.replace('/musicpt/' + obj.id);
      toast.success('음악이 등록 되었습니다.');
    } catch (err) {
      toast.dismiss(loadingToast);
      console.error('업로드 오류:', err);
      toast.error('다시 시도해주세요.');
    }
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
            <UploadImage watch={watch} register={register} reset={reset} />
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
