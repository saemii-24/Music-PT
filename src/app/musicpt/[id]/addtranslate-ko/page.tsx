import MusicLyricsAdd from '@/components/MusicLyricsAdd';
import type {ParamsProps} from '@/types/form';

//한국어 버전에 일본어 번역을 추가하는 페이지
export default function AddLyricsKo({params}: ParamsProps) {
  return <MusicLyricsAdd lang='ko' id={params.id} />;
}
