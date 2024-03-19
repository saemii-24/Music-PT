import {languageMode} from '@/recoil';
import {useRecoilValue} from 'recoil';

export default function EditMusicTitle() {
  const lan = useRecoilValue(languageMode);
  return (
    <div className='border-b border-gray-900/10 pb-12'>
      <h1 className='flex flex-col gap-3 text-4xl font-extrabold'>
        음악 수정하기
      </h1>
      <p className='mt-2 leading-6 text-gray-600'>
        기존에 등록한 음악 내용을 수정합니다.
      </p>
    </div>
  );
}
