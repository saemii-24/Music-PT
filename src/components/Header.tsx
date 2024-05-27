'use client';
import Image from 'next/image';
import Link from 'next/link';

import {FiSun} from 'react-icons/fi';
import {IoMoon} from 'react-icons/io5';
import {GrLanguage} from 'react-icons/gr';
import {IoMenu, IoClose} from 'react-icons/io5';

import {useRecoilState, useRecoilValue} from 'recoil';
import {language, languageMode} from '@/recoil/index';
import {
  jpThumbnailAtom,
  koThumbnailAtom,
  koCheckImageAtom,
  jpCheckImageAtom,
} from '@/recoil';
import {useEffect, useState} from 'react';

import {signOut, useSession} from 'next-auth/react';
import {usePathname, useRouter} from 'next/navigation';

type ThemeType = 'light' | 'dark';

export default function Header() {
  // theme 값 가져오기
  const [theme, setTheme] = useState<ThemeType>('light');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as ThemeType;

    if (storedTheme) {
      if (storedTheme === 'dark') {
        setDarkTheme();
      } else if (storedTheme === 'light') {
        setLightTheme();
      }
    } else {
      setLightTheme();
    }
  }, []);

  //theme 설정 함수들
  const setLightTheme = () => {
    localStorage.setItem('theme', 'light');
    setTheme('light');
    const htmlElement = document.querySelector('html') as HTMLElement;
    htmlElement.classList.remove('dark');
  };

  const setDarkTheme = () => {
    localStorage.setItem('theme', 'dark');
    setTheme('dark');
    const htmlElement = document.querySelector('html') as HTMLElement;
    htmlElement.classList.add('dark');
  };

  //recoil값
  const [nowLanguage, setNowLanguage] = useRecoilState(language);
  const lan = useRecoilValue(languageMode);

  //언어 선택창 열기 닫기
  const [lanSelectOpen, setLanSelectOpen] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  //로그인 상태
  const {status, data} = useSession();
  const route = useRouter();

  const pathname = usePathname();
  const [koThumbnail, setKoThumbnail] = useRecoilState(koThumbnailAtom);
  const [jpThumbnail, setJpThumbnail] = useRecoilState(jpThumbnailAtom);
  const [koCheckImage, setkoCheckImage] = useRecoilState(koCheckImageAtom);
  const [jpCheckImage, setjpCheckImage] = useRecoilState(jpCheckImageAtom);

  useEffect(() => {
    if (pathname === '/addMusic') {
      setKoThumbnail(null);
      setJpThumbnail(null);
      setkoCheckImage('none');
      setjpCheckImage('none');
    }
  }, [pathname]);

  return (
    <header className='fixed z-[100] h-14 w-screen border-b-2 border-music-basicgray bg-white '>
      <div className='container relative z-10 flex h-14 items-center'>
        <Link
          href='/'
          className='relative mb-1 cursor-pointer text-2xl font-black tracking-tight text-black'>
          Music PT
        </Link>
        {menuOpen ? (
          <IoClose
            className=' ml-auto block cursor-pointer text-3xl text-black sm:hidden'
            onClick={() => {
              setMenuOpen(false);
            }}
          />
        ) : (
          <IoMenu
            className=' ml-auto block cursor-pointer text-3xl text-black sm:hidden'
            onClick={() => {
              setMenuOpen(true);
            }}
          />
        )}

        <ul className='ml-auto hidden h-10 items-center gap-7 sm:flex'>
          <li className='cursor-pointer'>
            <Link
              href='/addMusic'
              className='text-base font-medium text-black hover:text-music-bluegray sm:text-[0.9rem] md:text-base'>
              {lan['header-btn-add']}
            </Link>
          </li>
          <li className="text-after:text-sm flex cursor-pointer after:ml-10 after:mr-3 after:text-music-darkgray after:content-['|'] md:text-base">
            <Link
              href='/searchMusic'
              className='text-base font-medium text-black hover:text-music-bluegray sm:text-[0.9rem] md:text-base'>
              {lan['header-btn-all']}
            </Link>
          </li>
          {status === 'authenticated' ? (
            <>
              <li
                onClick={() => {
                  signOut();
                }}
                className='cursor-pointer text-base text-music-bluegray sm:text-[0.9rem] md:text-base'>
                {lan['mypage-profile-logout']}
              </li>
              <li className='cursor-pointer'>
                <Link
                  href='/myPage'
                  className='overflow-hidden rounded-[100rem]'>
                  {data?.user?.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      className='block rounded-[100rem]'
                      src={data.user?.image}
                      alt='프로필 이미지'
                      width={20}
                      height={20}
                    />
                  ) : (
                    <Image
                      priority={true}
                      src='/default_profile.png'
                      alt='프로필 이미지'
                      width={20}
                      height={20}
                    />
                  )}
                </Link>
              </li>
            </>
          ) : (
            <li className='cursor-pointer text-music-bluegray'>
              <Link
                className='text-base sm:text-[0.9rem] md:text-base'
                href='/api/auth/signin'>
                {lan['mypage-profile-login']}
              </Link>
            </li>
          )}

          <li className='relative cursor-pointer '>
            <ul>
              <li>
                <GrLanguage
                  className='text-lg text-music-bluegray'
                  onClick={() => {
                    setLanSelectOpen((lanSelectOpen) => !lanSelectOpen);
                  }}
                />
              </li>
              {lanSelectOpen && (
                <li>
                  <ul className='absolute bottom-[-90px] right-[-50px] z-10 flex w-[120px] flex-col items-center rounded-lg border-2 border-black bg-white px-5 py-2'>
                    <li
                      className='cursor-pointer font-medium hover:text-music-bluegray dark:text-black'
                      onClick={() => {
                        setNowLanguage('ko');
                        setLanSelectOpen(false);
                      }}>
                      한국어
                    </li>
                    <li
                      className='mt-1 cursor-pointer font-medium hover:text-music-bluegray dark:text-black'
                      onClick={() => {
                        setNowLanguage('jp');
                        setLanSelectOpen(false);
                      }}>
                      日本語
                    </li>
                  </ul>
                  <span className='absolute top-[30px] z-0 block size-4 rotate-45 bg-black'></span>
                </li>
              )}
            </ul>
          </li>

          <li className='cursor-pointer'>
            {theme === 'dark' ? (
              <IoMoon
                onClick={() => {
                  setTheme('light');
                  setLightTheme();
                }}
                className='text-lg text-music-bluegray'
              />
            ) : (
              <FiSun
                onClick={() => {
                  setTheme('dark');
                  setDarkTheme();
                }}
                className='text-lg text-music-bluegray'
              />
            )}
          </li>
        </ul>
      </div>
      {/* 모바일 사이즈 */}
      {menuOpen && (
        <ul className='container inset-0 z-0 block h-screen w-screen bg-white pt-[30%] text-black sm:hidden '>
          <li>
            <ul>
              <li className=' mb-4 text-2xl font-extrabold text-music-blue'>
                Page
              </li>
              <li className='mb-2 block'>
                <Link
                  href='/addMusic'
                  onClick={() => {
                    setMenuOpen(false);
                  }}
                  className='cursor-pointer text-lg font-medium hover:text-music-blue'>
                  {lan['header-btn-add']}
                </Link>
              </li>
              <li className='mb-2 block'>
                <Link
                  href='/searchMusic'
                  onClick={() => {
                    setMenuOpen(false);
                  }}
                  className='cursor-pointer text-lg font-medium hover:text-music-blue'>
                  {lan['header-btn-all']}
                </Link>
              </li>
              <li className='mb-2 block'>
                {status === 'authenticated' ? (
                  <Link
                    href='/myPage'
                    onClick={() => {
                      setMenuOpen(false);
                    }}
                    className='cursor-pointer text-lg font-medium hover:text-music-blue'>
                    {lan['header-btn-mypage']}
                  </Link>
                ) : (
                  <Link
                    href='/login'
                    onClick={() => {
                      setMenuOpen(false);
                    }}
                    className='cursor-pointer text-lg font-medium hover:text-music-blue'>
                    {lan['header-btn-login']}
                  </Link>
                )}
              </li>
            </ul>
          </li>
          <li>
            <ul>
              <li className=' mb-4 mt-8 text-2xl  font-extrabold text-music-blue'>
                Language
              </li>
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
          <li>
            <span className='mb-4 mt-8 block text-2xl  font-extrabold text-music-blue'>
              Screen mode
            </span>
            {theme === 'dark' ? (
              <IoMoon
                onClick={() => {
                  setTheme('light');
                  setLightTheme();
                }}
                className='cursor-pointer text-lg'
              />
            ) : (
              <FiSun
                onClick={() => {
                  setTheme('dark');
                  setDarkTheme();
                }}
                className='cursor-pointer text-lg'
              />
            )}
          </li>
        </ul>
      )}
    </header>
  );
}
