import DefaultPagination from '@/components/common/DefaultPagination';
import { InputWithExtras } from '@/components/common/InputWithExtras';
import ItemCard from '@/components/common/ItemCard';
import useResponsive from '@/hooks/useResponsive';
import { MagnifyingGlass } from '@phosphor-icons/react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Search = () => {
  const { isDesktop, isMobile } = useResponsive();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [inputValue, setInputValue] = useState(searchQuery);
  const navigate = useNavigate();
  const size = isDesktop ? 9 : 6;

  // 검색 홈 api 사용하면됨 신청현황의 search로 사용, 똑같이 없으면 보내지 X
  const fetchSearch = async (page: number, size: number, search: string) => {
    const res = await axios.get(`/api/common/properties`, {
      params: {
        page: page,
        size: size,
        ...(search !== '' && { search: search }),
      },
    });
    return res.data;
  };

  const { data } = useQuery({
    queryKey: ['search', currentPage, size, searchQuery],
    queryFn: () => fetchSearch(currentPage, size, searchQuery),
  });
  const totalPages = data?.totalPages || 1;

  const handleSearch = () => {
    setSearchQuery(inputValue);
    setSearchParams({ search: inputValue });
    // setCurrentPage(1);
  };

  return (
    <div className="flex flex-col max-w-[1200px] m-auto tablet:mx-7 mobile:mx-5 gap-9 desktop:gap-11 my-20 mobile:my-[60px]">
      <h1 className="text-heading-lg tablet:text-heading-sm mobile:text-heading-sm-m font-bold text-center">
        검색 결과
      </h1>
      <div className="w-[976px] tablet:w-[677px] mobile:w-[328px] m-auto">
        <InputWithExtras
          type="text"
          placeholder="어떤 미분양 매물을 찾으세요?"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
          className={`w-full px-7 py-4 ${isDesktop ? 'px-9 py-7 text-label-lg' : 'text-label-base'} mobile:text-label-base-m border-2 border-primary-default rounded-10 focus:border-2 focus:border-primary-default focus:shadow-default`}
          trailingExtra={
            <MagnifyingGlass
              size={isDesktop ? 32 : 24}
              weight="thin"
              className="text-primary-default cursor-pointer"
              onClick={handleSearch}
            />
          }
        />
      </div>

      <div>
        <p className="text-detail-lg mobile:text-detail-base-m text-assistive-strong my-4">
          총 <span className="text-primary-default">{data?.content?.properties.length}</span>건의 검색 결과가
          있어요
        </p>
        {data?.content?.properties.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[676px] tablet:h-[600px] mobile:h-[400px]">
            <div className="flex items-center justify-center w-[120px] h-[120px] mobile:w-[96px] mobile:h-[96px] bg-primary-base rounded-10 mb-9">
              <MagnifyingGlass size={isMobile ? 48 : 80} weight="thin" className="text-primary-strong" />
            </div>
            <div className="text-center">
              <p className="text-title-2x mobile:text-title-lg-m font-bold mb-4">
                찾으시는 미분양 매물이 없어요
              </p>
              <p className="text-body-lg  mobile:text-body-sm-m">
                다양한 미분양 매물은{' '}
                <span className="text-primary-default cursor-pointer" onClick={() => navigate('/')}>
                  미분양 정보
                </span>
                에서 확인하실 수 있어요
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-11 mobile:gap-9">
            <div className="grid grid-cols-3 tablet:grid-cols-2 mobile:grid-cols-1 gap-6 mobile:gap-4 mt-6">
              {data?.content?.properties.map((property: any, index: any) => (
                <div className="flex flex-col items-center">
                  <ItemCard
                    key={index}
                    id={property.id}
                    size={isMobile ? 's' : 'l'}
                    imageUrl={property.image_url}
                    title={property.property_name}
                    address={property.area_addr}
                    propertyType={property.property_type}
                    salesType={property.sales_type}
                    totalNumber={property.total_number}
                    keywords={property.keywords}
                    price={property.price}
                    discountPrice={property.discount_price}
                    like={property.like}
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
    </div>
  );
};

export default Search;
