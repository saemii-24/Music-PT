'use client';
import AddMusicForm from '@/components/AddMusicForm';
import {languageMode} from '@/recoil';
import {useRecoilValue} from 'recoil';
import Title from '@/components/Title';
import {useState, useMemo} from 'react';
import Count from '@/components/Count';

export default function AddMusic() {
  const lan = useRecoilValue(languageMode);
  const titleInfo = useMemo(() => {
    return {
      title: lan['addmusic-title'],
      description: lan['addmusic-description'],
    };
  }, [lan]);

  return (
    <main className=' flex-1 dark:bg-music-background'>
      <div className='container py-20'>
        <Title titleInfo={titleInfo} />
        <AddMusicForm />
      </div>
    </main>
  );
}
