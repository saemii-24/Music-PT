'use client';
import {useEffect, useState} from 'react';

import {languageMode} from '@/recoil';
import {useRecoilValue} from 'recoil';

import {HiPhoto} from 'react-icons/hi2';
import {GoAlertFill} from 'react-icons/go';

import type {UploadImagePropsType} from '@/types/form';
import {checkFileType} from '@/utils/form';

type CheckImageType = 'ok' | 'bad' | 'none';

export default function UploadImage({
  watch,
  register,
  reset,
  uploadVer,
}: UploadImagePropsType & {uploadVer: string}) {
  //recoil 언어모드
  const lan = useRecoilValue(languageMode);
  const [checkImage, setCheckImage] = useState<string>('none');

  const thumbnail_lang: 'thumbnail_ko' | 'thumbnail_jp' =
    `thumbnail_${uploadVer}` as 'thumbnail_ko' | 'thumbnail_jp';

  useEffect(() => {
    const fileList: any = watch(thumbnail_lang);

    if (!fileList || !fileList[0]) {
      setCheckImage('none');
      return;
    }

    // 확장자 확인
    const correctFormat = [
      'image/png',
      'image/jpg',
      'image/webp',
      'image/jpeg',
    ];
    const file = fileList[0];
    const fileExtension = file.type.toLowerCase();
    const fileSize = file.size; // 파일 크기(바이트)

    if (fileSize > 1048576 || !correctFormat.includes(fileExtension)) {
      console.log('파일이 올바르지 않습니다.');
      setCheckImage('bad');
    } else {
      console.log('파일이 올바릅니다.');
      setCheckImage('ok');
    }
  }, [watch(thumbnail_lang)]);

  return (
    <div className='mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 bg-white px-6 py-10  dark:border-gray-600'>
      {checkImage === 'none' && (
        <div className='text-center'>
          <HiPhoto
            className='mx-auto size-12 text-gray-300'
            aria-hidden='true'
          />
          <div className='mt-4 flex text-sm leading-6 text-gray-600'>
            <label
              htmlFor='thumbnail'
              className='relative cursor-pointer rounded-md  font-semibold text-music-blue focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500'>
              <span>앨범 이미지</span>
              <input
                id='thumbnail'
                {...register(thumbnail_lang, {
                  validate: checkFileType,
                })}
                type='file'
                className='sr-only'
              />
            </label>
            <p className='text-black'>를 업로드해주세요.</p>
          </div>
          <p className='text-xs leading-5 text-music-subtitle '>
            PNG, JPG, WEBP up to 1MB
          </p>
        </div>
      )}
      {checkImage === 'bad' && (
        <div className='text-center'>
          <GoAlertFill
            className='mx-auto size-12 p-1 text-music-orange'
            aria-hidden='true'
          />
          <div className='mt-4 flex text-sm leading-6 text-gray-600'>
            <label
              htmlFor='thumbnail'
              className='relative cursor-pointer rounded-md bg-white font-semibold text-music-orange focus-within:outline-none focus-within:ring-2 focus-within:ring-music-lightorange focus-within:ring-offset-2 hover:text-music-lightorange'>
              <span>앨범 이미지</span>
              <input
                id='thumbnail'
                {...register(thumbnail_lang, {
                  validate: checkFileType,
                })}
                type='file'
                className='sr-only'
              />
            </label>
            <p>를 업로드해주세요.</p>
          </div>
          <p className='text-xs leading-5 text-gray-600'>
            PNG, JPG, WEBP up to 1MB
          </p>
        </div>
      )}
      {checkImage === 'ok' && (
        <div className='text-center'>
          <HiPhoto
            className='mx-auto size-12 text-music-blue'
            aria-hidden='true'
          />
          <div className='mt-4 flex text-sm leading-6 text-gray-600'>
            <label
              htmlFor='thumbnail'
              className='relative cursor-pointer rounded-md bg-white font-semibold text-music-blue focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500'>
              <span>앨범 이미지</span>
              <input
                id='thumbnail'
                {...register(thumbnail_lang, {
                  validate: checkFileType,
                })}
                type='file'
                className='sr-only'
              />
            </label>
            <p>가 업로드되었습니다.</p>
          </div>
          <p
            className='cursor-pointer text-xs leading-5 text-gray-600 hover:underline'
            onClick={() => {
              reset();
            }}>
            업로드 취소하기
          </p>
        </div>
      )}
    </div>
  );
}
