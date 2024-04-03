import {PrismaClient} from '@prisma/client';
import {NextResponse} from 'next/server';
import {main} from '../music/route';

const prisma = new PrismaClient();

//like 갯수를 조회한다.
export const POST = async (req: Request, res: NextResponse) => {
  try {
    await main();
    //body값 받아오기
    const {musicId}: {musicId: number} = await req.json();

    const likeCount = await prisma.like.count({
      where: {
        musicId: musicId,
      },
    });
    return NextResponse.json(
      {message: 'Success', count: likeCount},
      {status: 200},
    );
  } catch (err) {
    return NextResponse.json({message: 'Error', err}, {status: 500});
  } finally {
    //error가 발생해도 finally는 반드시 실행 됨
    await prisma.$disconnect();
  }
};
