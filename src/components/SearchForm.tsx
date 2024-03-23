import {SelectType} from '@/types/form';
import cn from 'classnames';
import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {
  FieldValues,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';
import {GoTriangleDown} from 'react-icons/go';
import {IoMdSearch} from 'react-icons/io';

interface SearchFormProps {
  setSearch: Dispatch<string>;
  register: UseFormRegister<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues, undefined>;
  select: SelectType;
  setSelect: Dispatch<SetStateAction<SelectType>>;
  clientSelect: string;
  setClientSelect: Dispatch<SetStateAction<string>>;
  selectOpen: boolean;
  setSelectOpen: Dispatch<SetStateAction<boolean>>;
}

export default function SearchForm({
  setSearch,
  register,
  handleSubmit,
  select,
  setSelect,
  clientSelect,
  setClientSelect,
  selectOpen,
  setSelectOpen,
}: SearchFormProps) {
  useEffect(() => {
    switch (select) {
      case 'title':
        setClientSelect('제목');
        break;
      case 'singer':
        setClientSelect('가수');
        break;
      default:
        setClientSelect('모든 음악');
    }
  }, [select]);

  return (
    <form
      onSubmit={handleSubmit((data: FieldValues) => setSearch(data['search']))}>
      <div className='flex h-11 items-center justify-center rounded-[100rem] border-2 border-gray-300'>
        <div className='relative hidden w-[8rem]  flex-col items-center justify-center sm:flex'>
          <div
            className={cn(
              'text-base relative z-10 flex size-full cursor-pointer items-center justify-center text-center',
              {
                'bg-white  border-2 h-11 rounded-[100rem] border-black':
                  selectOpen,
              },
            )}
            onClick={() => {
              setSelectOpen(!selectOpen);
            }}>
            {clientSelect}
            <GoTriangleDown
              className={cn('absolute right-0 transition mr-2', {
                'rotate-180': selectOpen,
              })}
            />
          </div>
          <ul
            className={cn(
              'text-sm pt-5 rounded-b-lg border-2 border-black cursor-pointer ease-in-out absolute duration-1000 w-full top-6 bg-white flex flex-col transition opacity-0',
              {
                'visible opacity-100': selectOpen,
                'hidden opacity-0': !selectOpen,
              },
            )}>
            <li
              className='pb-1  pt-2 text-center text-sm  hover:bg-music-lightgray'
              onClick={() => {
                setSelect('all');
                setSelectOpen(false);
              }}>
              모든 음악
            </li>
            <li
              className='py-2 text-center text-sm hover:bg-music-lightgray'
              onClick={() => {
                setSelect('title');
                setSelectOpen(false);
              }}>
              제목
            </li>
            <li
              className='py-1 text-center  hover:bg-music-lightgray'
              onClick={() => {
                setSelect('singer');
                setSelectOpen(false);
              }}>
              가수
            </li>
          </ul>
        </div>

        <span className='hidden pr-3 font-bold text-gray-300 sm:block'>|</span>
        <input
          type='text'
          {...register('search', {required: true})}
          id='search'
          className='block flex-1 rounded-md py-1.5 text-base text-gray-900 placeholder:text-gray-400 '
          placeholder='음악 제목을 검색해주세요.'
        />
        <button
          type='submit'
          className=' flex aspect-square size-11 items-center justify-center rounded-md border-0 py-1.5 text-gray-900 ring-gray-300 '>
          <IoMdSearch className='text-lg text-music-blue' />
        </button>
      </div>
      {/* 모바일 사이즈 ui */}
      {/* <div className='flex flex-wrap justify-between sm:hidden'>
        <div className='w-full'>검색기준</div>
        <button
          type='button'
          onClick={() => {
            setSelect('title');
          }}
          className={cn(
            'flex items-center justify-center gap-2 break-keep rounded-md border-2 px-4 py-2 text-sm font-semibold shadow-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 border-music-blue text-music-blue hover:border-music-blue hover:bg-music-blue hover:text-white',
            {
              'bg-music-blue text-white': select === 'title',
            },
          )}>
          제목
        </button>
        <button
          type='button'
          onClick={() => {
            setSelect('singer');
          }}
          className={cn(
            'flex items-center justify-center gap-2 break-keep rounded-md border-2 px-4 py-2 text-sm font-semibold shadow-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 border-music-blue text-music-blue hover:border-music-blue hover:bg-music-blue hover:text-white',
            {
              'bg-music-blue  text-white': select === 'singer',
            },
          )}>
          가수
        </button>
        <button
          type='button'
          onClick={() => {
            setSelect('ko');
          }}
          className={cn(
            'flex items-center justify-center gap-2 break-keep rounded-md border-2 px-4 py-2 text-sm font-semibold shadow-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 border-music-blue text-music-blue hover:border-music-blue hover:bg-music-blue hover:text-white',
            {
              'bg-music-blue  text-white': select === 'ko',
            },
          )}>
          한국어
        </button>
        <button
          type='button'
          onClick={() => {
            setSelect('jp');
          }}
          className={cn(
            'flex items-center justify-center gap-2 break-keep rounded-md border-2 px-4 py-2 text-sm font-semibold shadow-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 border-music-blue text-music-blue hover:border-music-blue hover:bg-music-blue hover:text-white',
            {
              'bg-music-blue  text-white': select === 'jp',
            },
          )}>
          일본어
        </button>
      </div> */}
    </form>
  );
}
