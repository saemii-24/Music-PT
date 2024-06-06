/* eslint-disable @next/next/no-img-element */
'use client';

import MyLikeList from '@/components/MyLikeList';
import {languageMode} from '@/recoil';
import {UserInterfaceType} from '@/types/form';
import {signOut, useSession} from 'next-auth/react';
import {useEffect, useState} from 'react';
import {CgProfile} from 'react-icons/cg';
import {useRecoilValue} from 'recoil';

export default function MyPagePage() {
  //로그인 상태
  const {data} = useSession();
  let [user, setUser] = useState<UserInterfaceType | null | undefined>();

  useEffect(() => {
    if (data) {
      let userData = data.user as UserInterfaceType;
      setUser(userData);
    } else {
      setUser(null);
    }
  }, [data]);

  const lan = useRecoilValue(languageMode);

  return (
    <div className='flex-1 dark:bg-music-background'>
      <div className='container'>
        <div className='gap-20 border-b border-gray-900/10 py-12 md:grid md:grid-cols-3'>
          <div className='sm:col-span-12 md:col-span-1'>
            <h2 className='flex items-center gap-2 text-base font-semibold leading-7 text-black '>
              <CgProfile className='text-lg text-music-blue' />{' '}
              {lan['mypage-profile']}
            </h2>
          </div>
          <div className='mt-6 block sm:col-span-12 md:col-span-2 md:mt-0 xl:flex xl:flex-col'>
            <div className='flex flex-col gap-0 xl:flex-row xl:gap-20'>
              <div className='w-full'>
                <p className='block text-sm font-medium leading-6 text-black '>
                  {lan['mypage-nickname']}
                </p>
                <p className='mt-2 text-black'>
                  {user?.name ? user?.name : '사용자'}
                </p>
              </div>
            </div>
            <div className='mt-6 flex flex-col gap-0 xl:flex-row xl:gap-20'>
              <div className='w-full'>
                <p className='block text-sm font-medium leading-6 text-black '>
                  {lan['mypage-profile-image']}
                </p>
                <div className='mt-2'>
                  <div className='size-10 overflow-hidden rounded-[100rem]'>
                    <img
                      src={user?.image ? user?.image : '/default_profile.png'}
                      alt={lan['mypage-profile-image']}
                      width={0}
                      height={0}
                      sizes='100vw'
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='mt-6 w-full'>
              <div className='flex flex-col gap-0 xl:flex-row xl:gap-20'>
                <div className='w-full'>
                  <p className='block text-sm font-medium leading-6 text-black '>
                    {lan['mypage-profile-email']}
                  </p>
                  <p className='mt-2 text-black'>
                    {user?.email ? user?.email : '-'}
                  </p>
                </div>
              </div>
            </div>
            <div className='mt-6 w-full'>
              <div className='flex flex-col gap-0 xl:flex-row xl:gap-20'>
                <div className='w-full'>
                  <p className='block text-sm font-medium leading-6 text-black'>
                    {lan['mypage-profile-status']}
                  </p>
                  <p
                    className='mt-2 cursor-pointer text-music-bluegray  underline'
                    onClick={() => {
                      signOut({callbackUrl: '/'});
                    }}>
                    {lan['mypage-profile-logout']}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 좋아요 음악 목록 */}
        <MyLikeList lan={lan} />
      </div>
    </div>
  );
}
