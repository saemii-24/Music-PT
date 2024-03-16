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
        className='rounded-lg border-2 border-black py-10 text-center  text-base leading-8 focus-visible:outline-indigo-600 lg:text-lg lg:leading-9'></textarea>
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
          className='rounded-md bg-music-blue px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
          {buttontext ? buttontext : '수정완료'}
        </button>
      </div>
    </>
  );
}
