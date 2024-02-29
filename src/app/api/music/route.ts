// import {createClient} from '@/supabase/server';

// //정보 모두 가져오기
// export async function GET(req: Response) {
//   const supabase = createClient();
//   let {data: music} = await supabase.from('music').select('*');

//   console.log(music);
//   return Response.json(music, {status: 200});
// }
