import {
  FieldErrors,
  UseFormRegister,
  UseFormReset,
  UseFormWatch,
} from 'react-hook-form';
import {FormValues} from '@/types/form';
import MusicFormMusic from './MusicFormMusic';
import MusicFormAlbum from './MusicFormAlbum';
import MusicFormLyrics from './MusicFormLyrics';

interface MusicFormLyricsProps {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  watch: UseFormWatch<FormValues>;
  reset: UseFormReset<FormValues>;
}

export default function MusicFormKo({
  register,
  errors,
  watch,
  reset,
}: MusicFormLyricsProps) {
  return (
    <>
      {/* 음악 정보 업로드 */}
      <MusicFormMusic register={register} errors={errors} uploadVer={'ko'} />
      {/* 앨범 정보 업로드 */}
      <MusicFormAlbum
        register={register}
        errors={errors}
        watch={watch}
        reset={reset}
        uploadVer={'ko'}
      />
      {/* 가사 업로드 */}
      <MusicFormLyrics register={register} errors={errors} uploadVer={'ko'} />
    </>
  );
}
