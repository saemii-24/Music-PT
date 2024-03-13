import MusicLyricsAdd from '@/components/MusicLyricsAdd';
import {ParamsProps} from '../page';

//일본어 버전에 한국어 번역을 추가하는 페이지
export default function AddLyricsKo({params}: ParamsProps) {
  return <MusicLyricsAdd id={params.id} />;
}
