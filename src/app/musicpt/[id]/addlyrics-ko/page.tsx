import MusicLyricsAdd from '@/components/MusicLyricsAdd';
import type {ParamsProps} from '@/types/form';

export default function AddLyricsKo({params}: ParamsProps) {
  return <MusicLyricsAdd lang='ko' id={params.id} />;
}
