import SearchMusicPage from '@/components/SearchMusicPage';
import ogImage from './opengraph-image.jpg';

export function generateMetadata() {
  return {
    title: 'Music PT_Search',
    description: 'Music PT에 등록 된 음악을 검색해보세요!',
    metadataBase: new URL('https://music-pt.vercel.app/'),
    alternates: {
      canonical: `/searchMusic`,
    },
    openGraph: {
      title: 'Music PT 음악 검색',
      description: 'Music PT에 등록 된 음악을 검색해보세요!',
      images: [
        {
          url: ogImage.src,
          width: 1200,
          height: 630,
          alt: 'Music PT 음악 검색 안내 이미지',
        },
      ],
    },
    twitter: {
      title: 'Music PT 음악 검색',
      description: 'Music PT에 등록 된 음악을 검색해보세요!',
      images: [
        {
          url: ogImage.src,
          width: 800,
          height: 600,
          alt: 'Music PT 음악 검색 안내 이미지',
        },
      ],
    },
  };
}

export default function SearchMusic() {
  return <SearchMusicPage />;
}
