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
    const {kothumbnail, jpthumbnail, kotitle, jptitle, kosinger, jpsinger} =
      data.post;

    const thumbnail = kothumbnail
      ? kothumbnail
      : jpthumbnail
        ? jpthumbnail
        : ogImage.src;

    const title = kotitle ? kotitle : jptitle ? jptitle : '';
    const singer = kosinger ? kosinger : jpsinger ? jpsinger : '';

    return {thumbnail, title, singer};
  } catch (err) {
    console.log(err);
    return {thumbnail: '', title: '', singer: ''};
  }
};

// Image generation
export default async function Image({params, searchParams}: Props) {
  const id = Number(params.id);
  const data = await getMusicData(id);
  const {thumbnail, title, singer} = data;

  // const font = await fetch(
  //   new URL(
  //     '../../assets/fonts/NotoSansKR-SemiBold-Subset.woff',
  //     import.meta.url,
  //   ),
  // ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div tw='h-full w-full flex flex-column'>
        <img
          style={{objectFit: 'cover'}}
          tw='absolute inset-0 w-full h-full'
          src={thumbnail}
        />
        <div tw='bg-black absolute inset-0 bg-opacity-60'></div>
        {/* <img src={'../../public/logo.jpg'} /> */}
        {/* <img src='/logo.jpg' alt='Logo' /> */}
        {/* <p tw='font-[140px] color-[#fff]'>LYRICS</p>
        <p >{title}</p> */}
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    },
  );
}
