import EditMusicPage from '@/components/EditMusicPage';

export default function EditMusic({params}: {params: {id: string}}) {
  return <EditMusicPage params={params} />;
}
