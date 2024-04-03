/* eslint-disable @next/next/no-img-element */
'use client';

import LikeCard from '@/components/LikeCard';
import {UserInterfaceType} from '@/types/form';
import {signOut, useSession} from 'next-auth/react';
import {useEffect, useState} from 'react';
import {CgProfile} from 'react-icons/cg';
import {IoHeartCircleOutline} from 'react-icons/io5';

export default function MyPage() {
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

  return (
    <div className='flex-1'>
      <div className='container'>
        <div className='gap-20 border-b border-gray-900/10 py-12 md:grid md:grid-cols-3'>
          <div className='sm:col-span-12 md:col-span-1'>
            <h2 className='flex items-center gap-2 text-base font-semibold leading-7 text-gray-900'>
              <CgProfile className='text-lg text-music-blue' /> 프로필
            </h2>
          </div>
          <div className='mt-6 block sm:col-span-12 md:col-span-2 md:mt-0 xl:flex xl:flex-col'>
            <div className='flex flex-col gap-0 xl:flex-row xl:gap-20'>
              <div className='w-full'>
                <p className='block text-sm font-medium leading-6 text-gray-900'>
                  닉네임
                </p>
                <p className='mt-2'>{user?.name ? user?.name : '사용자'}</p>
              </div>
            </div>
            <div className='mt-6 flex flex-col gap-0 xl:flex-row xl:gap-20'>
              <div className='w-full'>
                <p className='block text-sm font-medium leading-6 text-gray-900'>
                  프로필 이미지
                </p>
                <div className='mt-2'>
                  <div className='size-10 overflow-hidden rounded-[100rem]'>
                    <img
                      src={user?.image ? user?.image : '/default_profile.png'}
                      alt='프로필 이미지'
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
                  <p className='block text-sm font-medium leading-6 text-gray-900'>
                    이메일
                  </p>
                  <p className='mt-2'>{user?.email ? user?.email : '-'}</p>
                </div>
              </div>
            </div>
            <div className='mt-6 w-full'>
              <div className='flex flex-col gap-0 xl:flex-row xl:gap-20'>
                <div className='w-full'>
                  <p className='block text-sm font-medium leading-6 text-gray-900'>
                    상태
                  </p>
                  <p
                    className='mt-2 cursor-pointer text-gray-400 underline'
                    onClick={() => {
                      signOut({callbackUrl: '/'});
                    }}>
                    로그아웃
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='gap-20 border-gray-900/10 py-12 md:grid md:grid-cols-3'>
          <div className='sm:col-span-12 md:col-span-1'>
            <h2 className='flex items-center gap-2 text-base font-semibold leading-7 text-gray-900'>
              <IoHeartCircleOutline className='text-xl text-music-blue' />
              좋아요 한 음악
            </h2>
          </div>
          <div className='mt-6 block sm:col-span-12 md:col-span-2 md:mt-0 xl:flex xl:flex-col'>
            <div className='flex flex-col gap-0 xl:flex-row xl:gap-20'>
              <div className='w-full'>
                <p className='block text-sm font-medium leading-6 text-gray-900'>
                  음악 목록
                </p>
                <div className='mt-2 h-[15rem] w-full bg-music-orange'>
                  <LikeCard />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
