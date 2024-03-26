import Title from '@/components/Title';

export default function Login() {
  const titleInfo = {
    title: '언어를 즐겁게, Music PT 입니다.',
    description: 'SNS를 이용해 간편하게 로그인하고, Music PT를 시작해보세요.',
  };
  return (
    <main className='flex-1'>
      <div className='container py-20'>
        <Title titleInfo={titleInfo} />
        <div className='mt-10'></div>
      </div>
    </main>
  );
}
