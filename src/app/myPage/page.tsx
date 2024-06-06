import MyPagePage from '@/components/MyPagePage';
import ogImage from './opengraph-image.jpg';

export function generateMetadata() {
  return {
    title: 'Music PT_MyPage',
    description: '마이페이지에서 내가 좋아요한 음악을 확인해보세요!',
    metadataBase: new URL('https://music-pt.vercel.app/'),
    alternates: {
      canonical: `/myPage`,
    },
    openGraph: {
      title: 'Music PT 마이페이지',
      description: '마이페이지에서 내가 좋아요한 음악을 확인해보세요!',
      images: [
        {
          url: ogImage.src,
          width: 1200,
          height: 630,
          alt: 'Music PT 마이페이지 안내 이미지',
        },
      ],
    },
    twitter: {
      title: 'Music PT 마이페이지',
      description: '마이페이지에서 내가 좋아요한 음악을 확인해보세요!',
      images: [
        {
          url: ogImage.src,
          width: 800,
          height: 600,
          alt: 'Music PT 마이페이지 안내 이미지',
        },
      ],
    },
  };
}

export default function MyPage() {
  return <MyPagePage />;
}
