import {FormValues} from '@/types/form';
import {PrismaClient} from '@prisma/client';
import {NextResponse} from 'next/server';
import {main} from '../music/route';
import type {SelectType} from '@/types/form';

const prisma = new PrismaClient();

export const GET = async (req: Request, res: NextResponse) => {
  const {searchParams} = new URL(req.url);
  const pageParam = Number(searchParams.get('pageParam'));
  const postCount = Number(searchParams.get('postCount'));
  const select = searchParams.get('select') as SelectType;
  let search = searchParams.get('search') as string;

  await main();

  let skip = pageParam * postCount;

  // //만약 사용자가 아무것도 입력하지 않았다면 무조건 빈 배열
  if (select != 'all' && search == '') {
    return NextResponse.json({message: 'Success', posts: []}, {status: 200});
  }

  if (select === 'all') {
    //만약 home에서 해당 api에 요청한 것 이라면 skip은 0이 되어야 한다.
    if (search === 'first') {
      skip = 0;
    }
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
    console.log(pageParam, postCount, search);
    try {
      const posts = await prisma.post.findMany({
        take: postCount, // 가져올 데이터 개수
        skip: skip, // 건너뛸 데이터 개수
        where: {
          OR: [
            {
              kotitle: {
                contains: search,
                mode: 'insensitive',
              },
            },
            {
              jptitle: {
                contains: search,
                mode: 'insensitive',
              },
            },
          ],
        },
        orderBy: {
          date: 'desc', // 날짜 기준 내림차순 정렬
        },
      });
      return NextResponse.json({message: 'Success', posts}, {status: 200});
    } catch (err) {
      return NextResponse.json({message: 'Error', err}, {status: 500});
    } finally {
      //error가 발생해도 finally는 반드시 실행 됨
      await prisma.$disconnect();
    }
  } else if (select === 'singer') {
    try {
      const posts = await prisma.post.findMany({
        take: postCount, // 가져올 데이터 개수
        skip: skip, // 건너뛸 데이터 개수
        where: {
          OR: [
            {
              kosinger: {
                contains: search,
                mode: 'insensitive',
              },
            },
            {
              jpsinger: {
                contains: search,
                mode: 'insensitive',
              },
            },
          ],
        },
        orderBy: {
          date: 'desc', // 날짜 기준 내림차순 정렬
        },
      });
      return NextResponse.json({message: 'Success', posts}, {status: 200});
    } catch (err) {
      return NextResponse.json({message: 'Error', err}, {status: 500});
    } finally {
      //error가 발생해도 finally는 반드시 실행 됨
      await prisma.$disconnect();
    }
  }
};
