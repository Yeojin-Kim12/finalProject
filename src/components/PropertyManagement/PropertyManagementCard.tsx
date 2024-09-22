import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import ItemCard from '../common/ItemCard';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { BASE_URL } from '@/lib/constants';

const PropertyManagementCard = () => {
  const [currentPage, setCurrentPage] = React.useState(0);

  const fetchPropertyCard = async (page: number) => {
    const res = await axios.get(`${BASE_URL}/api/admin/my-properties/card`, {
      params: {
        page: page,
        size: 4,
      },
      withCredentials: true,
    });
    return res.data;
  };

  const { data } = useQuery({
    queryKey: ['propertyCard', currentPage],
    queryFn: () => fetchPropertyCard(currentPage),
  });
  // TODO: 데이터가 없을 때 표시 교체할 것.
  if (!data) {
    return <div>No data available</div>;
  }
  const totalPages = data?.totalPages;
  const handlePrevPage = () => {
    if (currentPage !== 0) {
      setCurrentPage(currentPage - 1);
    } else setCurrentPage(totalPages - 1);
  };
  const handleNextPage = () => {
    if (currentPage !== totalPages - 1) {
      setCurrentPage(currentPage + 1);
    } else setCurrentPage(0);
  };

  return (
    <section className="w-full flex flex-col items-center gap-5">
      <div className="relative w-[1290px] flex items-center gap-6">
        <div className="swiper-button-prev h-full pl-3 cursor-pointer" onClick={handlePrevPage}>
          <CaretLeft size={24} weight="bold" className="text-static-default hover:text-assistive-strong" />
        </div>
        <Swiper
          effect={'slide'}
          modules={[Navigation]}
          grabCursor
          initialSlide={4}
          speed={500}
          slidesPerView={4} // 한 번에 4개의 슬라이드
          slidesPerGroup={4}
          navigation={{
            // 네비게이션 설정
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          onSlideChange={(swiper) => {
            const newIndex = swiper.activeIndex / 4;
            setCurrentPage(newIndex);
          }}
          className="flex items-center">
          {data?.contents?.map((item: any) => (
            <SwiperSlide key={item.id}>
              {item.id}
              <ItemCard
                size="default"
                id={item.id}
                title={item.name}
                imageUrl={item.imageUrl}
                address={`${item.addrDo} ${item.addrGu}`}
                status={item.pending}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="swiper-button-next pr-3 cursor-pointer" onClick={handleNextPage}>
          <CaretRight size={24} weight="bold" className="text-static-default hover:text-assistive-strong" />
        </div>
      </div>
      <div className="flex gap-3 cursor-pointer">
        {Array.from({ length: totalPages }).map((_, index) => (
          <span
            key={index}
            className={`swiper-pagination-bullet ${
              index === currentPage ? 'swiper-pagination-bullet-active' : ''
            }`}
            onClick={() => setCurrentPage(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default PropertyManagementCard;
