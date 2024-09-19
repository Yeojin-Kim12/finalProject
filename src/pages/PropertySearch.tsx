import AreaMap from '@/components/PropertySearch/AreaMap';
import Breadcrumb from '@/components/common/Breadcrumb';
import CustomFilterToggleList from '@/components/PropertySearch/CustomFilterToggleList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ToggleButton } from '@/components/ui/ToggleButton';
import createToggleIcons from '@/constants/keywordIconMap';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const areasMap = [
  { label: '서울', value: '서울' },
  { label: '전북', value: '전북' },
  { label: '경기·인천', value: '경기 인천' },
  { label: '대구·경북', value: '대구 경북' },
  { label: '대전·충북', value: '대전 충북' },
  { label: '부산·울산·경남', value: '부산 울산 경남' },
  { label: '세종·충남', value: '세종 충남' },
  { label: '강원', value: '강원' },
  { label: '광주·전남', value: '광주 전남' },
  { label: '제주', value: '제주' },
];

const PropertySearch = () => {
  const location = useLocation();
  const [activeItems, setActiveItems] = useState<string[]>([]);
  const [activeAreas, setActiveAreas] = useState<string[]>([]);

  const { toggleIcon1, toggleIcon2, toggleIcon3, toggleIcon4 } = createToggleIcons();

  const toggleArea = (value: string) => {
    setActiveAreas(
      (prev) =>
        prev.includes(value)
          ? prev.filter((area) => area !== value) // 이미 선택된 지역은 해제
          : [...prev, value], // 새로운 지역 추가
    );
  };
  const handleToggle = (title: string) => {
    setActiveItems((prevState) =>
      prevState.includes(title) ? prevState.filter((item) => item !== title) : [...prevState, title],
    );
  };
  return (
    <main className="max-w-[1200px] m-auto flex flex-col gap-12 tablet:gap-11 mobile:gap-9 mobile:py-9">
      <Breadcrumb links={['미분양 정보']} />
      <section className="flex flex-col gap-11 tablet:px-7 mobile:px-5 mobile:gap-6 ">
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
      <section className="flex flex-col gap-11 mobile:gap-6">
        <div className="flex flex-col gap-5 tablet:px-7 mobile:px-5 mobile:gap-4">
          <p className="text-title-2xl text-static-default font-bold mobile:text-title-lg-m">
            나만의 맞춤 조건을 설정해보세요
          </p>
          <p className="text-detail-lg text-assistive-detail mobile:text-detail-base-m">
            다양한 조건들을 통해 나에게 꼭 맞는 매물을 찾아보세요
          </p>
        </div>
        <Tabs defaultValue={location.state?.keyword || 'propertyType'}>
          <TabsList className="mb-[3px]">
            <TabsTrigger value="propertyType">분양유형</TabsTrigger>
            <TabsTrigger value="salesType">분양형태</TabsTrigger>
            <TabsTrigger value="benefit">혜택</TabsTrigger>
            <TabsTrigger value="infra">인프라</TabsTrigger>
          </TabsList>
          <TabsContent value="propertyType">
            <CustomFilterToggleList list={toggleIcon3} onToggle={handleToggle} activeItems={activeItems} />
          </TabsContent>
          <TabsContent value="salesType">
            <CustomFilterToggleList list={toggleIcon4} onToggle={handleToggle} activeItems={activeItems} />
          </TabsContent>
          <TabsContent value="benefit">
            <CustomFilterToggleList list={toggleIcon1} onToggle={handleToggle} activeItems={activeItems} />
          </TabsContent>
          <TabsContent value="infra">
            <CustomFilterToggleList list={toggleIcon2} onToggle={handleToggle} activeItems={activeItems} />
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
};

export default PropertySearch;
