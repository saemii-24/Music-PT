import {useRouter} from 'next/navigation';
import Button from './Button';

export default function MusicLyricsNone({push}: {push: string}) {
  const route = useRouter();
  return (
    <div className='grid place-items-center bg-white px-6'>
      <div className='text-center'>
        <p className='mt-4 text-3xl font-bold  tracking-tight text-gray-900'>
          등록 된 가사가 없습니다.
        </p>
        <p className='mt-2 text-base leading-8 text-gray-600 lg:text-lg lg:leading-9'>
          가사를 추가하고 번역을 시작해보세요.
        </p>
        <div className='mt-10 flex items-center justify-center gap-x-6'>
          <Button
            text={'가사 등록하기'}
            icon='add'
            addclass='w-fit '
            onClick={() => {
              route.push(push);
            }}
          />
        </div>
      </div>
    </div>
  );
}
