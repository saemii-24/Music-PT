import {FormValues} from '@/types/form';
import {PrismaClient} from '@prisma/client';
import {NextResponse} from 'next/server';
import {main} from '../music/route';

const prisma = new PrismaClient();

export const GET = async (req: Request, res: NextResponse) => {
  const {searchParams} = new URL(req.url);
  const pageParam = Number(searchParams.get('pageParam'));
  const postCount = Number(searchParams.get('postCount'));

  console.log(pageParam);
  console.log(postCount);
  await main();
  try {
    // const skip = pageParam * postCount;
    let skip;
    if (pageParam === 1) {
      skip = 0;
    } else {
      skip = pageParam * postCount;
    }
    const posts = await prisma.post.findMany({
      take: postCount,
      skip: skip,
      orderBy: {
        date: 'desc',
      },
    });
    console.log(posts);
    return NextResponse.json({message: 'Success', posts}, {status: 200});
  } catch (err) {
    return NextResponse.json({message: 'Error', err}, {status: 500});
  } finally {
    //error가 발생해도 finally는 반드시 실행 됨
    await prisma.$disconnect();
  }
};
