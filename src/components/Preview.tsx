import Image from 'next/image';
import React, {useState} from 'react';

export default function Preview({image}: {image: string | null | undefined}) {
  return (
    <div className='mx-auto size-[3rem] overflow-hidden rounded-[100rem] border-2 border-music-blue'>
      {image && (
        <Image
          src={image}
          alt='앨범 이미지 프리뷰'
          width={50}
          height={50}
          priority={true}
          style={{objectFit: 'cover', width: '3rem', height: '3rem'}}
        />
      )}
    </div>
  );
}
