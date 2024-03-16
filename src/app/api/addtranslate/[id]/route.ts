import {PrismaClient} from '@prisma/client';
import {NextResponse} from 'next/server';
import {main} from '../../music/route';

const prisma = new PrismaClient();

//id에 맞는 음악 데이터를 추가한다.
export const PUT = async (req: Request, res: NextResponse) => {
  try {
    await main();
    //쿼리스트링 값을 받아옴
    const id: number = parseInt(req.url.split('/addtranslate/')[1]);
    console.log(id);

    //body 값 받아오기
    const {translateto, lyrics} = await req.json();
    await main();

    //만약 translateto 가 jp면 한국어 -> 일본어 가사 번역이며,
    //sdupabase kotranslate에 업로드한다.
    let updateMusic;
    if (translateto === 'jp') {
      updateMusic = await prisma.post.update({
        where: {
          id: id,
        },
        data: {
          updatedAt: new Date(),
          kotranslate: lyrics,
        },
      });
    } else {
      updateMusic = await prisma.post.update({
        where: {
          id: id,
        },
        data: {
          updatedAt: new Date(),
          jptranslate: lyrics,
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
