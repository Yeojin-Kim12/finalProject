import AreaMap from '@/components/PropertySearch/AreaMap';
import Breadcrumb from '@/components/common/Breadcrumb';
import CustomFilterToggleList from '@/components/PropertySearch/CustomFilterToggleList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ToggleButton } from '@/components/ui/ToggleButton';
import createToggleIcons from '@/constants/keywordIconMap';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CaretUpDown, MagnifyingGlass } from '@phosphor-icons/react';
import axios from 'axios';
import { BASE_URL } from '@/lib/constants';
import { useQuery } from '@tanstack/react-query';
import useResponsive from '@/hooks/useResponsive';
import ItemCard from '@/components/common/ItemCard';
import DefaultPagination from '@/components/common/DefaultPagination';
import SelectedMenu from '@/components/PropertySearch/SelectedMenu';

const areasMap = [
  { label: '서울', value: '서울' },
  { label: '전북', value: '전북' },
  { label: '경기·인천', value: '경기/인천' },
  { label: '대구·경북', value: '대구/경북' },
  { label: '대전·충북', value: '대전/충북' },
  { label: '부산·울산·경남', value: '부산/울산/경남' },
  { label: '세종·충남', value: '세종/충남' },
  { label: '강원', value: '강원' },
  { label: '광주·전남', value: '광주/전남' },
  { label: '제주', value: '제주' },
];

