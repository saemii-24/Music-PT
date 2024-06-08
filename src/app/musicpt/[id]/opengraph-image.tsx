/* eslint-disable @next/next/no-img-element */

import {ImageResponse} from 'next/og';
import ogImage from '../opengraph-image.jpg';

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
    // const {data}: any = await axios.get(
    //   `https://music-pt.vercel.app/api/music/${id}`,
    // );
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

  // const font = await fetch(
  //   new URL(
  //     '../../assets/fonts/NotoSansKR-SemiBold-Subset.woff',
  //     import.meta.url,
  //   ),
  // ).then((res) => res.arrayBuffer());

  if (thumbnail) {
    return new ImageResponse(
      (
        <div tw='h-full w-full flex flex-column'>
          <img
            style={{objectFit: 'cover'}}
            tw='absolute inset-0 w-full h-full'
            src={thumbnail}
            alt='썸네일'
          />
          <div tw='bg-black absolute inset-0 bg-opacity-60'></div>
          <p
            tw='text-center w-full flex justify-center'
            style={{
              color: 'white',
              fontSize: '140px',
              marginTop: '400px',
              textAlign: 'center',
            }}>
            LYRICS
          </p>
        </div>
      ),
      // ImageResponse options
      {
        ...size,
      },
    );
  } else {
    return new ImageResponse(
      (
        <div tw='h-full w-full flex flex-column'>
          <img
            style={{objectFit: 'cover'}}
            tw='absolute inset-0 w-full h-full'
            src={ogImage.src}
            alt='썸네일'
          />
        </div>
      ),
      // ImageResponse options
      {
        ...size,
      },
    );
  }
}
