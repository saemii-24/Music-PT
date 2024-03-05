import {FieldError} from 'react-hook-form';

interface ErrorProps {
  errors: FieldError | undefined;
  errorTitle: string;
}

export default function Error({errors, errorTitle}: ErrorProps) {
  return (
    <p className='mt-1 text-sm text-music-orange'>
      {errors && `* ${errorTitle} 필수값 입니다.`}
    </p>
  );
}
