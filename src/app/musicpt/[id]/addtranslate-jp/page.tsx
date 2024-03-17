import MusicTranslateAdd from '@/components/MusicTranslateAdd';
import {ParamsProps} from '@/types/form';

//일본어 버전의 한국어 번역을 수정하는 페이지
export default function AddTranslateJp({params}: ParamsProps) {
  return <MusicTranslateAdd lang='jp' id={params.id} />;
}
