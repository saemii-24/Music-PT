import {FormValues} from '@/types/form';
import {PrismaClient} from '@prisma/client';
import {NextResponse} from 'next/server';

const prisma = new PrismaClient();

export async function main() {
  try {
    await prisma.$connect();
  } catch (err) {
    return Error('DB 접속에 실패했습니다.');
  }
}

//모든 정보를 불러온다
// export const GET = async (req: Request, res: NextResponse) => {
//   try {
//     await main();
//     const posts = await prisma.post.findMany();
//     return NextResponse.json({message: 'Success', posts}, {status: 200});
//   } catch (err) {
//     return NextResponse.json({message: 'Error', err}, {status: 500});
//   } finally {
//     //error가 발생해도 finally는 반드시 실행 됨
//     await prisma.$disconnect();
//   }
// };

//음악을 작성한다.
export const POST = async (req: Request, res: NextResponse) => {
  try {
    //body 값 받아오기
    const {
      title,
      singer,
      youtube,
      album,
      release,
      thumbnail,
      language,
      lyrics,
    } = await req.json();
    await main();

    let post;
    if (language === '한국어') {
      post = await prisma.post.create({
        data: {
          kotitle: title,
          kosinger: singer,
          koyoutube: youtube,
          koalbum: album,
          korelease: release,
          kothumbnail: thumbnail,
          kolyrics: lyrics,
        },
      });
    } else {
      post = await prisma.post.create({
        data: {
          jptitle: title,
          jpsinger: singer,
          jpyoutube: youtube,
          jpalbum: album,
          jprelease: release,
          jpthumbnail: thumbnail,
          jplyrics: lyrics,
        },
      });
    }
    return NextResponse.json({message: 'Success', post}, {status: 201});
  } catch (err) {
    return NextResponse.json({message: 'Error', err}, {status: 500});
  } finally {
    //error가 발생해도 finally는 반드시 실행 됨
    await prisma.$disconnect();
  }
};
//
