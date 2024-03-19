'use client';
import AddMusicForm from '@/components/AddMusicForm';
import EditMusicTitle from '@/components/EditMusicTitle';

export default function EditMusic() {
  return (
    <main className=' flex-1 '>
      <div className='container py-20'>
        <EditMusicTitle />
        <AddMusicForm />
      </div>
    </main>
  );
}
