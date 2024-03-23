import {FormValues} from '@/types/form';
import {PrismaClient} from '@prisma/client';
import {NextResponse} from 'next/server';
import {main} from '../music/route';
import type {SelectType} from '@/types/form';

const prisma = new PrismaClient();

// export const GET = async (req: Request, res: NextResponse) => {
//   const {searchParams} = new URL(req.url);
//   const pageParam = Number(searchParams.get('pageParam'));
//   const postCount = Number(searchParams.get('postCount'));

//   await main();
//   try {
//     // const skip = pageParam * postCount;
//     let skip;
//     if (pageParam === 1) {
//       skip = 0;
//     } else {
//       skip = pageParam * postCount;
//     }
//     const posts = await prisma.post.findMany({
//       take: postCount,
//       skip: skip,
//       orderBy: {
//         date: 'desc',
//       },
//     });

//     return NextResponse.json({message: 'Success', posts}, {status: 200});
//   } catch (err) {
//     return NextResponse.json({message: 'Error', err}, {status: 500});
//   } finally {
//     //error가 발생해도 finally는 반드시 실행 됨
//     await prisma.$disconnect();
//   }
// };

export const GET = async (req: Request, res: NextResponse) => {
  const {searchParams} = new URL(req.url);
  const pageParam = Number(searchParams.get('pageParam'));
  const postCount = Number(searchParams.get('postCount'));
  const select = searchParams.get('select') as SelectType;
  const search = searchParams.get('search') as string;

  await main();

  let skip = pageParam * postCount;

  if (select === 'all') {
    try {
      // const skip = pageParam * postCount;
      let posts = await prisma.post.findMany({
        take: postCount,
        skip: skip,
        orderBy: {
          date: 'desc',
        },
      });
      return NextResponse.json({message: 'Success', posts}, {status: 200});
    } catch (err) {
      return NextResponse.json({message: 'Error', err}, {status: 500});
    } finally {
      //error가 발생해도 finally는 반드시 실행 됨
      await prisma.$disconnect();
    }
  } else if (select === 'title') {
    console.log('실행');
    try {
      const titlePost = await prisma.post.findMany({
        take: postCount, // 가져올 데이터 개수
        skip: skip, // 건너뛸 데이터 개수
        where: {
          OR: [
            {
              kotitle: {
                contains: search,
              },
            },
            {
              jptitle: {
                contains: search,
              },
            },
          ],
        },
        orderBy: {
          date: 'desc', // 날짜 기준 내림차순 정렬
        },
      });
      return NextResponse.json({message: 'Success', titlePost}, {status: 200});
    } catch (err) {
      return NextResponse.json({message: 'Error', err}, {status: 500});
    } finally {
      //error가 발생해도 finally는 반드시 실행 됨
      await prisma.$disconnect();
    }
  } else if (select === 'singer') {
    console.log('실행');
    try {
      const singerPost = await prisma.post.findMany({
        take: postCount, // 가져올 데이터 개수
        skip: skip, // 건너뛸 데이터 개수
        where: {
          OR: [
            {
              kosinger: {
                contains: search,
              },
            },
            {
              jpsinger: {
                contains: search,
              },
            },
          ],
        },
        orderBy: {
          date: 'desc', // 날짜 기준 내림차순 정렬
        },
      });
      return NextResponse.json({message: 'Success', singerPost}, {status: 200});
    } catch (err) {
      return NextResponse.json({message: 'Error', err}, {status: 500});
    } finally {
      //error가 발생해도 finally는 반드시 실행 됨
      await prisma.$disconnect();
    }
  }
};
