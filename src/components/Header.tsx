'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

import { FiSun } from 'react-icons/fi';
import { IoMoon } from 'react-icons/io5';
import { GrLanguage } from 'react-icons/gr';

import { useRecoilState, useRecoilValue } from 'recoil';
import { mode, language, languageMode } from '@/recoil/index';

export default function Header() {
  const router = useRouter();
  //recoil값
  const [isDarkMode, setIsDarkMode] = useRecoilState(mode);
  const [nowLanguage, setNowLanguage] = useRecoilState(language);
  const lan = useRecoilValue(languageMode);

  const handleToggleMode = (): void => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <header className="flex h-14 w-screen items-center border-b-2 border-gray-100 px-10">
      <Link
        href="/"
        className="cursor-pointer font-ko text-3xl font-bold text-music-400"
      >
        Music PT
      </Link>
      <ul className="ml-auto flex h-10 items-center gap-7">
        <li className="cursor-pointer">
          <Link href="/addmusic" className="font-semibold text-gray-600">
            {lan['header-btn-add']}
          </Link>
        </li>
        <li className="text-after:text-sm cursor-pointer after:ml-10 after:mr-3 after:text-music-200 after:content-['|']">
          <Link href="/searchmusic" className="font-semibold text-gray-600">
            {lan['header-btn-all']}
          </Link>
        </li>
        <li className="cursor-pointer ">
          {/* <GrLanguage className="text-lg text-bluegray-100" /> */}
          <ul className="flex">
            <li
              className="font-ko"
              onClick={() => {
                setNowLanguage('ko');
              }}
            >
              한국어
            </li>
            <li
              className="font-jp"
              onClick={() => {
                setNowLanguage('jp');
              }}
            >
              日本語
            </li>
          </ul>
        </li>
        <li className="cursor-pointer " onClick={handleToggleMode}>
          {isDarkMode ? (
            <IoMoon className="text-lg text-bluegray-100" />
          ) : (
            <FiSun className="text-lg text-bluegray-100" />
          )}
        </li>
        <li className="cursor-pointer">
          <Link href="/mypage">
            <Image
              src="/default_profile.png"
              alt="프로필 이미지"
              width={20}
              height={20}
            />
          </Link>
        </li>
      </ul>
    </header>
  );
}
