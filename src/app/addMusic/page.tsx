'use client';
import AddMusicForm from '@/components/AddMusicForm';
import {languageMode} from '@/recoil';
import {useRecoilValue} from 'recoil';
import Title from '@/components/Title';

export default function AddMusic() {
  const lan = useRecoilValue(languageMode);
  const titleInfo = {
    title: lan['addmusic-title'],
    description: lan['addmusic-description'],
  };
  return (
    <main className=' flex-1 '>
      <div className='container py-20'>
        <Title titleInfo={titleInfo} />
        <AddMusicForm />
      </div>
    </main>
  );
}
