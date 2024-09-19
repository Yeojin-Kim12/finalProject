import React from 'react';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';
import useResponsive from '@/hooks/useResponsive';

interface BannerSwiperProps {
  data: string[];
}
const BannerSwiper = ({ data }: BannerSwiperProps) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [swiperKey, setSwiperKey] = React.useState(0);
  const { isMobile } = useResponsive();

  React.useEffect(() => {
    setSwiperKey((prevKey) => prevKey + 1);
  }, [isMobile]);

  const handleSlideChange = (swiper: SwiperClass): void => {
    setActiveIndex(swiper.realIndex);
  };

  return (
    <div className="flex justify-center w-full gap-3 mobile:pl-5">
      {isMobile ? (
        <>
          <Swiper
            key={`mobile-${swiperKey}`}
            modules={[Pagination, Autoplay]}
            effect={'slide'}
            grabCursor
            initialSlide={2}
            loop={true}
            speed={1000}
            slidesPerView={1.05}
            autoplay={{
              delay: 5000,
            }}
            pagination={{
              el: '.swiper-pagination',
              clickable: true,
            }}
            onSlideChange={handleSlideChange}
            className="swiper_container relative transition-all duration-500 flex items-center w-full pb-7 ">
            {data.map((image, index) => {
              return (
                <SwiperSlide key={index} className="relative transition-all duration-500 pr-8">
                  <div className="overflow-hidden rounded-8">
                    <img
                      src={image}
                      alt={`Slide ${index + 1}`}
                      className={`w-full rounded-8 transition-all duration-500`}
                    />
                  </div>
                </SwiperSlide>
              );
            })}
            <div className="swiper-pagination"></div>
          </Swiper>
        </>
      ) : (
        <Swiper
          key={`mobile-${swiperKey}`}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          effect={'coverflow'}
          grabCursor
          centeredSlides
          initialSlide={3}
          loop={true}
          speed={1000}
          slidesPerView={2}
          coverflowEffect={{
            rotate: 0,
            stretch: 140,
            depth: 400,
            modifier: 1,
            slideShadows: false,
          }}
          autoplay={{
            delay: 5000,
          }}
          pagination={{
            el: '.swiper-pagination',
            clickable: true,
          }}
          onSlideChange={handleSlideChange}
          className="swiper_container relative transition-all duration-500 flex items-center w-[88%] max-w-[1680px]  ">
          {data.map((image, index) => {
            const isStart = activeIndex === data.length - 1 && index === 0;
            const isLast = activeIndex === 0 && index === data.length - 1;
            const isActive = index === activeIndex;
            const isPrev = index === activeIndex - 1;
            const isNext = index === activeIndex + 1;
            return (
              <SwiperSlide
                key={index}
                className={`relative w-[57%]  mobile:w-full ${
                  isStart || isLast || isActive || isPrev || isNext ? 'opacity-100' : 'opacity-0'
                }`}>
                <div className="overflow-hidden rounded-8">
                  <img
                    src={image}
                    alt={`Slide ${index + 1}`}
                    className={`w-full rounded-8 transition-all duration-500 ${index !== activeIndex && 'blur'}`}
                  />
                </div>
                {index === activeIndex && (
                  <div className="absolute bottom-[7%] right-[4%] flex justify-center items-center px-[1.25vw] py-[0.4vw] bg-effect-elevated rounded-9">
                    <div className="flex text-[1vw] gap-[0.4vw] text-assistive-base">
                      <span className="font-bold">{activeIndex + 1}</span>
                      <span>/</span>
                      <span>{data.length}</span>
                    </div>
                  </div>
                )}
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </div>
  );
};

export default BannerSwiper;
