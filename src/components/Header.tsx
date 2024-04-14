'use client';
import Image from 'next/image';
import Link from 'next/link';

import {FiSun} from 'react-icons/fi';
import {IoMoon} from 'react-icons/io5';
import {GrLanguage} from 'react-icons/gr';
import {IoMenu, IoClose} from 'react-icons/io5';

import {useRecoilState, useRecoilValue} from 'recoil';
import {language, languageMode} from '@/recoil/index';
import {useEffect, useLayoutEffect, useState} from 'react';

import {signOut, useSession} from 'next-auth/react';
import {useRouter} from 'next/navigation';

type ThemeType = 'light' | 'dark';

export default function Header() {
  // theme 값 가져오기
  const initialTheme: ThemeType =
    typeof window !== 'undefined'
      ? (localStorage.getItem('theme') as ThemeType) || 'light'
      : 'light';
  const [theme, setTheme] = useState<ThemeType>(initialTheme);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
      if (theme === 'dark') {
        const htmlElement = document.querySelector('html') as HTMLElement;
        htmlElement.classList.add('dark');
      } else {
        const htmlElement = document.querySelector('html') as HTMLElement;
        htmlElement.classList.remove('dark');
      }
    }
  }, [theme]);

  //recoil값
  const [nowLanguage, setNowLanguage] = useRecoilState(language);
  const lan = useRecoilValue(languageMode);

  //언어 선택창 열기 닫기
  const [lanSelectOpen, setLanSelectOpen] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  //로그인 상태
  const {status, data} = useSession();
  const route = useRouter();

  return (
    <header className='fixed z-[100] h-14 w-screen border-b-2 border-music-basicgray bg-white '>
      <div className='container relative z-10 flex h-14 items-center'>
        <div
          onClick={() => {
            route.push('/');
          }}
          className='relative mb-1 cursor-pointer text-2xl font-black tracking-tight text-black'>
          Music PT
        </div>
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
            <div
              onClick={() => {
                route.push('/addMusic');
              }}
              className='md:text-base text-base font-medium text-black hover:text-music-bluegray sm:text-[0.9rem]'>
              {lan['header-btn-add']}
            </div>
          </li>
          <li className="md:text-base text-after:text-sm flex cursor-pointer after:ml-10 after:mr-3 after:text-music-darkgray after:content-['|']">
            <div
              onClick={() => {
                route.push('/searchMusic');
              }}
              className='md:text-base text-base font-medium text-black hover:text-music-bluegray sm:text-[0.9rem]'>
              {lan['header-btn-all']}
            </div>
          </li>
          {status === 'authenticated' ? (
            <>
              <li
                onClick={() => {
                  signOut();
                }}
                className='md:text-base cursor-pointer text-base text-music-bluegray sm:text-[0.9rem]'>
                {lan['mypage-profile-logout']}
              </li>
              <li
                onClick={() => {
                  route.push('/myPage');
                }}
                className='cursor-pointer'>
                <div className='overflow-hidden rounded-[100rem]'>
                  {data?.user?.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
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
                </div>
              </li>
            </>
          ) : (
            <li className='cursor-pointer text-music-bluegray'>
              <div
                className='text-base sm:text-[0.9rem] md:text-base'
                onClick={() => {
                  route.push('/api/auth/signin');
                }}>
                {lan['mypage-profile-login']}
              </div>
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
                  <ul className='absolute bottom-[-90px] right-[-50px] z-10 flex w-[120px] flex-col items-center rounded-lg border-2 border-black bg-white px-5 py-2'>
                    <li
                      className='cursor-pointer font-medium hover:text-music-bluegray dark:text-black'
                      onClick={() => {
                        setNowLanguage('ko');
                        setLanSelectOpen(false);
                        localStorage.setItem('language', 'ko');
                      }}>
                      한국어
                    </li>
                    <li
                      className='mt-1 cursor-pointer font-medium hover:text-music-bluegray dark:text-black'
                      onClick={() => {
                        setNowLanguage('jp');
                        setLanSelectOpen(false);
                        localStorage.setItem('language', 'jp');
                      }}>
                      日本語
                    </li>
                  </ul>
                  <div className='absolute top-[30px] z-0 size-4 rotate-45 bg-black'></div>
                </>
              )}
            </li>
          </div>

          <li className='cursor-pointer'>
            {theme === 'dark' ? (
              <IoMoon
                onClick={() => {
                  setTheme('light');
                }}
                className='text-lg text-music-bluegray'
              />
            ) : (
              <FiSun
                onClick={() => {
                  setTheme('dark');
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
            <div className=' mb-4 text-2xl font-extrabold text-music-blue'>
              Page
            </div>
            <ul>
              <li className='mb-2 block'>
                <div
                  onClick={() => {
                    setMenuOpen(false);
                    route.push('/addMusic');
                  }}
                  className='cursor-pointer text-lg font-medium hover:text-music-blue'>
                  {lan['header-btn-add']}
                </div>
              </li>
              <li className='mb-2 block'>
                <div
                  onClick={() => {
                    setMenuOpen(false);
                    route.push('/searchMusic');
                  }}
                  className='cursor-pointer text-lg font-medium hover:text-music-blue'>
                  {lan['header-btn-all']}
                </div>
              </li>
              <li className='mb-2 block'>
                <div
                  onClick={() => {
                    setMenuOpen(false);
                    route.push('/myPage');
                  }}
                  className='cursor-pointer text-lg font-medium hover:text-music-blue'>
                  {lan['header-btn-mypage']}
                </div>
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
                  localStorage.setItem('language', 'ko');
                }}>
                한국어
              </li>
              <li
                className='mt-1 cursor-pointer text-lg font-medium'
                onClick={() => {
                  setNowLanguage('jp');
                  setLanSelectOpen(false);
                  localStorage.setItem('language', 'jp');
                }}>
                日本語
              </li>
            </ul>
          </li>
          <li>
            <div className=' mb-4 mt-8 text-2xl  font-extrabold text-music-blue'>
              Screen mode
            </div>
            {theme === 'dark' ? (
              <IoMoon
                onClick={() => {
                  setTheme('light');
                }}
                className='cursor-pointer text-lg'
              />
            ) : (
              <FiSun
                onClick={() => {
                  setTheme('dark');
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
