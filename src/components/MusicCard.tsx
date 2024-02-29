'use client';
import Image from 'next/image';
import {FaHeart} from 'react-icons/fa6';
import {BsTranslate} from 'react-icons/bs';

export default function MusicCard() {
  return (
    <div className='mt-20 w-[350px] overflow-hidden rounded-lg bg-white '>
      <Image
        priority={true}
        src='/default_card.png'
        alt='프로필 이미지'
        width={350}
        height={230}
      />
      <div>
        {/* 카드 윗 줄 */}
        <div>
          <div>ko</div>
          <div>jo</div>
          <p>가수가 들어갑니다</p>
        </div>
        {/* 카드 제목 */}
        <h1>제목이 들어갑니다.</h1>
      </div>
      {/* 작성자 좋아요 */}
      <div>
        <BsTranslate />
        <div>작성자</div>
      </div>
      <div>
        <FaHeart />
        <div>32</div>
      </div>
    </div>
  );
}
