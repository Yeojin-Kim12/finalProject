import RangeDatePicker from '@/components/common/RangeDatePicker';
import SingleDatePicker from '@/components/common/SingleDatePicker';
import CustomFilterToggleList from '@/components/PropertySearch/CustomFilterToggleList';
import SkeletonSwiper from '@/components/Main/SkeletonSwiper';
import PropertyKeyword from '@/components/Property/PropertyKeyword';
import createToggleIcons from '@/constants/keywordIconMap';
import { KeywordData } from '@/constants/msData';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import PropertyManagementCard from '@/components/PropertyManagement/PropertyManagementCard';

const TestMS = () => {
  const [activeItems, setActiveItems] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [date, setDate] = useState<Date | undefined>();

  const handleToggle = (title: string) => {
    setActiveItems((prevState) =>
      prevState.includes(title) ? prevState.filter((item) => item !== title) : [...prevState, title],
    );
  };
  const { toggleIcon1, toggleIcon2, toggleIcon3, toggleIcon4 } = createToggleIcons();
  console.log('dateRange', dateRange, 'date', date);
  return (
    <div className="flex flex-col items-center gap-11 py-12">
      <PropertyManagementCard />
      <SkeletonSwiper />
      {/* 단일 날짜선택 */}
      <SingleDatePicker defaultLabel="상담날짜 선택" onChange={setDate} />
      {/* 범위 날짜선택 */}
      <RangeDatePicker fromLabel="모집시작일" toLabel="모집마감일" onChange={setDateRange} />

      <div className="max-w-[1200px]">
        <p className="text-title-2xl">혜택</p>
        <CustomFilterToggleList list={toggleIcon1} onToggle={handleToggle} activeItems={activeItems} />
        <p className="text-title-2xl">인프라</p>
        <CustomFilterToggleList list={toggleIcon2} onToggle={handleToggle} activeItems={activeItems} />
        <p className="text-title-2xl">분양 형태</p>
        <CustomFilterToggleList list={toggleIcon3} onToggle={handleToggle} activeItems={activeItems} />
        <p className="text-title-2xl">분양 유형</p>
        <CustomFilterToggleList list={toggleIcon4} onToggle={handleToggle} activeItems={activeItems} />
      </div>
      <div className=""></div>
      <PropertyKeyword type="infra" data={KeywordData.infra} />
      <PropertyKeyword type="benefit" data={KeywordData.benefit} />
    </div>
  );
};

export default TestMS;
