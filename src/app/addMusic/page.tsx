'use client';
import AddMusicTitle from '@/components/AddMusicTitle';
import AddMusicForm from '@/components/AddMusicForm';

export default function AddMusic() {
  return (
    <main className=' flex-1 '>
      <div className='container py-20'>
        <AddMusicTitle />
        <AddMusicForm />
      </div>
    </main>
  );
}
