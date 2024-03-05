import {languageMode} from '@/recoil';
import {useRecoilValue} from 'recoil';

export default function AddMusicTitle() {
  const lan = useRecoilValue(languageMode);
  return (
    <div className='border-b border-gray-900/10 pb-12'>
      <h1 className='flex flex-col gap-3 text-4xl font-extrabold'>
        {lan['addmusic-title']}
      </h1>
      <p className='mt-2 leading-6 text-gray-600'>
        {lan['addmusic-description']}
      </p>
    </div>
  );
}
