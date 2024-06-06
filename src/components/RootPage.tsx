//page.tsx
'use client';

import MusicGrid from '@/components/MusicGrid';
import useFirstMusicData from '@/hook/useFirstMusicData';
import SK_Home from '@/skeleton/SK_Home';

export default function RootPage() {
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
