import {PrismaClient} from '@prisma/client';
import {NextResponse} from 'next/server';
import {main} from '../music/route';
import {getServerSession} from 'next-auth';
import {authOptions} from '../auth/[...nextauth]/route';

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

//사용자가 좋아요한 음악 모든 목록을 받아온다.
export const GET = async (req: Request, res: NextResponse) => {
  try {
    await main();
    //session 받아오기
    const session = await getServerSession(authOptions);
    if (session?.user) {
      const likeAll = await prisma.like.findMany({
        where: {
          userId: session?.user?.id,
        },
        include: {
          music: true, // music relation을 include하여 Post 정보를 가져옴
        },
      });
      return NextResponse.json({message: 'Success', likeAll}, {status: 200});
    }
  } catch (err) {
    return NextResponse.json({message: 'Error', err}, {status: 500});
  } finally {
    //error가 발생해도 finally는 반드시 실행 됨
    await prisma.$disconnect();
  }
};
