import {MouseEventHandler} from 'react';
import {BsTranslate} from 'react-icons/bs';
import {FaRegWindowRestore, FaHome} from 'react-icons/fa';
import {FiEdit} from 'react-icons/fi';
import {CgAddR} from 'react-icons/cg';

import cn from 'classnames';

type ButtonPropsType = {
  addclass?: string;
  defaultclass?: boolean;
  icon: string;
  text: string;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
};

// 아이콘 반환
const getIconComponent = (icon: string) => {
  switch (icon) {
    case 'add':
      return <CgAddR className='text-lg' />;
    case 'modify':
      return <FiEdit className='text-lg' />;
    case 'translate':
      return <BsTranslate className='text-lg' />;
    case 'divide':
      return <FaRegWindowRestore className='text-lg' />;
    case 'home':
      return <FaHome className='text-lg' />;
    default:
      return <FiEdit className='text-lg' />;
  }
};

export default function Button({
  addclass = '',
  defaultclass = true,
  icon,
  text,
  onClick,
}: ButtonPropsType) {
  return (
    <button
      onClick={onClick}
      className={cn(
        `${addclass} transition flex w-full items-center justify-center gap-2 break-keep rounded-md border-2 px-3 py-2 text-sm font-semibold shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`,
        {
          'border-music-blue text-music-blue hover:border-music-blue hover:bg-music-blue hover:text-[#fff]':
            defaultclass,
        },
      )}>
      {getIconComponent(icon)}
      {text}
    </button>
  );
}
