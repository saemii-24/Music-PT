import {PrismaClient} from '@prisma/client';
import {NextResponse} from 'next/server';
import {main} from '../../music/route';

const prisma = new PrismaClient();

//id에 맞는 음악의 가사를 수정한다.
export const PUT = async (req: Request, res: NextResponse) => {
  try {
    await main();
    //쿼리스트링 값을 받아옴
    const id: number = parseInt(req.url.split('/editlyrics/')[1]);
    console.log(id);

    //body 값 받아오기
    const {lyricsLang, lyrics} = await req.json();
    await main();

    //만약 lyricsLang이ko면 한국어 가사, jp면 일본어가사를 업데이트 한다.
    let updateMusic;
    if (lyricsLang === 'jp') {
      updateMusic = await prisma.post.update({
        where: {
          id: id,
        },
        data: {
          updatedAt: new Date(),
          jplyrics: lyrics,
        },
      });
    } else {
      updateMusic = await prisma.post.update({
        where: {
          id: id,
        },
        data: {
          updatedAt: new Date(),
          kolyrics: lyrics,
        },
      });
    }
    return NextResponse.json({message: 'Success', updateMusic}, {status: 200});
  } catch (err) {
    return NextResponse.json({message: 'Error', err}, {status: 500});
  } finally {
    //error가 발생해도 finally는 반드시 실행 됨
    await prisma.$disconnect();
  }
};
