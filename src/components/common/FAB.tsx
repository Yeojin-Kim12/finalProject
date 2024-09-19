import useResponsive from '@/hooks/useResponsive';
import useScrollToTopOnClick from '@/hooks/useScrollToTopOnClick';
import { useEffect, useState } from 'react';

const FAB = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { isMobile } = useResponsive();
  const scrollToTop = useScrollToTopOnClick();
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 2000) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {!isMobile && (
        <button
          className={`${
            isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
          } transition-opacity duration-300 w-11 h-11 fixed bottom-[56px] right-[56px] bg-static-white text-assistive-strong p-5 rounded-10 border border-assistive-default drop-shadow-fab`}
          onClick={() => scrollToTop()}>
          <svg viewBox="0 0 48 49" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M40.5918 31.9253C40.3828 32.135 40.1344 32.3015 39.8609 32.415C39.5874 32.5286 39.2942 32.587 38.998 32.587C38.7019 32.587 38.4087 32.5286 38.1352 32.415C37.8617 32.3015 37.6133 32.135 37.4043 31.9253L23.9999 18.5209L10.5918 31.9253C10.1691 32.348 9.59582 32.5854 8.99804 32.5854C8.40027 32.5854 7.82698 32.348 7.40429 31.9253C6.9816 31.5026 6.74414 30.9293 6.74414 30.3315C6.74414 29.7337 6.98161 29.1605 7.40429 28.7378L22.4043 13.7378C22.6133 13.528 22.8617 13.3616 23.1352 13.248C23.4087 13.1344 23.7019 13.076 23.998 13.076C24.2942 13.076 24.5874 13.1344 24.8609 13.248C25.1344 13.3616 25.3828 13.528 25.5918 13.7378L40.5918 28.7378C40.8016 28.9468 40.968 29.1952 41.0815 29.4687C41.1951 29.7422 41.2536 30.0354 41.2536 30.3315C41.2536 30.6276 41.1951 30.9209 41.0815 31.1944C40.968 31.4678 40.8016 31.7162 40.5918 31.9253Z"
              fill="currentColor"
            />
          </svg>
        </button>
      )}
    </>
  );
};

export default FAB;
