import {languageMode} from '@/recoil';
import {useRecoilValue} from 'recoil';

export default function SubmitButton() {
  //recoil 언어모드
  const lan = useRecoilValue(languageMode);

  return (
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
  );
}
