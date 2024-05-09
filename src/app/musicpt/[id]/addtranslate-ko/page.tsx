import MusicTranslateAdd from '@/components/MusicTranslateAdd';
import type {ParamsProps} from '@/types/form';

//한국어 버전의 일본어 번역을 수정하는 페이지
export default function AddTranslateKo({params}: ParamsProps) {
  return (
    <>
      <MusicTranslateAdd lang='ko' id={params.id} />;
    </>
  );
}
