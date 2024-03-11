import {LyricsVerType} from '@/app/musicpt/[id]/page';
import {SupabaseType} from '@/types/form';

export default function Lyrics({
  lyricsVer,
  music,
}: {
  lyricsVer: LyricsVerType;
  music: SupabaseType | null;
}) {
  return (
    <div className='flex flex-col items-center py-20'>
      {lyricsVer === 'ko' &&
        music?.kolyrics?.split('\n').map((koline: string, index: number) => (
          <p
            className='text-center text-base leading-8 lg:text-lg lg:leading-9'
            key={index}>
            {koline}
          </p>
        ))}
      {lyricsVer === 'jp' &&
        music?.jplyrics?.split('\n').map((jpline: string, index: number) => (
          <p
            className='text-center text-base leading-8 lg:text-lg lg:leading-9'
            key={index}>
            {jpline}
          </p>
        ))}
    </div>
  );
}
