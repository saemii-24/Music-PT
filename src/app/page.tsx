import HomeTitle from '@/components/HomeTitle';
import MusicCard from '@/components/MusicCard';
import {SupabaseType} from '@/types/form';

export default async function Home() {
  //getStaticProps
  const firstMusicData = await fetch(
    `http://localhost:3000/api/searchmusic?pageParam=1&postCount=9&select=all&search=`,
    {cache: 'no-store'},
  )
    .then((res) => res.json())
    .then((data) => data.posts);

  return (
    <main className=' flex-1 bg-[#F8F9FA] '>
      <div className='container py-20'>
        <HomeTitle />
        <div className='grid grid-cols-1 justify-between gap-x-20 gap-y-10 lg:grid-cols-2 xl:grid-cols-3'>
          {firstMusicData.map((musicData: SupabaseType, index: number) => {
            return <MusicCard key={index} musicData={musicData} />;
          })}
        </div>
      </div>
    </main>
  );
}
