import cn from 'classnames';
import {useEffect, useState} from 'react';
import {FieldValues, UseFormRegister} from 'react-hook-form';
import {IoMdSearch} from 'react-icons/io';
import {GoTriangleDown} from 'react-icons/go';

type SelectType = 'title' | 'singer' | 'ko' | 'jp';

export default function SearchForm({
  register,
}: {
  register: UseFormRegister<FieldValues>;
}) {
  const [select, setSelect] = useState<SelectType>('title');
  const [clientSelect, setClientSelect] = useState('제목');
  const [selectOpen, setSelectOpen] = useState<boolean>(false);

  useEffect(() => {
    switch (select) {
      case 'title':
        setClientSelect('제목');
        break;
      case 'singer':
        setClientSelect('가수');
        break;
      case 'ko':
        setClientSelect('한국어');
        break;
      case 'jp':
        setClientSelect('일본어');
        break;
      default:
        setClientSelect('제목');
    }
  }, [select]);

  return (
    <form>
      <div className='flex h-11 items-center justify-center rounded-[100rem] border-2 border-gray-300'>
        <div className='relative flex w-[8rem] flex-col items-center justify-center'>
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
            <li
              className=' py-1 text-center hover:bg-music-lightgray'
              onClick={() => {
                setSelect('ko');
                setSelectOpen(false);
              }}>
              한국어
            </li>
            <li
              className='pb-3 pt-1 text-center hover:bg-music-lightgray'
              onClick={() => {
                setSelect('jp');
                setSelectOpen(false);
              }}>
              일본어
            </li>
          </ul>
        </div>
        <span className='pr-3 font-bold text-gray-300'>|</span>
        <input
          type='text'
          {...register('search', {required: true})}
          id='search'
          className='block flex-1 rounded-md border-0 py-1.5 text-base text-gray-900 placeholder:text-gray-400'
          placeholder='음악 제목을 검색해주세요.'
        />
        <button
          type='submit'
          className=' flex aspect-square size-11 items-center justify-center rounded-md border-0 py-1.5 text-gray-900 ring-gray-300 '>
          <IoMdSearch className='text-lg text-music-blue' />
        </button>
      </div>
    </form>
  );
}
