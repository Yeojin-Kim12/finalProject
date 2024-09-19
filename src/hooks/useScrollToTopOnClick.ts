import { useCallback } from 'react';
import { animateScroll as scroll } from 'react-scroll';

const useScrollToTopOnClick = (duration = 200) => {
  const scrollToTop = useCallback(() => {
    scroll.scrollToTop({
      duration: duration,
      smooth: true,
    });
  }, [duration]);

  return scrollToTop;
};

export default useScrollToTopOnClick;
