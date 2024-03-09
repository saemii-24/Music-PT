import {FormValues} from '@/types/form';
import {PrismaClient} from '@prisma/client';
import {NextResponse} from 'next/server';
import {main} from '../../music/route';

const prisma = new PrismaClient();

export const GET = async (req: Request, res: NextResponse) => {
  const pageParam: number = parseInt(req.url.split('/searchmusic/')[1]);
  try {
    await main();
    try {
      const postNum = 10;
      const skip = pageParam * postNum;
      const posts = await prisma.post.findMany({
        take: postNum,
        skip: skip,
        orderBy: {
          date: 'desc',
        },
      });
      return NextResponse.json({message: 'Success', posts}, {status: 200});
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  } catch (err) {
    return NextResponse.json({message: 'Error', err}, {status: 500});
  } finally {
    //error가 발생해도 finally는 반드시 실행 됨
    await prisma.$disconnect();
  }
};
