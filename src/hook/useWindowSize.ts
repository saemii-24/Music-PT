import {useState, useEffect} from 'react';

type WindowType = {
  width: number | undefined;
  height: number | undefined;
};

function useWindowSize() {
  const [size, setSize] = useState<WindowType>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}

export default useWindowSize;
