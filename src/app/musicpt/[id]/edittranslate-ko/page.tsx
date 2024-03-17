import MusicTranslateEdit from '@/components/MusicTranslateEdit';
import type {ParamsProps} from '@/types/form';

export default function EditTranslateKp({params}: ParamsProps) {
  return <MusicTranslateEdit lang='ko' id={params.id} />;
}
