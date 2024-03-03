import HomeTitle from '@/components/HomeTitle';
import MusicCard from '@/components/MusicCard';

export default async function Home() {
  return (
    <main className=' flex-1 bg-[#F8F9FA] '>
      <div className='container py-20'>
        <HomeTitle />
        <div className='grid grid-cols-1 justify-between gap-x-4 gap-y-10 md:grid-cols-2 lg:grid-cols-4'>
          {new Array(10).fill(0).map((item, index) => {
            return <MusicCard key={index} />;
          })}
        </div>
      </div>
    </main>
  );
}
