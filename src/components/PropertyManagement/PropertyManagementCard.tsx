import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import React from 'react';
import ItemCard from '../common/ItemCard';
import axios from 'axios';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { BASE_URL } from '@/lib/constants';
import SkeletonCard from './SkeletonCard';
import { getAuthHeaders } from '@/utils/auth';
import { Link } from 'react-router-dom';
import NoProperty from '../CustomerService/NoProperty';

const PropertyManagementCard = () => {
  const [currentPage, setCurrentPage] = React.useState(0);

  const fetchPropertyCard = async (page: number) => {
    const res = await axios.get(`${BASE_URL}/api/admin/my-properties/card`, {
      params: {
        page: page,
        size: 4,
      },
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      withCredentials: true,
    });
    return res.data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ['propertyCard', currentPage],
    queryFn: () => fetchPropertyCard(currentPage),
    placeholderData: keepPreviousData,
  });
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
      {isLoading ? (
        <SkeletonCard />
      ) : data && data?.totalCount === 0 ? (
        <NoProperty />
      ) : (
        <>
          <div className="relative w-full flex justify-center items-center gap-6">
            <div
              className="absolute inset-y-0 h-full flex items-center -left-10 cursor-pointer"
              onClick={handlePrevPage}>
              <CaretLeft
                size={24}
                weight="bold"
                className="text-static-default hover:text-assistive-strong"
              />
            </div>
            <div className="flex w-full">
              {data?.contents?.map((item: any) => (
                <Link to={`/property/${item.id}`} key={item.id}>
                  <ItemCard
                    size="default"
                    id={item.id}
                    title={item.name}
                    imageUrl={item.imageUrl}
                    address={`${item.addrDo} ${item.addrGu}`}
                    status={item.pending}
                  />
                </Link>
              ))}
            </div>

            <div
              className="absolute inset-y-0 h-full flex items-center -right-10 cursor-pointer"
              onClick={handleNextPage}>
              <CaretRight
                size={24}
                weight="bold"
                className="text-static-default hover:text-assistive-strong"
              />
            </div>
          </div>
          <div className="flex gap-3 cursor-pointer">
            {Array.from({ length: totalPages }).map((_, index) => (
              <span
                key={`pagination-${index}`}
                className={`swiper-pagination-bullet ${
                  index === currentPage ? 'swiper-pagination-bullet-active' : ''
                }`}
                onClick={() => setCurrentPage(index)}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default PropertyManagementCard;
