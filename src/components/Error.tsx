import {languageMode} from '@/recoil';
import {LanguageType} from '@/types/form';
import {FieldError} from 'react-hook-form';
import {useRecoilValue} from 'recoil';

interface ErrorProps {
  errors: FieldError | undefined;
  errorTitle: string;
}

export default function Error({errors, errorTitle}: ErrorProps) {
  const lan: LanguageType = useRecoilValue(languageMode);
  return (
    <p className='mt-1 text-sm text-music-orange'>
      {errors && `* ${errorTitle} ${lan['error-required']}`}
    </p>
  );
}
