import HomeTitle from '@/components/HomeTitle';
import MusicCard from '@/components/MusicCard';
// import {createClient} from '@/supabase/server';
// import axios from 'axios';

export default async function Home() {
  // const supabase = createClient();
  // let {data} = await supabase.from('music').select('*');

  // console.log(data);

  return (
    <main className=' flex-1 bg-[#F8F9FA]'>
      <div className='container'>
        <HomeTitle />
        <MusicCard />
      </div>
    </main>
  );
}
