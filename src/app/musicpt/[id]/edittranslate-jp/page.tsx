import MusicTranslateEdit from '@/components/MusicTranslateEdit';
import type {ParamsProps} from '@/types/form';

export default function EditTranslateJp({params}: ParamsProps) {
  return <MusicTranslateEdit lang='jp' id={params.id} />;
}
