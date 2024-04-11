import {language, languageMode} from '@/recoil';
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
import {useRecoilValue} from 'recoil';

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
  const lan = useRecoilValue(languageMode);

  useEffect(() => {
    switch (select) {
      case 'title':
        setClientSelect(lan['search-rule-title']);
        break;
      case 'singer':
        setClientSelect(lan['search-rule-singer']);
        break;
      default:
        setClientSelect(lan['search-rule-all']);
    }
  }, [select]);

  useEffect(() => {
    setClientSelect(lan['search-rule-all']);
  }, [lan]);

  return (
    <form
      onSubmit={handleSubmit((data: FieldValues) => setSearch(data['search']))}>
      <div className='flex h-11 items-center justify-center rounded-[100rem] border-2 border-gray-300 bg-white'>
        <div className='relative hidden w-[8rem]  flex-col items-center justify-center sm:flex'>
          <div
            className={cn(
              ' bg-white rounded-[100rem] text-black text-base relative z-20 flex size-full cursor-pointer items-center justify-center text-center',
              {
                'bg-white border-2 h-11 rounded-[100rem] border-black':
                  selectOpen,
              },
            )}
            onClick={() => {
              setSelectOpen(!selectOpen);
            }}>
            {clientSelect}
            <GoTriangleDown
              className={cn('text-black absolute right-0 transition mr-2', {
                'rotate-180': selectOpen,
              })}
            />
          </div>
          <ul
            className={cn(
              'overflow-hidden z-10 text-sm pt-5 rounded-b-lg border-2 border-black cursor-pointer ease-in-out absolute duration-1000 w-full top-6 bg-white text-black flex flex-col transition opacity-0',
              {
                'visible opacity-100': selectOpen,
                'hidden opacity-0': !selectOpen,
              },
            )}>
            <li
              className='py-2 text-center text-sm  hover:bg-music-lightgray'
              onClick={() => {
                setSelect('all');
                setSelectOpen(false);
              }}>
              {lan['search-rule-all']}
            </li>
            <li
              className='py-2 text-center text-sm hover:bg-music-lightgray'
              onClick={() => {
                setSelect('title');
                setSelectOpen(false);
              }}>
              {lan['search-rule-title']}
            </li>
            <li
              className='py-2 text-center  hover:bg-music-lightgray'
              onClick={() => {
                setSelect('singer');
                setSelectOpen(false);
              }}>
              {lan['search-rule-singer']}
            </li>
          </ul>
        </div>

        <span className='hidden pr-3 font-bold text-gray-300 sm:block'>|</span>
        <input
          type='text'
          {...register('search', {required: true})}
          id='search'
          className='placeholder:text-gray-400sm:ml-[0px] ml-[10px] block flex-1 rounded-md py-1.5 text-base text-black dark:bg-white '
          placeholder={lan['search-input-placeholder']}
        />
        <button
          type='submit'
          className=' flex aspect-square size-11 items-center justify-center rounded-md border-0 py-1.5 text-gray-900 ring-gray-300 '>
          <IoMdSearch className='text-lg text-music-blue' />
        </button>
      </div>
      {/* 모바일 사이즈 ui */}
      <div className='mt-10 block sm:hidden'>
        <ul className='flex gap-8 border-b text-black'>
          <li
            onClick={() => {
              setSelect('all');
              setClientSelect(lan['search-rule-all']);
            }}
            className={cn(
              'cursor-pointer break-keep',
              clientSelect === (lan['search-rule-all'] as string) &&
                'border-b-2 border-music-blue pb-5 font-bold text-music-blue',
            )}>
            {lan['search-rule-all']}
          </li>
          <li
            onClick={() => {
              setSelect('title');
              setClientSelect(lan['search-rule-title']);
            }}
            className={cn(
              'cursor-pointer break-keep',
              clientSelect === lan['search-rule-title'] &&
                'border-b-2 border-music-blue pb-5 font-bold text-music-blue',
            )}>
            {lan['search-rule-title']}
          </li>
          <li
            onClick={() => {
              setSelect('singer');
              setClientSelect(lan['search-rule-singer']);
            }}
            className={cn(
              'cursor-pointer break-keep',
              clientSelect === lan['search-rule-singer'] &&
                'border-b-2 border-music-blue pb-5 font-bold text-music-blue',
            )}>
            {lan['search-rule-singer']}
          </li>
        </ul>
      </div>
    </form>
  );
}
