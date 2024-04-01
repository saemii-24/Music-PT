'use client';
import Image from 'next/image';
import Link from 'next/link';

import {FiSun} from 'react-icons/fi';
import {IoMoon} from 'react-icons/io5';
import {GrLanguage} from 'react-icons/gr';
import {IoMenu, IoClose} from 'react-icons/io5';

import {useRecoilState, useRecoilValue} from 'recoil';
import {mode, language, languageMode} from '@/recoil/index';
import {useEffect, useState} from 'react';

import {signOut, useSession} from 'next-auth/react';
import {useRouter} from 'next/navigation';

export default function Header() {
  //recoil값
  const [isDarkMode, setIsDarkMode] = useRecoilState(mode);
  const [nowLanguage, setNowLanguage] = useRecoilState(language);
  const lan = useRecoilValue(languageMode);

  const handleToggleMode = (): void => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  //언어 선택창 열기 닫기
  const [lanSelectOpen, setLanSelectOpen] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  //로그인 상태
  const {status} = useSession();
  const route = useRouter();

  return (
    <header className='fixed z-[100] h-14 w-screen border-b-2 border-gray-100 bg-white'>
      <div className='container relative z-10 flex h-14 items-center'>
        <Link
          href='/'
          className='relative mb-1 cursor-pointer text-2xl font-black tracking-tight'>
          Music PT
        </Link>
        {menuOpen ? (
          <IoClose
            className='ml-auto block cursor-pointer text-3xl sm:hidden'
            onClick={() => {
              setMenuOpen(false);
            }}
          />
        ) : (
          <IoMenu
            className='ml-auto block cursor-pointer text-3xl sm:hidden'
            onClick={() => {
              setMenuOpen(true);
            }}
          />
        )}

        <ul className='ml-auto hidden h-10 items-center gap-7 sm:flex'>
          <li className='cursor-pointer'>
            <Link
              href='/addmusic'
              className=' font-medium hover:text-music-bluegray'>
              {lan['header-btn-add']}
            </Link>
          </li>
          <li className="text-after:text-sm cursor-pointer after:ml-10 after:mr-3 after:text-music-darkgray after:content-['|']">
            <Link
              href='/searchmusic'
              className=' font-medium hover:text-music-bluegray'>
              {lan['header-btn-all']}
            </Link>
          </li>
          {status === 'authenticated' ? (
            <>
              <li
                onClick={() => {
                  signOut();
                }}
                className='cursor-pointer text-music-bluegray'>
                로그아웃
              </li>
              <li
                onClick={() => {
                  route.push('/mypage');
                }}
                className='cursor-pointer'>
                <Image
                  priority={true}
                  src='/default_profile.png'
                  alt='프로필 이미지'
                  width={20}
                  height={20}
                />
              </li>
            </>
          ) : (
            <li className='cursor-pointer text-music-bluegray'>
              <Link href='/api/auth/signin'>로그인</Link>
            </li>
          )}

          <div className='relative cursor-pointer '>
            <li>
              <GrLanguage
                className='text-lg text-music-bluegray'
                onClick={() => {
                  setLanSelectOpen((lanSelectOpen) => !lanSelectOpen);
                }}
              />
              {lanSelectOpen && (
                <>
                  {' '}
                  <ul className='absolute bottom-[-90px] right-[-50px] z-10 flex w-[120px] flex-col items-center rounded-lg border-2 border-black bg-white px-5 py-2'>
                    <li
                      className='cursor-pointer font-medium hover:text-music-bluegray'
                      onClick={() => {
                        setNowLanguage('ko');
                        setLanSelectOpen(false);
                      }}>
                      한국어
                    </li>
                    <li
                      className='mt-1 cursor-pointer font-medium hover:text-music-bluegray'
                      onClick={() => {
                        setNowLanguage('jp');
                        setLanSelectOpen(false);
                      }}>
                      日本語
                    </li>
                  </ul>
                  <div className='absolute top-[30px] z-0 size-4 rotate-45 bg-black'></div>
                </>
              )}
            </li>
          </div>

          <li className='cursor-pointer ' onClick={handleToggleMode}>
            {isDarkMode ? (
              <IoMoon className='text-lg text-music-bluegray' />
            ) : (
              <FiSun className='text-lg text-music-bluegray' />
            )}
          </li>
        </ul>
      </div>
      {/* 모바일 사이즈 */}
      {menuOpen && (
        <ul className='container inset-0 z-0 block h-screen w-screen bg-white pt-[30%] sm:hidden '>
          <li>
            <div className=' mb-4 text-2xl font-extrabold text-music-blue'>
              Page
            </div>
            <ul>
              <li className='mb-2 block'>
                <Link
                  onClick={() => {
                    setMenuOpen(false);
                  }}
                  href='/addmusic'
                  className=' text-lg font-medium hover:text-music-blue'>
                  {lan['header-btn-add']}
                </Link>
              </li>
              <li className='mb-2 block'>
                <Link
                  onClick={() => {
                    setMenuOpen(false);
                  }}
                  href='/searchmusic'
                  className=' text-lg font-medium hover:text-music-blue'>
                  {lan['header-btn-all']}
                </Link>
              </li>
              <li className='mb-2 block'>
                <Link
                  onClick={() => {
                    setMenuOpen(false);
                  }}
                  href='/mypage'
                  className=' text-lg font-medium hover:text-music-blue'>
                  {lan['header-btn-mypage']}
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <div className=' mb-4 mt-8 text-2xl  font-extrabold text-music-blue'>
              Language
            </div>
            <ul>
              <li
                className='mb-3 cursor-pointer text-lg font-medium tracking-wide'
                onClick={() => {
                  setNowLanguage('ko');
                  setLanSelectOpen(false);
                }}>
                한국어
              </li>
              <li
                className='mt-1 cursor-pointer text-lg font-medium'
                onClick={() => {
                  setNowLanguage('jp');
                  setLanSelectOpen(false);
                }}>
                日本語
              </li>
            </ul>
          </li>
          <li onClick={handleToggleMode}>
            <div className=' mb-4 mt-8 text-2xl  font-extrabold text-music-blue'>
              Screen mode
            </div>
            {isDarkMode ? (
              <IoMoon className='text-lg' />
            ) : (
              <FiSun className='text-lg' />
            )}
          </li>
        </ul>
      )}
    </header>
  );
}
