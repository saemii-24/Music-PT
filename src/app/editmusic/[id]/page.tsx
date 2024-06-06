import EditMusicPage from '@/components/EditMusicPage';
import ogImage from '../opengraph-image.jpg';
import axios from 'axios';
import {Metadata, ResolvingMetadata} from 'next';

type Props = {
  params: {id: string};
  searchParams: {[key: string]: string | string[] | undefined};
};

const getMusicData = async (id: number) => {
  try {
    const {data}: any = await axios.get(
      `https://music-pt.vercel.app/api/music/${id}`,
    );

    const {kothumbnail, jpthumbnail, kotitle, jptitle, kosinger, jpsinger} =
      data.post;

    const thumbnail = kothumbnail
      ? kothumbnail
      : jpthumbnail
        ? jpthumbnail
        : ogImage.src;

    const title = kotitle ? kotitle : jptitle ? jptitle : '';
    const singer = kosinger ? kosinger : jpsinger ? jpsinger : '';

    return {thumbnail, title, singer};
  } catch (err) {
    console.log(err);
    return {thumbnail: '', title: '', singer: ''};
  }
};

export async function generateMetadata(
  {params, searchParams}: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const id = Number(params.id);
  const data = await getMusicData(id);

  const {thumbnail, title, singer} = data;

  return {
    title: title ? 'Music PT_Edit_' + title : 'Music PT_Edit',
    description: 'Music PT에 등록 된 음악을 수정할 수 있어요!',
    metadataBase: new URL('https://music-pt.vercel.app/'),
    alternates: {
      canonical: `/editmusic/${id}`,
    },
    openGraph: {
      title: title + ' 내용 수정' || 'Music PT 내용 수정',
      description:
        title && singer
          ? `[${singer}] ` + title + '의 등록된 내용을 수정할 수 있어요!'
          : 'Music PT에 등록된 내용을 수정할 수 있어요!',
      images: [
        {
          url: thumbnail,
          width: 1200,
          height: 630,
          alt: title ? title + ' 앨범 표지' : '기본 이미지',
        },
      ],
    },
    twitter: {
      title: title + ' 내용 수정' || 'Music PT 내용 수정',
      description:
        title && singer
          ? `[${singer}] ` + title + '의 등록된 내용을 수정할 수 있어요!'
          : 'Music PT에 등록된 내용을 수정할 수 있어요!',
      images: [
        {
          url: thumbnail,
          width: 800,
          height: 600,
          alt: title ? title + ' 앨범 표지' : '기본 이미지',
        },
      ],
    },
  };
}

export default function EditMusic({params}: {params: {id: string}}) {
  return <EditMusicPage params={params} />;
}