const PropertySearch = () => {
  const location = useLocation();
  const { isDesktop, isMobile } = useResponsive();
  const [propertyType, setPropertyType] = useState<string[]>([]);
  const [salesType, setSalesType] = useState<string[]>([]);
  const [benefit, setBenefit] = useState<string[]>([]);
  const [infra, setInfra] = useState<string[]>([]);

  const [activeAreas, setActiveAreas] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const size = isDesktop ? 9 : 6;

  const { toggleIcon1, toggleIcon2, toggleIcon3, toggleIcon4 } = createToggleIcons();
  const [selectedFilters, setSelectedFilters] = useState<{
    price: { min: number | undefined | null; max: number | undefined | null };
    squareMeter: { min: number | undefined | null; max: number | undefined | null };
    householdNumber: { min: number | undefined | null; max: number | undefined | null };
    priceSelectedIds: number[];
    squareMeterSelectedIds: number[];
    householdNumberSelectedIds: number[];
  }>({
    price: { min: undefined, max: undefined },
    squareMeter: { min: undefined, max: undefined },
    householdNumber: { min: undefined, max: undefined },
    priceSelectedIds: [1],
    squareMeterSelectedIds: [1],
    householdNumberSelectedIds: [1],
  });

  const fetchPropertySearch = async (page: number, size: number) => {
    const keyword = [...benefit, ...infra].join(',');
    const res = await axios.get(`${BASE_URL}/api/common/properties/filter`, {
      params: {
        page: page,
        size: size,
        ...(activeAreas.length > 0 && { area: activeAreas.join('/') }),
        ...(propertyType.length > 0 && { propertyType: propertyType.join(',') }),
        ...(salesType.length > 0 && { salesType: salesType.join(',') }),
        ...(keyword && { keyword }),
        ...(selectedFilters.price.min !== undefined && { priceMin: selectedFilters.price.min }),
        ...(selectedFilters.price.max !== undefined && { priceMax: selectedFilters.price.max }),
        ...(selectedFilters.squareMeter.min !== undefined && { areaMin: selectedFilters.squareMeter.min }),
        ...(selectedFilters.squareMeter.max !== undefined && { areaMax: selectedFilters.squareMeter.max }),
        ...(selectedFilters.householdNumber.min !== undefined && {
          totalMin: selectedFilters.householdNumber.min,
        }),
        ...(selectedFilters.householdNumber.max !== undefined && {
          totalMax: selectedFilters.householdNumber.max,
        }),
      },
      withCredentials: true,
    });
    console.log(res.data);

    return res.data;
  };

  const { data } = useQuery({
    queryKey: [
      'propertySearch',
      currentPage,
      size,
      activeAreas,
      propertyType,
      salesType,
      benefit,
      infra,
      selectedFilters,
    ],
    queryFn: () => fetchPropertySearch(currentPage - 1, size),
  });
  const totalPages = data?.totalPages || 1;

  const toggleArea = (value: string) => {
    setActiveAreas(
      (prev) =>
        prev.includes(value)
          ? prev.filter((area) => area !== value) // 이미 선택된 지역은 해제
          : [...prev, value], // 새로운 지역 추가
    );
    setCurrentPage(1);
  };
  const handleToggle = (title: string, category: string) => {
    switch (category) {
      case 'propertyType':
        setPropertyType((prev) =>
          prev.includes(title) ? prev.filter((b) => b !== title) : [...prev, title],
        );
        break;
      case 'salesType':
        setSalesType((prev) => (prev.includes(title) ? prev.filter((b) => b !== title) : [...prev, title]));
        break;
      case 'benefit':
        setBenefit((prev) => (prev.includes(title) ? prev.filter((b) => b !== title) : [...prev, title]));
        break;
      case 'infra':
        setInfra((prev) => (prev.includes(title) ? prev.filter((i) => i !== title) : [...prev, title]));
        break;
    }
    setCurrentPage(1);
  };
  const handleSelectMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };
  const handleFiltersUpdate = (filters: {
    price: { min: number | undefined | null; max: number | undefined | null };
    squareMeter: { min: number | undefined | null; max: number | undefined | null };
    householdNumber: { min: number | undefined | null; max: number | undefined | null };
    priceSelectedIds: number[];
    squareMeterSelectedIds: number[];
    householdNumberSelectedIds: number[];
  }) => {
    setSelectedFilters(filters);
    setCurrentPage(1);
    setIsMenuOpen(false);
  };

  return (
    <main className="flex flex-col items-center gap-12 py-10 tablet:gap-11 mobile:gap-9 mobile:py-9">
      <div className="w-full max-w-[1200px]">
        <Breadcrumb links={['미분양 정보']} />
      </div>
      <section className="flex w-full max-w-[1200px] flex-col gap-11 tablet:px-7 mobile:px-5 mobile:gap-6 ">
        <div className="flex flex-col gap-5 mobile:gap-4">
          <p className="text-title-2xl text-static-default font-bold mobile:text-title-lg-m">
            관심있는 지역을 선택해보세요
          </p>
          <p className="text-detail-lg text-assistive-detail mobile:text-detail-base-m">
            서울부터 제주까지 국내 모든 미분양 매물을 보여드릴게요
          </p>
        </div>
        <div className="flex flex-col items-center justify-evenly gap-[100px] desktop:flex-row tablet:gap-11">
          <div className="w-1/2 flex items-center justify-center mobile:hidden">
            <AreaMap selectedAreas={activeAreas} toggleArea={toggleArea} />
          </div>
          <div className="w-full grid grid-cols-3 gap-5 desktop:grid-cols-2 desktop:w-1/2">
            {areasMap.map((area, index) => (
              <ToggleButton
                key={index + 1}
                variant={activeAreas.includes(area.value) ? 'strong' : 'default'}
                className="justify-center tablet:text-label-base tablet:px-8 tablet:py-5 mobile:text-label-sm-m mobile:px-5 mobile:py-3 mobile:justify-start whitespace-nowrap"
                onClick={() => toggleArea(area.value)}>
                {area.label}
              </ToggleButton>
            ))}
          </div>
        </div>
      </section>
      <section className="w-full max-w-[1200px]">
        <div className="flex flex-col gap-5 tablet:px-7 mobile:px-5 mobile:gap-4">
          <p className="text-title-2xl text-static-default font-bold mobile:text-title-lg-m">
            나만의 맞춤 조건을 설정해보세요
          </p>
          <p className="text-detail-lg text-assistive-detail mobile:text-detail-base-m">
            다양한 조건들을 통해 나에게 꼭 맞는 매물을 찾아보세요
          </p>
        </div>
      </section>
      <section className="relative flex w-full flex-col items-center gap-11 mobile:gap-6">
        <div className="absolute top-[55px] left-0 w-full h-[calc(100%-55px)] bg-assistive-base shadow-inner"></div>
        <article className="w-full max-w-[1200px]">
          <Tabs defaultValue={location.state?.keyword || 'propertyType'}>
            <TabsList className="mb-[3px]">
              <TabsTrigger value="propertyType">분양유형</TabsTrigger>
              <TabsTrigger value="salesType">분양형태</TabsTrigger>
              <TabsTrigger value="benefit">혜택</TabsTrigger>
              <TabsTrigger value="infra">인프라</TabsTrigger>
            </TabsList>
            <TabsContent value="propertyType">
              <CustomFilterToggleList
                list={toggleIcon3}
                onToggle={(title) => handleToggle(title, 'propertyType')}
                activeItems={propertyType}
                category="propertyType"
              />
            </TabsContent>
            <TabsContent value="salesType">
              <CustomFilterToggleList
                list={toggleIcon4}
                onToggle={(title) => handleToggle(title, 'salesType')}
                activeItems={salesType}
                category="salesType"
              />
            </TabsContent>
            <TabsContent value="benefit">
              <CustomFilterToggleList
                list={toggleIcon1}
                onToggle={(title) => handleToggle(title, 'benefit')}
                activeItems={benefit}
                category="benefit"
              />
            </TabsContent>
            <TabsContent value="infra">
              <CustomFilterToggleList
                list={toggleIcon2}
                onToggle={(title) => handleToggle(title, 'infra')}
                activeItems={infra}
                category="infra"
              />
            </TabsContent>
          </Tabs>
        </article>
      </section>
      <section>
        <div className="mb-5">
          <p className="text-title-2xl font-bold">전체 목록</p>
          <p className="text-detail-lg">표시되는 가격은 최소 평형 기준 최저가입니다</p>
        </div>
        <div className="relative flex items-center justify-between mb-6">
          <p className="inline text-detail-lg mobile:text-detail-base-m text-assistive-strong">
            총 <span className="text-primary-default">{data?.contents[0]?.totalProperties}</span>
            건의 매물이 있습니다
          </p>
          <Button variant="assistive" size="sm" onClick={handleSelectMenu}>
            세부조건
            <CaretUpDown size={16} className="ml-3 text-assistive-strong" />
          </Button>
          <SelectedMenu
            isOpen={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
            onSubmitFilters={handleFiltersUpdate}
            filters={selectedFilters}
          />
        </div>
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
                다른 조건으로 미분양 매물을 찾아보시는 건 어때요?
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-11 mobile:gap-9">
            <div className="grid grid-cols-3 tablet:grid-cols-2 mobile:grid-cols-1 gap-6 mobile:gap-4 mt-6">
              {data?.contents[0]?.propertySearchResponses.map((property: any, index: any) => (
                <div className="flex flex-col items-center" key={property.id}>
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
      </section>
    </main>
  );
};

export default PropertySearch;
