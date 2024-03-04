// pages/api/posts.js

import {createClient} from '@/supabase/server';
import {PrismaClient} from '@prisma/client';
import {NextRequest, NextResponse} from 'next/server';
import {main} from '../music/route';

// Supabase 클라이언트 초기화
const prisma = new PrismaClient();

// //음악을 작성한다.
// export const POST = async (request: Request, res: NextResponse) => {
//   const supabase = await createClient();
//   try {
//     //body 값 받아오기
//     const formData = await request.formData();
//     const singer = formData.get('singer') as string;
//     const thumbnail = formData.get('thumbnail');
//     // const thumbnail = 'http';
//     const title = '제목';
//     await main();

//     if (thumbnail) {
//       const {data: thumbnailData} = await supabase.storage
//         .from('thumbnail')
//         .upload(`${1}-${new Date()}`, thumbnail, {
//           cacheControl: '259200',
//         });
//     }
//     const post = await prisma.post.create({data: {singer, thumbnail, title}});
//     return NextResponse.json({message: 'Success', post}, {status: 201});
//   } catch (err) {
//     return NextResponse.json({message: 'Error', err}, {status: 500});
//   } finally {
//     //error가 발생해도 finally는 반드시 실행 됨
//     await prisma.$disconnect();
//   }
// };
//

export async function POST(request: NextRequest) {
  console.log(request);

  const supabase = await createClient();
  const formData = await request.formData();
  const singer = formData.get('singer') as string;
  const thumbnail = formData.get('thumbnail');
  console.log(singer, thumbnail);

  // //supabase storage 업로드
  // if (thumbnail) {
  //   const {data: thumbnailData} = await supabase.storage
  //     .from('thumbnail')
  //     .upload(`${1}-${new Date()}`, thumbnail, {
  //       cacheControl: '259200',
  //     });

  //   const thumbnailURL = thumbnailData?.path;

  //supabase에 create
  const post = await prisma.post.create({
    data: {
      title: '테스트',
      singer: singer,
      thumbnail: 'http',
    },
  });
  return NextResponse.json({singer, thumbnail}, {status: 200});
  // }
}
