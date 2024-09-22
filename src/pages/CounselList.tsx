import Breadcrumb from '@/components/common/Breadcrumb';
import DefaultPagination from '@/components/common/DefaultPagination';
import ItemCounselList from '@/components/common/ItemCounselList';
import SearchBar from '@/components/common/SearchBar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useResponsive from '@/hooks/useResponsive';
import { BASE_URL } from '@/lib/constants';
import { formatPhoneNumber } from '@/lib/utils';
import { MagnifyingGlass, PencilSimpleLine } from '@phosphor-icons/react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const CounselList = () => {
  const { isDesktop, isMobile } = useResponsive();
  const [currentPage, setCurrentPage] = useState(1);
  const [waitingStatus, setWaitingStatus] = useState('pending');
  const [searchValue, setSearchValue] = useState('');
  const [inputValue, setInputValue] = useState('');

  const fetchCounsel = async (page: number, search: string) => {
    const res = await axios.get(`${BASE_URL}/api/member/my-consultations/${waitingStatus}`, {
      params: {
        page: page,
        size: 5,
        ...(search !== '' && { search: search }),
      },
      withCredentials: true,
    });

    return res.data;
  };

  const { data } = useQuery({
    queryKey: ['counsel', currentPage, waitingStatus, searchValue],
    queryFn: () => fetchCounsel(currentPage - 1, searchValue),
  });
  const totalPages = data?.totalPages || 1;

  const handleSearch = () => {
    setSearchValue(inputValue);
  };

  const renderContent = () => {
    return (
      <div>
        <p className="text-detail-lg mobile:text-detail-base-m text-assistive-strong my-4">
          총{' '}
          <span className="text-primary-default">
            {data?.contents[0]?.totalCount !== undefined ? data.contents[0].totalCount : 0}
          </span>
          건의 검색 결과가 있어요
        </p>
        {Array.isArray(data?.contents[0]?.myConsultations) &&
        data.contents[0].myConsultations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[676px] tablet:h-[600px] mobile:h-[400px]">
            <div className="flex items-center justify-center w-[120px] h-[120px] mobile:w-[96px] mobile:h-[96px] bg-primary-base rounded-10 mb-9">
              <PencilSimpleLine size={isMobile ? 48 : 80} weight="light" className="text-primary-strong" />
            </div>
            <div className="text-center">
              <p className="text-title-2xl mobile:text-title-lg-m font-bold mb-4">
                아직 상담을 신청하지 않았어요!
              </p>
              <div className="text-body-lg mobile:text-body-sm-m mb-10">
                <p>평소 관심있게 본 매물에 대해 궁금증이 있다면</p>
                <p>상담을 신청해보세요</p>
              </div>
              <div className="flex gap-5 mobile:gap-3">
                <Link to="/favorite">
                  <Button size={isMobile ? 'sm' : 'xl'} variant="outline">
                    관심 매물 보러가기
                  </Button>
                </Link>

                <Link to="/">
                  <Button size={isMobile ? 'sm' : 'xl'} variant="outline">
                    인기 매물 보러가기
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-11 mobile:gap-9">
            <div className="mt-6">
              {data?.contents[0]?.myConsultations.map((counsel: any, index: any) => (
                <ItemCounselList
                  key={index}
                  imageUrl={counsel.imageUrl}
                  title={counsel.name}
                  status={waitingStatus}
                  createdDate={counsel.consultationCreatedAt}
                  preferredDate={counsel.preferredAt}
                  message={counsel.message}
                  name={counsel.memberName}
                  phoneNumber={formatPhoneNumber(counsel.phoneNumber) || ''}
                />
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
      {isDesktop && <Breadcrumb links={['마이페이지', '상담신청 현황']} />}

      <h1 className="text-heading-lg tablet:text-heading-sm mobile:text-heading-sm-m font-bold text-center">
        상담신청 현황
      </h1>

      <div className="w-[976px] tablet:w-[677px] mobile:w-[328px] mx-auto my-11 mobile:my-9">
        <SearchBar
          type="text"
          placeholder="상담 신청한 아파트명, 지역명으로 검색하세요"
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

      <Tabs
        defaultValue={'pending'}
        onValueChange={(value) => {
          setWaitingStatus(value);
          setCurrentPage(1);
        }}>
        <TabsList className="mb-9 mobile:mb-6">
          <TabsTrigger value="pending">상담 대기</TabsTrigger>
          <TabsTrigger value="completed">상담 완료</TabsTrigger>
        </TabsList>
        <TabsContent value="pending">{renderContent()}</TabsContent>
        <TabsContent value="completed">{renderContent()}</TabsContent>
      </Tabs>
    </div>
  );
};

export default CounselList;
