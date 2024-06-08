/* eslint-disable @next/next/no-img-element */

import {ImageResponse} from 'next/og';
export const runtime = 'edge';

// Image metadata
export const size = {
  width: 1200,
  height: 1200,
};

export const contentType = 'image/jpg';

type Props = {
  params: {id: string};
  searchParams: {[key: string]: string | string[] | undefined};
};

const getMusicData = async (id: number) => {
  try {
    const res = await fetch(`https://music-pt.vercel.app/api/music/${id}`);
    const data = await res.json();
    const {kothumbnail, jpthumbnail} = data.post;

    const thumbnail = kothumbnail
      ? kothumbnail
      : jpthumbnail
        ? jpthumbnail
        : null;

    return {thumbnail};
  } catch (err) {
    console.log(err);
    return {thumbnail: null};
  }
};

// Image generation
export default async function Image({params, searchParams}: Props) {
  const id = Number(params.id);
  const data = await getMusicData(id);
  const {thumbnail} = data;

  const font = await fetch(
    new URL('../../../assets/fonts/NotoSans-OG-Black.woff', import.meta.url),
  ).then((res) => res.arrayBuffer());

  if (thumbnail) {
    return new ImageResponse(
      (
        <div tw='h-full w-full flex flex-col'>
          <img
            style={{objectFit: 'cover'}}
            tw='absolute inset-0 w-full h-full'
            src={thumbnail}
            alt='썸네일'
          />
          <div tw='bg-black absolute inset-0 bg-opacity-60'></div>
          <div tw='flex w-full justify-center mt-[464px]'>
            <svg
              width='72'
              height='56'
              viewBox='0 0 72 56'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M59.8992 30.1864C59.9142 29.8352 59.9218 29.4821 59.9218 29.1272C59.9218 15.6463 48.9933 4.71784 35.5124 4.71784C22.0314 4.71784 11.103 15.6463 11.103 29.1272C11.103 29.4821 11.1105 29.8352 11.1255 30.1864H6.40403C6.39147 29.8349 6.38513 29.4818 6.38513 29.1272C6.38513 13.0407 19.4258 0 35.5124 0C51.5989 0 64.6396 13.0407 64.6396 29.1272C64.6396 29.4818 64.6333 29.8349 64.6207 30.1864H59.8992Z'
                fill='white'
              />
              <path
                d='M15.981 39.0656C15.981 45.6058 15.981 51.2284 15.981 53.7021C15.981 54.4466 15.3754 55.0526 14.6336 54.9907C6.43808 54.3065 0 47.4379 0 39.0656C0 30.6934 6.43808 23.8248 14.6336 23.1406C15.3754 23.0787 15.981 23.6847 15.981 24.4291C15.981 26.9028 15.981 32.5254 15.981 39.0656Z'
                fill='white'
              />
              <rect
                x='17.7573'
                y='23.0825'
                width='4.73512'
                height='31.9621'
                rx='2.36756'
                fill='white'
              />
              <path
                d='M55.1077 39.0635C55.1077 32.5233 55.1077 26.9007 55.1077 24.427C55.1077 23.6826 55.7133 23.0766 56.4552 23.1385C64.6507 23.8227 71.0887 30.6913 71.0887 39.0635C71.0887 47.4358 64.6507 54.3044 56.4552 54.9886C55.7133 55.0505 55.1077 54.4445 55.1077 53.7001C55.1077 51.2263 55.1077 45.6037 55.1077 39.0635Z'
                fill='white'
              />
              <path
                d='M53.2708 52.677C53.2708 53.9846 52.2108 55.0446 50.9032 55.0446C49.5956 55.0446 48.5356 53.9846 48.5356 52.677L48.5356 25.4501C48.5356 24.1425 49.5956 23.0825 50.9032 23.0825C52.2108 23.0825 53.2708 24.1425 53.2708 25.4501L53.2708 52.677Z'
                fill='white'
              />
            </svg>
          </div>

          <p
            tw='text-center w-full flex justify-center'
            style={{
              fontFamily: 'NotoSansKR-OG-Black',
              color: 'white',
              fontSize: '140px',
              marginTop: '-30px',
              letterSpacing: '-3px',
            }}>
            LYRICS
          </p>
        </div>
      ),
      // ImageResponse options
      {
        ...size,
        fonts: [
          {
            name: 'NotoSans-OG-Black',
            data: font,
            weight: 900,
          },
        ],
      },
    );
  }
}
