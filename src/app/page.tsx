import RootPage from '@/components/RootPage';
import ogImage from './opengraph-image.jpg';

export function generateMetadata() {
  return {
    title: 'Music PT',
    description:
      'Music PT에서 좋아하는 음악을 번역하고, 즐겁게 언어를 학습하세요!',
    metadataBase: new URL('https://music-pt.vercel.app/'),
    alternates: {
      canonical: `/`,
    },
    openGraph: {
      title: 'Music PT',
      description:
        'Music PT에서 좋아하는 음악을 번역하고, 즐겁게 언어를 학습하세요!',
      images: [
        {
          url: ogImage.src,
          width: 1200,
          height: 630,
          alt: 'Music PT 메인 페이지 안내 이미지',
        },
      ],
    },
    twitter: {
      title: 'Music PT',
      description:
        'Music PT에서 좋아하는 음악을 번역하고, 즐겁게 언어를 학습하세요!',
      images: [
        {
          url: ogImage.src,
          width: 800,
          height: 600,
          alt: 'Music PT 메인 페이지 안내 이미지',
        },
      ],
    },
  };
}

export default function Home() {
  return <RootPage />;
}
