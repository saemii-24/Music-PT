import type {TextAreaValue} from '@/types/form';
import type {AppRouterInstance} from 'next/dist/shared/lib/app-router-context.shared-runtime';
import {UseFormRegister} from 'react-hook-form';

interface TextAreaFormProps {
  register: UseFormRegister<TextAreaValue>;
  defaultlyrics?: string;
  route: AppRouterInstance;
  id: string;
  buttontext?: string;
  length?: number;
}

export default function TextAreaForm({
  register,
  defaultlyrics,
  route,
  id,
  buttontext,
  length = 5,
}: TextAreaFormProps) {
  return (
    <>
      <textarea
        id='lyrics'
        {...register('lyrics', {required: true})}
        rows={length <= 5 ? 5 : length}
        defaultValue={defaultlyrics ? defaultlyrics : ''}
        className='block h-[20rem] w-full rounded-md border-0 bg-white py-1.5 text-center leading-10 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-music-blue sm:text-sm sm:leading-6 xl:text-lg dark:ring-music-basicgray'></textarea>
      {/* 제출 */}
      <div className='mt-6 flex items-center justify-center gap-x-6'>
        <button
          onClick={() => {
            route.push(`/musicpt/${id}`);
          }}
          type='button'
          className='text-sm font-semibold leading-6 text-black '>
          취소하기
        </button>
        <button
          type='submit'
          className='rounded-md bg-music-blue px-3 py-2 text-sm font-semibold text-[#fff] shadow-sm transition hover:bg-music-lightblue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
          {buttontext ? buttontext : '수정완료'}
        </button>
      </div>
    </>
  );
}
