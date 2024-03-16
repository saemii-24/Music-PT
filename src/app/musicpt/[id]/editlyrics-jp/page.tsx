import MusicLyricsEdit from '@/components/MusicLyricsEdit';
import {ParamsProps} from '@/types/form';

export default function EditLyricsJp({params}: ParamsProps) {
  return <MusicLyricsEdit lang='jp' id={params.id} />;
}
