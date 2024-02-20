'use client';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();

  return (
    <header className="flex">
      <div
        onClick={() => router.push('/')}
        className="text-indigo-600 font-bold text-lg cursor-pointer"
      >
        Music PT
      </div>
      <ul className="items-center flex">
        <li>음악 찾기</li>
        <li>음악 추가하기</li>
        <li>마이페이지</li>
      </ul>
    </header>
  );
}
