export default function SK_MusicCard() {
  return (
    <div className='mt-20 w-full animate-pulse overflow-hidden rounded-lg bg-music-skeleton shadow-sm'>
      <div className=' aspect-[8/5] w-full cursor-pointer overflow-hidden '></div>
      <div className='h-[150px] p-5'>
        {/* 카드 윗 줄 */}
        <div className='flex items-center'>
          <p className='font-medium text-black'>&nbsp;</p>
          <div className='relative ml-auto '></div>
        </div>
        {/* 카드 제목 */}
        <h1 className='mt-2 text-2xl font-medium text-black'>&nbsp;</h1>
      </div>
      {/* 작성자 좋아요 */}
      <div className='flex px-5 py-3'>
        <div className='flex items-center gap-1'>
          <div></div>
          <div className='text-sm text-black '>&nbsp;</div>
        </div>
        <div className='ml-auto flex items-center gap-1 text-sm'></div>
      </div>
    </div>
  );
}
