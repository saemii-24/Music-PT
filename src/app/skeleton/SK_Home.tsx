export default function SK_Home() {
  return (
    <main className='flex-1 animate-pulse bg-music-background'>
      <div className='container py-20'>
        <div className='mt-5 h-[84px] w-[400px] rounded-md   bg-music-skeleton sm:mt-10 sm:h-[102px] '></div>

        <div className='grid grid-cols-1 justify-between gap-x-20 gap-y-10 lg:grid-cols-2 xl:grid-cols-3'>
          {Array.from({length: 3}, (_, index) => {
            return (
              <div
                key={index}
                className='mt-20 h-[395px] w-full  overflow-hidden rounded-lg bg-music-skeleton shadow-sm'></div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
