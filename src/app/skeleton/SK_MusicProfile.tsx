export default function MusicProfile() {
  return (
    <section className='animate-pulse dark:bg-music-background'>
      <div className=' container grid grid-cols-4 lg:grid-cols-6 2xl:grid-cols-7 '>
        {/* 이미지 */}
        <div className='lg: relative col-span-4  mr-0 aspect-square overflow-hidden rounded-lg bg-music-skeleton transition after:absolute after:left-0  after:top-0 after:z-10 after:size-full after:bg-black after:opacity-0 after:transition  after:content-[""] lg:col-span-2 lg:row-span-6 lg:mr-10 xl:mr-20'></div>
        {/* 좋아요 */}
        <div className='col-span-4 mb-[0.4rem] mt-5 w-[50px] rounded-md  bg-music-skeleton md:col-span-3 lg:mt-1 xl:mt-5'>
          &nbsp;
        </div>
        <div className='order-first col-span-4 mt-[-2.5rem] flex justify-end lg:order-none lg:col-auto lg:mt-5'>
          <div className='right-0 top-[-100vw] flex items-center justify-center gap-2 md:top-0'></div>
        </div>
        <div className='col-span-4 mb-4  rounded-md bg-music-skeleton text-4xl  font-bold text-black lg:col-span-4 2xl:col-span-5'>
          &nbsp;
        </div>
        <div className='col-span-4 row-span-3 h-[90px] w-full rounded-md bg-music-skeleton leading-7 text-black lg:mt-2 2xl:col-span-5'>
          &nbsp;
        </div>
        <div className='col-span-4 mb-10 mt-5 flex w-[40%] gap-6 rounded-md bg-music-skeleton py-4 lg:col-span-4 2xl:col-span-5 '>
          &nbsp;
        </div>
      </div>
    </section>
  );
}
