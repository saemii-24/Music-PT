import {useRouter} from 'next/navigation';
import Button from './Button';
import {LanguageType} from '@/types/form';
import {languageMode} from '@/recoil';
import {useRecoilValue} from 'recoil';

export default function MusicLyricsNone({push}: {push: string}) {
  const route = useRouter();
  const lan: LanguageType = useRecoilValue(languageMode);
  return (
    <div className='grid place-items-center px-6'>
      <div className='text-center'>
        <p className='mt-4 text-3xl font-bold  tracking-tight text-black'>
          {lan['none-lyrics-title']}
        </p>
        <p className='mt-2 text-base leading-8 text-music-subtitle lg:text-lg lg:leading-9'>
          {lan['none-lyrics-description']}
        </p>
        <div className='mt-10 flex items-center justify-center gap-x-6'>
          <Button
            text={lan['none-lyrics-button']}
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
