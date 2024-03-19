import {PrismaClient} from '@prisma/client';
import {NextResponse} from 'next/server';
import {main} from '../route';

const prisma = new PrismaClient();

//id에 맞는 음악 데이터만 불러온다
export const GET = async (req: Request, res: NextResponse) => {
  try {
    await main();
    //쿼리스트링 값을 받아옴
    const id: number = parseInt(req.url.split('/music/')[1]);
    console.log(id);
    const post = await prisma.post.findFirst({where: {id}});
    return NextResponse.json({message: 'Success', post}, {status: 200});
  } catch (err) {
    return NextResponse.json({message: 'Error', err}, {status: 500});
  } finally {
    //error가 발생해도 finally는 반드시 실행 됨
    await prisma.$disconnect();
  }
};

//음악을 삭제한다.
export const DELETE = async (req: Request, res: NextResponse) => {
  try {
    await main();
    //쿼리스트링 값을 받아옴
    const id: number = parseInt(req.url.split('/music/')[1]);
    const post = await prisma.post.delete({
      where: {id},
    });
    return NextResponse.json({message: 'Success', post}, {status: 200});
  } catch (err) {
    return NextResponse.json({message: 'Error', err}, {status: 500});
  } finally {
    //error가 발생해도 finally는 반드시 실행 됨
    await prisma.$disconnect();
  }
};
