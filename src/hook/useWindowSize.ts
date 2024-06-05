import {useState, useEffect, useLayoutEffect} from 'react';

type WindowType = {
  width: number | undefined;
  height: number | undefined;
};

function useWindowSize() {
  const [size, setSize] = useState<WindowType>({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  function handleResize() {
    setSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }

  useLayoutEffect(() => {
    // 컴포넌트가 마운트될 때 한 번만 실행
    handleResize();
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}

export default useWindowSize;
