import SkeletonSwiper from '@/components/Main/SkeletonSwiper';
import DefaultPagination from '@/components/common/DefaultPagination';
import ItemCard from '@/components/common/ItemCard';
import ItemList from '@/components/common/ItemList';
import { Button } from '@/components/ui/button';
import BannerSwiper from '@/components/Main/BannerSwiper';
import useResponsive from '@/hooks/useResponsive';
import { BASE_URL } from '@/lib/constants';
import { CaretRight, MagnifyingGlass } from '@phosphor-icons/react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '@/components/common/SearchBar';
import { useRecoilValue } from 'recoil';
import { loginState } from '@/recoilstate/login/atoms';
import SkeletonPropertyList from '@/components/Main/SkeletonPropertyList';
import { Link } from 'react-scroll';

const Main = () => {
  const { isDesktop, isTablet, isMobile } = useResponsive();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const { isLoggedIn, userInfo } = useRecoilValue(loginState);
  const navigate = useNavigate();

  const fetchProperties = async (page: any) => {
    const res = await axios.get(`${BASE_URL}/api/common/home`, {
      params: {
        page,
      },
      withCredentials: true,
    });
    console.log(res.data);

    return res.data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ['properties', currentPage],
    queryFn: () => fetchProperties(currentPage - 1),
    staleTime: 600000,
    gcTime: 900000,
    refetchOnWindowFocus: false,
  });

  const totalPages = data?.totalPages || 1;

  const handleAdd = async () => {
    if (isLoggedIn) {
      if (userInfo?.role === 'ADMIN') {
        navigate('/property-add');
      } else if (userInfo?.role === 'MEMBER') {
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="py-12 mobile:py-9">
      <div className="mb-9">
        {isLoading ? (
          <SkeletonSwiper />
        ) : (
          data?.contents[0]?.homeImagesUrl.length > 0 && (
            <BannerSwiper data={data?.contents[0]?.homeImagesUrl} />
          )
        )}
      </div>
      <div className="max-w-[1200px] h-full m-auto tablet:mx-7 mobile:mx-5">
        <div className="flex flex-col items-center gap-9 desktop:gap-11 mb-9 tablet:mb-11">
          <div className="w-[976px] tablet:w-[677px] mobile:w-[328px]">
            <SearchBar
              type="text"
              placeholder="어떤 미분양 매물을 찾으세요?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  navigate(`/search?search=${searchQuery}`);
                }
              }}
              className={`w-full px-7 py-4 ${isDesktop ? 'px-9 py-7 text-label-lg' : 'text-label-base'} mobile:text-label-base-m border-2 border-primary-default rounded-10 focus:border-2 focus:border-primary-default focus:shadow-default`}
              trailingExtra={
                <MagnifyingGlass
                  size={isDesktop ? 32 : 24}
                  weight="bold"
                  className="text-primary-default cursor-pointer"
                  onClick={() => navigate(`/search?search=${searchQuery}`)}
                />
              }
            />
          </div>
          <div className="flex gap-10 tablet:gap-6 mobile:gap-3">
            <div
              className="flex mobile:block w-[531px] h-[260px] tablet:w-[328px] tablet:h-[146px] mobile:w-[160px] mobile:h-[167px] p-7 desktop:px-[58px] desktop:py-[52px] mobile:px-5 rounded-7 desktop:rounded-9 shadow-[0_0_20px_0] shadow-effect-shadow cursor-pointer"
              onClick={() => navigate('/property', { state: { keyword: 'benefit' } })}>
              <div className="grow">
                <div className="mb-3 desktop:mb-5 mobile:text-center">
                  <span className="text-body-lg tablet:text-body-sm mobile:text-body-sm-m font-bold text-accent-strong">
                    할인혜택
                  </span>
                  <p className="text-heading-base tablet:text-title-lg mobile:text-label-lg-m font-bold">
                    혜택 줍줍
                  </p>
                </div>
                <div className="mobile:hidden text-body-lg tablet:text-detail-sm text-assistive-strong">
                  <p>할인 분양부터 옵션 제공까지</p>
                  <p>미분양 혜택의 모든 것!</p>
                </div>
              </div>
              <div className="flex grow items-end justify-end mobile:justify-center">
                <img
                  src="/images/benefitImage.png"
                  alt="benefitImage"
                  className="w-[137px] h-[131px] tablet:w-[91px] tablet:h-[87px] mobile:w-[70px] mobile:h-[66px]"
                />
              </div>
            </div>
            <div
              className="flex mobile:block w-[531px] h-[260px] px-[58px] tablet:w-[328px] tablet:h-[146px] mobile:w-[160px] mobile:h-[167px] py-[37px] tablet:p-7 mobile:px-5 mobile:py-7 rounded-7 desktop:rounded-9 shadow-[0_0_20px_0] shadow-effect-shadow cursor-pointer"
              onClick={() => navigate('/property', { state: { keyword: 'infra' } })}>
              <div className="grow">
                <div className="mb-3 desktop:mb-5 mobile:text-center">
                  <span className="text-body-lg tablet:text-body-sm mobile:text-body-sm-m font-bold text-primary-default">
                    편의시설
                  </span>
                  <p className="text-heading-base tablet:text-title-lg mobile:text-label-lg-m font-bold">
                    주변 핵심 체크
                  </p>
                </div>
                <div className="mobile:hidden text-body-lg tablet:text-detail-sm text-assistive-strong">
                  <p>놓치기 쉬운 주변 정보를</p>
                  <p>키워드로 한눈에!</p>
                </div>
              </div>
              <div className="flex grow items-end justify-end mobile:justify-center">
                <img
                  src="/images/infraImage.png"
                  alt="benefitImage"
                  className="w-[107px] h-[130px] tablet:w-[68px] tablet:h-[81px] mobile:w-[54px] mobile:h-[64px]"
                />
              </div>
            </div>
          </div>
          <div className="mobile:block flex w-full h-[162px] mobile:h-[137px] px-[44px] py-[22px] bg-assistive-base rounded-6 desktop:rounded-4">
            <div className="flex flex-col justify-center mobile:items-center w-full ml-6 mobile:ml-0 mobile:mb-4">
              <p className="text-title-xl mobile:text-label-lg-m font-bold">
                미분양 매물을 간편하게 등록하고 싶다면?
              </p>
              <p className="text-body-base mobile:text-label-sm-m mt-3 mobile:mt-0">
                매물 관리부터 고객 관리까지 한번에
              </p>
            </div>
            <div className="flex items-end justify-end mobile:justify-center">
              <Button
                variant="assistive"
                size={`${isMobile ? 'sm' : 'md'}`}
                className="!text-assistive-strong"
                onClick={handleAdd}>
                매물 등록하기
                <CaretRight size={isMobile ? 16 : 24} className="ml-[10px]" />
              </Button>
            </div>
          </div>
        </div>
        {isLoading ? (
          <SkeletonPropertyList />
        ) : (
          Array.isArray(data?.contents[0]?.properties) &&
          data.contents[0].properties.length !== 0 && (
            <div className="">
              <div className="mb-12 tablet:mb-11 mobile:mb-9">
                <div id="list" className="mb-6 mobile:mb-9">
                  <h1 className="text-title-2xl mobile:text-title-lg-m font-bold">전국 미분양 매물 TOP 20</h1>
                  <p className="text-detail-lg mobile:text-detail-base-m">
                    표시되는 가격은 최소 평형 최저가입니다
                  </p>
                </div>
                <div className="flex flex-col gap-6 items-center">
                  {data.contents[0].properties.map((property: any, index: any) => {
                    const commonProps = {
                      id: property.id,
                      imageUrl: property.imageUrl,
                      title: property.propertyName,
                      address: property.areaAddr,
                      propertyType: property.propertyType,
                      salesType: property.salesType,
                      totalNumber: property.totalNumber,
                      infra: property.infra,
                      benefit: property.benefit,
                      keywords: property.keywords,
                      price: property.price,
                      discountPrice: property.discountPrice,
                      discountPercent: property.discountPercent,
                      like: property.like,
                      onLikeToggle: () => property.id,
                      rank: index + 1 + (currentPage - 1) * 5,
                    };
                    return isMobile ? (
                      <ItemCard key={property.id} size="s" {...commonProps} />
                    ) : (
                      <ItemList key={property.id} size={isTablet ? 'm' : 'l'} {...commonProps} />
                    );
                  })}
                </div>
              </div>
              <Link to="list" spy={true} smooth={true} duration={300}>
                <DefaultPagination
                  totalPages={totalPages}
                  currentPage={currentPage}
                  onPageChange={setCurrentPage}
                />
              </Link>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Main;
