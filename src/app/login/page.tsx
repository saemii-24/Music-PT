import LoginPage from '@/components/LoginPage';
import ogImage from './opengraph-image.jpg';

export function generateMetadata() {
  return {
    title: 'Music PT_Login',
    description:
      'Music PT에 로그인하고, 좋아하는 음악을 등록하고 번역해보세요!',
    metadataBase: new URL('https://music-pt.vercel.app/'),
    alternates: {
      canonical: `/login`,
    },
    openGraph: {
      title: 'Music PT 로그인',
      description:
        'Music PT에 로그인하고, 좋아하는 음악을 등록하고 번역해보세요!',
      images: [
        {
          url: ogImage.src,
          width: 1200,
          height: 630,
          alt: 'Music PT 로그인 안내 이미지',
        },
      ],
    },
    twitter: {
      title: 'Music PT 로그인',
      description:
        'Music PT에 로그인하고, 좋아하는 음악을 등록하고 번역해보세요!',
      images: [
        {
          url: ogImage.src,
          width: 800,
          height: 600,
          alt: 'Music PT 로그인 안내 이미지',
        },
      ],
    },
  };
}

export default function Login() {
  return <LoginPage />;
}
