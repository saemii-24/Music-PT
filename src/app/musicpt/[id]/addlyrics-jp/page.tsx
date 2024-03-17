import MusicLyricsAdd from '@/components/MusicLyricsAdd';
import type {ParamsProps} from '@/types/form';

export default function AddLyricsJp({params}: ParamsProps) {
  return <MusicLyricsAdd lang='jp' id={params.id} />;
}
