'use client';
import { useRouter } from 'next/navigation';
import { FiSun } from 'react-icons/fi';
import { IoMoon } from 'react-icons/io5';

export default function Header() {
  const router = useRouter();

  return (
    <header className="flex bg-slate-200 h-10 lg:container ">
      <div
        onClick={() => router.push('/')}
        className="text-music-400 font-bold text-3xl  cursor-pointer"
      >
        Music PT
      </div>
      <ul className="items-center flex">
        <li onClick={() => router.push('/searchMusic')}>전체 보기</li>
        <li onClick={() => router.push('/addMusic')}>음악 추가</li>
        <li></li>
        <li onClick={() => router.push('/addMusic')}>음악 추가</li>
      </ul>
    </header>
  );
}
