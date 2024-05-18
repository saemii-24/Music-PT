'use client';

import SK_Home from './skeleton/SK_Home';
import MusicGrid from '@/components/MusicGrid';
import useFirstMusicData from '@/hook/useFirstMusicData';

export default function Home() {
  const {status, firstMusicData} = useFirstMusicData();

  if (status === 'pending') {
    return <SK_Home />;
  }

  return (
    <main className='flex-1 bg-music-background'>
      <MusicGrid firstMusicData={firstMusicData} />
    </main>
  );
}
