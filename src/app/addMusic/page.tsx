import AddMusicPage from '@/components/AddMusicPage';
import ogImage from './opengraph-image.jpg';

export function generateMetadata() {
  return {
    title: 'Music PT_Add',
    description: 'Music PT에 좋아하는 음악을 등록하고 가사를 번역해보세요!',
    metadataBase: new URL('https://music-pt.vercel.app/'),
    alternates: {
      canonical: `/addMusic`,
    },
    openGraph: {
      title: 'Music PT 음악 추가',
      description: 'Music PT에 새로운 음악을 등록하고 가사를 번역해보세요!',
      images: [
        {
          url: ogImage.src,
          width: 1200,
          height: 630,
          alt: 'Music PT 음악 등록 페이지 안내 이미지',
        },
      ],
    },
    twitter: {
      title: 'Music PT 음악 추가',
      description: 'Music PT에 새로운 음악을 등록하고 가사를 번역해보세요!',
      images: [
        {
          url: ogImage.src,
          width: 800,
          height: 600,
          alt: 'Music PT 음악 등록 페이지 안내 이미지',
        },
      ],
    },
  };
}

export default function AddMusic() {
  return <AddMusicPage />;
}
