import MusicPage from '@/components/MusicPage';
import {ParamsProps} from '@/types/form';
import axios from 'axios';
import {Metadata, ResolvingMetadata} from 'next';
import ogImage from '../opengraph-image.jpg';

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

// export async function generateMetadata(
//   {params, searchParams}: Props,
//   parent: ResolvingMetadata,
// ): Promise<Metadata> {
//   const id = Number(params.id);
//   const data = await getMusicData(id);

//   const {thumbnail, title, singer} = data;

//   return {
//     title: title ? 'Music PT_' + title : 'Music PT',
//     description: 'Music PT에서 좋아하는 음악의 언어별 가사를 비교해보세요!',
//     metadataBase: new URL('https://music-pt.vercel.app/'),
//     alternates: {
//       canonical: `/musicpt/${id}`,
//     },
//     openGraph: {
//       title: title + ' 가사 탐구' || 'Music PT 가사 탐구',
//       description:
//         title && singer
//           ? `[${singer}] ` + title + '의 언어별 가사를 비교해보세요!'
//           : 'Music PT에서 언어별 가사를 비교해보세요!',
//       images: [
//         {
//           url: thumbnail,
//           width: 1200,
//           height: 630,
//         },
//       ],
//     },
//     twitter: {
//       title: title + ' 가사 탐구' || 'Music PT 가사 탐구',
//       description:
//         title && singer
//           ? `[${singer}] ` + title + '의 언어별 가사를 비교해보세요!'
//           : 'Music PT에서 언어별 가사를 비교해보세요!',
//       images: [
//         {
//           url: thumbnail,
//           width: 800,
//           height: 600,
//           alt: title ? title + ' 앨범 썸네일' : '앨범 기본 이미지',
//         },
//       ],
//     },
//   };
// }

export async function generateMetadata(
  {params, searchParams}: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const id = Number(params.id);
  const data = await getMusicData(id);

  const {thumbnail, title, singer} = data;

  return {
    title: title ? 'Music PT_' + title : 'Music PT',
    description: 'Music PT에서 좋아하는 음악의 언어별 가사를 비교해보세요!',
    metadataBase: new URL('https://music-pt.vercel.app/'),
    alternates: {
      canonical: `/musicpt/${id}`,
    },
    openGraph: {
      title: title + ' 가사 탐구' || 'Music PT 가사 탐구',
      description:
        title && singer
          ? `[${singer}] ` + title + '의 언어별 가사를 비교해보세요!'
          : 'Music PT에서 언어별 가사를 비교해보세요!',
      images: [
        {
          url: `http://localhost:3000/${id}/opengraph-image`,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      title: title + ' 가사 탐구' || 'Music PT 가사 탐구',
      description:
        title && singer
          ? `[${singer}] ` + title + '의 언어별 가사를 비교해보세요!'
          : 'Music PT에서 언어별 가사를 비교해보세요!',
      images: [
        {
          url: `http://localhost:3000/${id}/opengraph-image`,
          width: 800,
          height: 600,
          alt: title ? title + ' 앨범 썸네일' : '앨범 기본 이미지',
        },
      ],
    },
  };
}

export default function MusicPt({params}: ParamsProps) {
  return <MusicPage params={params} />;
}
