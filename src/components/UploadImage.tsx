'use client';
import {useLayoutEffect} from 'react';
import {usePathname} from 'next/navigation';

import {
  jpThumbnailAtom,
  koThumbnailAtom,
  koCheckImageAtom,
  jpCheckImageAtom,
  languageMode,
  musicAtom,
} from '@/recoil';
import {useRecoilState, useRecoilValue} from 'recoil';

import {HiPhoto} from 'react-icons/hi2';
import {GoAlertFill} from 'react-icons/go';

import type {UploadImagePropsType} from '@/types/form';
import {checkFileType} from '@/utils/form';
import Preview from './Preview';

import cn from 'classnames';

const UploadImage = ({
  watch,
  register,
  reset,
  uploadVer,
}: UploadImagePropsType & {uploadVer: string}) => {
  //recoil 언어모드
  const lan = useRecoilValue(languageMode);
  const [music, setMusic] = useRecoilState(musicAtom);

  // uploadVer에 따라 불러올 recoil 선택
  const thumbnailAtom = uploadVer === 'ko' ? koThumbnailAtom : jpThumbnailAtom;
  const checkImageAtom =
    uploadVer === 'ko' ? koCheckImageAtom : jpCheckImageAtom;

  const [thumbnail, setThumbnail] = useRecoilState(thumbnailAtom);
  const [checkImage, setCheckImage] = useRecoilState(checkImageAtom);

  const thumbnail_lang: 'thumbnail_ko' | 'thumbnail_jp' =
    `thumbnail_${uploadVer}` as 'thumbnail_ko' | 'thumbnail_jp';

  const pathname = usePathname();

  useLayoutEffect(() => {
    //addMusicPage인 경우 사용자의 업로드에 따라 지정됨
    if (pathname !== '/addMusic') {
      setThumbnail(null);
      setCheckImage('none');
      // 그 외(editMusic Page인 경우 기존에 업로드 된 이미지를 확인함)
      if (uploadVer === 'ko') {
        if (music?.kothumbnail) {
          setThumbnail(music?.kothumbnail);
          setCheckImage('ok');
        }
      } else {
        if (music?.jpthumbnail) {
          setThumbnail(music?.jpthumbnail);
          setCheckImage('ok');
        }
      }
    }
  }, []);

  const checkImageForm = (file: File | undefined) => {
    if (!file) {
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
    const fileExtension = file.type.toLowerCase();
    const fileSize = file.size; // 파일 크기(바이트)

    if (fileSize > 1048576 || !correctFormat.includes(fileExtension)) {
      console.log('파일이 올바르지 않습니다.');
      setCheckImage('bad');
    } else {
      console.log('파일이 올바릅니다.');
      setCheckImage('ok');
      const imageUrl = URL.createObjectURL(file);
      // setImage(imageUrl);

      if (uploadVer === 'ko') {
        setThumbnail(imageUrl);
      } else {
        setThumbnail(imageUrl);
      }
    }
  };

  const showPreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    checkImageForm(file);
  };

  return (
    <div className='mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 bg-white px-6 py-10 dark:border-gray-600'>
      <div className='text-center'>
        {checkImage === 'none' && (
          <HiPhoto
            className='mx-auto size-12 text-gray-300'
            aria-hidden='true'
          />
        )}
        {checkImage === 'bad' && (
          <GoAlertFill
            className='mx-auto size-12 p-1 text-music-orange'
            aria-hidden='true'
          />
        )}
        {checkImage === 'ok' && <Preview image={thumbnail} />}

        <div className='mt-4 flex text-sm leading-6 text-gray-600'>
          <label
            htmlFor='thumbnail'
            className='relative cursor-pointer rounded-md  font-semibold focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 '>
            <span
              className={
                checkImage === 'bad'
                  ? 'text-music-orange hover:text-music-lightorange'
                  : 'text-music-blue hover:text-music-lightblue'
              }>
              {
                lan[
                  `addmusic-album-image-${checkImage || 'none'}` as keyof typeof lan
                ]
              }
            </span>
            <input
              id='thumbnail'
              {...register(thumbnail_lang, {
                validate: checkFileType,
              })}
              type='file'
              className='sr-only'
              onChange={showPreview}
            />
          </label>
          <p className='text-black'>
            {
              lan[
                `addmusic-album-upload-${checkImage || 'none'}` as keyof typeof lan
              ]
            }
          </p>
        </div>
        <p className='text-xs leading-5 text-music-subtitle '>
          PNG, JPG, WEBP up to 1MB
        </p>
      </div>
    </div>
  );
};

export default UploadImage;
