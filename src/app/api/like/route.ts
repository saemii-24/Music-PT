import {PrismaClient} from '@prisma/client';
import {NextResponse} from 'next/server';
import {getServerSession} from 'next-auth';
import {main} from '../music/route';
import {authOptions} from '../auth/[...nextauth]/route';
import {getToken} from 'next-auth/jwt';

const prisma = new PrismaClient();

// //like 값을 받아온다.
// export const GET = async (req: Request, res: NextResponse) => {
//   try {
//     await main();
//     //쿼리스트링 값을 받아옴
//     const id: number = parseInt(req.url.split('/like/')[1]);
//     //body 값 받아오기
//     const {lyricsLang, lyrics} = await req.json();
//   } catch (err) {
//     return NextResponse.json({message: 'Error', err}, {status: 500});
//   } finally {
//     //error가 발생해도 finally는 반드시 실행 됨
//     await prisma.$disconnect();
//   }
// };

//like를 추가한다.
export const POST = async (req: Request, res: NextResponse) => {
  try {
    await main();
    //body값 받아오기
    const {musicId} = await req.json();

    //session 받아오기
    const session = await getServerSession(authOptions);

    if (session?.user) {
      //좋아요 한 값이 있는지 먼저 확인한다.
      let like = await prisma.like.findFirst({
        where: {
          musicId: musicId,
          userId: session?.user?.id,
        },
      });
      // console.log('likebefore: ', likebefore);

      //만약 이미 좋아요를 했다면 취소, 아니라면 좋아요를 표시해준다.

      if (like) {
        like = await prisma.like.delete({
          where: {
            id: like.id,
          },
        });
        console.log('삭제');
        return NextResponse.json(
          {message: 'Success(Cancle Like)'},
          {status: 201},
        );
      } else {
        like = await prisma.like.create({
          data: {
            musicId: musicId,
            userId: session?.user?.id,
          },
        });
        console.log('추가');
        return NextResponse.json({message: 'Success(Add Like)'}, {status: 201});
      }
    }
    return NextResponse.json({message: 'Success'}, {status: 200});
  } catch (err) {
    return NextResponse.json({message: 'Error', err}, {status: 500});
  } finally {
    //error가 발생해도 finally는 반드시 실행 됨
    await prisma.$disconnect();
  }
};

// //like를 삭제한다.
// export const DELETE = async (req: Request, res: NextResponse) => {
//   try {
//     await main();
//     //쿼리스트링 값을 받아옴
//     const id: number = parseInt(req.url.split('/like/')[1]);
//     //body 값 받아오기
//     const {lyricsLang, lyrics} = await req.json();
//   } catch (err) {
//     return NextResponse.json({message: 'Error', err}, {status: 500});
//   } finally {
//     //error가 발생해도 finally는 반드시 실행 됨
//     await prisma.$disconnect();
//   }
// };