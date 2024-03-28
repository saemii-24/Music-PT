import Image from 'next/image';
import {useRouter} from 'next/navigation';
import {MdOutlineUpdate} from 'react-icons/md';

export default function SearchMusicCard({music}: {music: any}) {
  const route = useRouter();
  return (
    <div
      className=' relative flex cursor-pointer items-center gap-10 py-10 sm:flex sm:flex-row'
      onClick={() => {
        route.push(`/musicpt/${music?.id}`);
      }}>
      <div className='aspect-square w-[full] overflow-hidden rounded-xl sm:w-[10rem] '>
        <Image
          priority={true}
          src={music?.kothumbnail ? music?.kothumbnail : '/default_card.png'}
          alt={music?.kotitle ? music?.kotitle + '이미지' : '음악 썸네일'}
          width={0}
          height={0}
          sizes='100vw'
          style={{width: '100%', height: '100%', objectFit: 'cover'}}
        />
      </div>
      <div className='absolute right-0 top-12 flex gap-2'>
        {music?.kolyrics && (
          <div className='inline-block w-11 rounded-3xl bg-music-blue py-[0.1rem] text-center text-sm text-white'>
            KO
          </div>
        )}
        {music?.jplyrics && (
          <div className='inline-block w-11 rounded-3xl bg-music-orange py-[0.1rem] text-center text-sm text-white'>
            JP
          </div>
        )}
      </div>
      <div className='flex flex-1 flex-col'>
        <h1 className='my-2 text-2xl font-medium '>{music?.kotitle}</h1>
        <div className='mb-1 flex text-base'>
          <span className='w-[6.5rem]'>가수</span>
          <span>{music?.kosinger}</span>
        </div>
        <div className='mb-1 flex text-base'>
          <span className='w-[6.5rem]'>앨범</span>
          <span>{music?.koalbum}</span>
        </div>
        <div className='mb-1 flex text-base'>
          <span className='w-[6.5rem]'>발매년도</span>
          <span>{music?.korelease}</span>
        </div>
      </div>
    </div>
  );
}
