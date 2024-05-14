import {UploadImagePropsType} from '@/types/form';
import UploadImage from './UploadImage';

export default function JpUploadImage({
  watch,
  register,
  reset,
  uploadVer,
}: UploadImagePropsType & {uploadVer: string}) {
  return (
    <UploadImage
      watch={watch}
      register={register}
      reset={reset}
      uploadVer={uploadVer}
    />
  );
}
