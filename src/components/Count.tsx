export default function Count({
  count,
  setCount,
}: {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div
      className='flex items-center justify-center'
      onClick={() => {
        setCount(count++);
      }}>
      <button className='w-10 h-10 text-2xl bg-gray-100'>+</button>
      <div className='text-center text-2xl'>{count}</div>
    </div>
  );
}
