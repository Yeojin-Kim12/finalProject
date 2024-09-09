import DefaultPagination from '@/components/common/DefaultPagination';
import ItemCard from '@/components/common/ItemCard';
import ItemList from '@/components/common/ItemList';
import useResponsive from '@/hooks/useResponsive';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

const Main = () => {
  const { isTablet, isMobile } = useResponsive();
  const [currentPage, setCurrentPage] = useState(1);

  const fetchProperties = async (page: any) => {
    const res = await axios.get(`/api/common/home?page=${page}`);
    return res.data;
  };

  const { data } = useQuery({
    queryKey: ['properties', currentPage],
    queryFn: () => fetchProperties({ page: currentPage }),
  });

  const totalPages = data?.totalPages || 1;

  return (
    <div>
      <div>{/* swiper */}</div>
      <div className="w-[1200px] h-full m-auto">
        <div>
          <div>{/* 검색 */}</div>
          <div>{/* 혜택/주변 */}</div>
          <div>{/* 매물등록 */}</div>
        </div>
        <div>
          {/* 테블릿 버전 list 크기 이상 문제 해결하기 */}
          {data?.content?.properties.length > 0 && (
            <div className="flex flex-col gap-6 mb-12 tablet:mb-11 mobile:mb-9">
              <div>
                <h1 className="text-title-2xl mobile:text-title-lg-m font-bold">전국 미분양 매물 TOP 20</h1>
                <p className="text-detail-lg mobile:text-detail-base-m">
                  표시되는 가격은 최소 평형 최저가입니다
                </p>
              </div>
              {data?.content?.properties.map((property: any, index: any) => {
                const commonProps = {
                  imageUrl: property.image_url,
                  title: property.property_name,
                  address: property.area_addr,
                  propertyType: property.property_type,
                  salesType: property.sales_type,
                  totalNumber: property.total_number,
                  keywords: property.keywords,
                  price: property.price,
                  discountPrice: property.discount_price,
                  like: property.like,
                  rank: index + 1 + (currentPage - 1) * 5,
                };

                return isMobile ? (
                  <ItemCard key={property.id} size="s" {...commonProps} />
                ) : (
                  <ItemList key={property.id} size={isTablet ? 'm' : 'l'} {...commonProps} />
                );
              })}
            </div>
          )}
          <DefaultPagination totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
      </div>
    </div>
  );
};

export default Main;
