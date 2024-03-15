import MusicLyricsAdd from '@/components/MusicLyricsAdd';
import {ParamsProps} from '@/types/form';

//한국어 버전에 일본어 번역을 추가하는 페이지
export default function AddLyricsJp({params}: ParamsProps) {
  return <MusicLyricsAdd id={params.id} />;
}
