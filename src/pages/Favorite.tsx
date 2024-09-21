import Breadcrumb from '@/components/common/Breadcrumb';
import DefaultPagination from '@/components/common/DefaultPagination';
import ItemCard from '@/components/common/ItemCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useResponsive from '@/hooks/useResponsive';
import { BASE_URL } from '@/lib/constants';
import { Heart } from '@phosphor-icons/react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Favorite = () => {
  const { isDesktop, isMobile } = useResponsive();
  const [currentPage, setCurrentPage] = useState(1);
  const [recruitmentStatus, setRecruitmentStatus] = useState('open');
  const size = isDesktop ? 9 : 6;

  const fetchFavorites = async (page: number, size: number) => {
    const res = await axios.get(`${BASE_URL}/api/member/my-favorites`, {
      params: {
        status: recruitmentStatus,
        page: page,
        size: size,
      },
      withCredentials: true,
    });
    console.log(res.data);

    return res.data;
  };

  const { data, refetch } = useQuery({
    queryKey: ['favorites', currentPage, size, recruitmentStatus],
    queryFn: () => fetchFavorites(currentPage - 1, size),
  });
  const totalPages = data?.totalPages || 1;

  const renderContent = () => {
    return (
      <div>
        <p className="text-detail-lg mobile:text-detail-base-m text-assistive-strong my-4">
          총{' '}
          <span className="text-primary-default">
            {data?.favoriteNumber !== undefined ? data?.favoriteNumber : 0}
          </span>
          건의 검색 결과가 있어요
        </p>
        {Array.isArray(data?.properties) && data?.properties.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[676px] tablet:h-[600px] mobile:h-[400px]">
            <div className="flex items-center justify-center w-[120px] h-[120px] mobile:w-[96px] mobile:h-[96px] bg-primary-base rounded-10 mb-9">
              <Heart size={isMobile ? 48 : 80} weight="fill" className="text-primary-strong" />
            </div>
            <div className="text-center">
              <p className="text-title-2xl mobile:text-title-lg-m font-bold mb-4">
                아직 마음에 드는 매물을 담지 않았어요!
              </p>
              <p className="text-body-lg mobile:text-body-sm-m mb-10">
                전국 인기 미분양 TOP 20부터 둘러보러 가볼까요?
              </p>
              <Link to="/">
                <Button size={isMobile ? 'sm' : 'xl'} variant="outline">
                  인기 매물 보러가기
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-11 mobile:gap-9">
            <div className="grid grid-cols-3 tablet:grid-cols-2 mobile:grid-cols-1 gap-6 mobile:gap-4 mt-6">
              {data?.properties.map((property: any, index: any) => (
                <div className="flex flex-col items-center">
                  <ItemCard
                    key={index}
                    id={property.id}
                    size={isMobile ? 's' : 'l'}
                    imageUrl={property.imageUrl}
                    title={property.name}
                    address={property.areAaddr}
                    propertyType={property.propertyType}
                    salesType={property.salesType}
                    totalNumber={property.count}
                    infra={property.infra}
                    benefit={property.benefit}
                    price={property.price}
                    discountPrice={property.salesPrice}
                    like={true}
                    onLikeToggle={refetch} // like상태 변경 시 다시 가져오기
                  />
                </div>
              ))}
            </div>
            <DefaultPagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col max-w-[1200px] m-auto tablet:mx-7 mobile:mx-5 mb-20 tablet:my-20 mobile:my-9">
      {isDesktop && <Breadcrumb links={['마이페이지', '관심 매물']} />}
      <h1 className="text-heading-lg tablet:text-heading-sm mobile:text-heading-sm-m font-bold text-center mb-11 mobile:mb-9">
        관심 매물
      </h1>

      <Tabs
        defaultValue={'open'}
        onValueChange={(value) => {
          setRecruitmentStatus(value);
          setCurrentPage(1);
        }}>
        <TabsList className="mb-9 mobile:mb-6">
          <TabsTrigger value="open">모집중</TabsTrigger>
          <TabsTrigger value="closed">모집 완료</TabsTrigger>
        </TabsList>
        <TabsContent value="open">{renderContent()}</TabsContent>
        <TabsContent value="closed">{renderContent()}</TabsContent>
      </Tabs>
    </div>
  );
};

export default Favorite;
