import {withAuth} from 'next-auth/middleware';

// export async function middleware(req: NextRequest) {
//   const session = await getSession();

//   const cookieStore = cookies();
//   const cookie = cookieStore.get('next-auth.session-token');

//   if (!cookie) {
//     return NextResponse.redirect(new URL('/login', req.url));
//   }
// }

export const config = {
  matcher: ['/mypage', '/addmusic'],
};

export default withAuth({
  // Matches the pages config in `[...nextauth]`
  pages: {
    signIn: '/login',
  },
});
