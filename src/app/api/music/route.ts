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

//음악을 작성한다.
export const POST = async (req: Request, res: NextResponse) => {
  try {
    //body 값 받아오기
    const {
      title_ko,
      singer_ko,
      youtube_ko,
      album_ko,
      release_ko,
      thumbnail_ko,
      lyrics_ko,
      title_jp,
      singer_jp,
      youtube_jp,
      album_jp,
      release_jp,
      thumbnail_jp,
      lyrics_jp,
    } = await req.json();
    await main();

    let post = await prisma.post.create({
      data: {
        kotitle: title_ko,
        kosinger: singer_ko,
        koyoutube: youtube_ko,
        koalbum: album_ko,
        korelease: release_ko,
        kothumbnail: thumbnail_ko,
        kolyrics: lyrics_ko,
        jptitle: title_jp,
        jpsinger: singer_jp,
        jpyoutube: youtube_jp,
        jpalbum: album_jp,
        jprelease: release_jp,
        jpthumbnail: thumbnail_jp,
        jplyrics: lyrics_jp,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({message: 'Success', post}, {status: 201});
  } catch (err) {
    return NextResponse.json({message: 'Error', err}, {status: 500});
  } finally {
    //error가 발생해도 finally는 반드시 실행 됨
    await prisma.$disconnect();
  }
};
//
