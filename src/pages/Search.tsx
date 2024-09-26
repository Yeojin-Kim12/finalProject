import DefaultPagination from '@/components/common/DefaultPagination';

import ItemCard from '@/components/common/ItemCard';
import SearchBar from '@/components/common/SearchBar';
import useResponsive from '@/hooks/useResponsive';
import { BASE_URL } from '@/lib/constants';
import { loginState } from '@/recoilstate/login/atoms';
import { MagnifyingGlass } from '@phosphor-icons/react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { getAuthHeaders } from '@/utils/auth';

const Search = () => {
  const { isDesktop, isMobile } = useResponsive();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [inputValue, setInputValue] = useState(searchQuery);
  const navigate = useNavigate();
  const size = isDesktop ? 9 : 6;
  const [loginData] = useRecoilState(loginState);

  const fetchSearch = async (page: number, size: number, search: string) => {
    const url =
      loginData.userInfo?.role === 'MEMBER'
        ? `${BASE_URL}/api/member/properties`
        : `${BASE_URL}/api/common/properties`;
    const res = await axios.get(url, {
      params: {
        page: page,
        size: size,
        ...(search !== '' && { search: search }),
      },
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
    });

    return res.data;
  };

  const { data } = useQuery({
    queryKey: ['search', currentPage, size, searchQuery],
    queryFn: () => fetchSearch(currentPage - 1, size, searchQuery),
  });
  const totalPages = data?.totalPages || 1;

  const handleSearch = () => {
    setSearchQuery(inputValue);
    setSearchParams({ search: inputValue });
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col max-w-[1200px] m-auto tablet:mx-7 mobile:mx-5 gap-9 desktop:gap-11 my-20 mobile:my-[60px]">
      <h1 className="text-heading-lg tablet:text-heading-sm mobile:text-heading-sm-m font-bold text-center">
        검색 결과
      </h1>
      <div className="w-[976px] tablet:w-[677px] mobile:w-[328px] m-auto">
        <SearchBar
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
          총 <span className="text-primary-default">{data?.contents[0]?.totalProperties}</span>
          건의 검색 결과가 있어요
        </p>
        {data?.contents[0]?.totalProperties === 0 ? (
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
              {data?.contents[0]?.propertySearchResponses.map((property: any, index: any) => (
                <div className="flex flex-col items-center">
                  <ItemCard
                    key={index}
                    id={property.id}
                    size={isMobile ? 's' : 'l'}
                    imageUrl={property.imageUrl}
                    title={property.propertyName}
                    address={property.areaAddr}
                    propertyType={property.propertyType}
                    salesType={property.salesType}
                    totalNumber={property.totalNumber}
                    infra={property.infra}
                    benefit={property.benefit}
                    price={property.price}
                    discountPrice={property.discountPrice}
                    like={property.like}
                    onLikeToggle={() => property.id}
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
