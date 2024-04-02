import {FaHeart, FaRegHeart} from 'react-icons/fa6';
import {useSession} from 'next-auth/react';
import {SupabaseType} from '@/types/form';
import axios from 'axios';
export default function Like({music}: {music: SupabaseType}) {
  const {data: session, status} = useSession();

  const toggleLike = async () => {
    if (session?.user) {
      try {
        const {data} = await axios.post(`/api/like`, {
          musicId: music.id,
        });
        console.log(data);
        //찜하기 취소하기 로직
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className='flex items-center gap-2'>
      <button onClick={toggleLike} type='button' className='cursor-pointer'>
        <FaRegHeart />
      </button>
      <div className='text-sm'>{music ? music.count : 0}</div>
    </div>
  );
}
