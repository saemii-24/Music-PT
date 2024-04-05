import {LangType} from '@/types/form';
import {Dispatch, SetStateAction} from 'react';

interface LangButtonType {
  setSelectLang: Dispatch<SetStateAction<LangType>>;
  selectLang: LangType;
  kosinger: string | null;
  jpsinger: string | null;
  kolyrics: string | null;
  jplyrics: string | null;
}

export default function LangButton({
  setSelectLang,
  selectLang,
  kosinger,
  jpsinger,
  kolyrics,
  jplyrics,
}: LangButtonType) {
  return (
    <div className='flex gap-2'>
      {kolyrics && (
        <button
          onClick={() => {
            setSelectLang('ko');
          }}
          type='button'
          className='inline-block w-11 rounded-3xl bg-music-blue py-[0.1rem] text-center text-sm text-[#ffffff]  hover:bg-music-lightblue'>
          KO
        </button>
      )}
      {jplyrics && (
        <button
          onClick={() => {
            setSelectLang('jp');
          }}
          type='button'
          className='inline-block w-11 rounded-3xl bg-music-orange py-[0.1rem] text-center text-sm text-[#ffffff] hover:bg-music-lightorange'>
          JP
        </button>
      )}
    </div>
  );
}
