import MusicPage from '@/components/MusicPage';
import {ParamsProps} from '@/types/form';
import axios from 'axios';
import {Metadata, ResolvingMetadata} from 'next';
import ogImage from '../opengraph-image.png';

type Props = {
  params: {id: string};
  searchParams: {[key: string]: string | string[] | undefined};
};

const getMusicData = async (id: number) => {
  try {
    const {data}: any = await axios.get(
      `https://music-pt.vercel.app/api/music/${id}`,
    );

    const {kothumbnail, jpthumbnail, kotitle, jptitle} = data.post;

    const thumbnail = kothumbnail
      ? kothumbnail
      : jpthumbnail
        ? jpthumbnail
        : ogImage.src;
    const title = kotitle ? kotitle : jptitle ? jptitle : '';

    return {thumbnail, title};
  } catch (err) {
    console.log(err);
    return {thumbnail: '', title: ''};
  }
};

export async function generateMetadata(
  {params, searchParams}: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const id = Number(params.id);
  const data = await getMusicData(id);

  const {thumbnail, title} = data;

  return {
    title: title ? 'Music PT_' + title : 'Music PT',
    description: 'Music PT에서 언어에 따른 가사의 미묘한 차이를 알아보세요!',
    metadataBase: new URL('https://music-pt.vercel.app/'),
    alternates: {
      canonical: `/musicpt/${id}`,
    },
    openGraph: {
      title: title + '가사 탐구' || 'Music PT 가사 탐구',
      description:
        title + '의 언어에 따른 가사의 미묘한 차이를 알아보세요!' ||
        'Music PT에서 언어에 따른 가사의 미묘한 차이를 알아보세요!',
      images: [
        {
          url: thumbnail,
          width: 1200,
          height: 630,
          alt: title + '앨범 썸네일',
        },
      ],
    },
    twitter: {
      title: title + '가사 탐구' || 'Music PT 가사 탐구',
      description:
        title + '의 언어에 따른 가사의 미묘한 차이를 알아보세요!' ||
        'Music PT에서 언어에 따른 가사의 미묘한 차이를 알아보세요!',
      images: [
        {
          url: thumbnail,
          width: 800,
          height: 600,
          alt: title + '앨범 썸네일',
        },
      ],
    },
  };
}

export default function MusicPt({params}: ParamsProps) {
  return <MusicPage params={params} />;
}
