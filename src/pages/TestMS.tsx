import RangeDatePicker from '@/components/common/RangeDatePicker';
import SingleDatePicker from '@/components/common/SingleDatePicker';
import CustomFilterToggleList from '@/components/PropertySearch/CustomFilterToggleList';
import SkeletonSwiper from '@/components/Main/SkeletonSwiper';
import PropertyKeyword from '@/components/Property/PropertyKeyword';
import createToggleIcons from '@/constants/keywordIconMap';
import { KeywordData } from '@/constants/msData';
import React, { useState } from 'react';
import { DateRange } from 'react-day-picker';
import PropertyManagementCard from '@/components/PropertyManagement/PropertyManagementCard';

interface dataType {
  totalPages: number;
  pageSize: number;
  currentPage: number;
  contents: {
    id: number;
    imageUrl: string;
    name: string;
    addrDo: string;
    addrGu: string;
    pending: boolean;
    createdAt: string;
    endDate: string;
  }[];
}
const data: dataType = {
  totalPages: 5, // 전체 페이지 개수(0에서부터 시작해서 4페이지까지 존재한다는 의미)
  pageSize: 4, // 한 페이지에 리턴될 데이터 개수
  currentPage: 0, // 현재 페이지(0부터 시작)
  contents: [
    // pageSize만큼 리턴됨
    {
      id: 3,
      imageUrl: 'https://delivery183.org/PROPERTY_IMAGE/8de749ab-7fd0-4e5d-95e7-a88711a4cc9c%3Aswiper.png',
      name: '잠실 푸르지오',
      addrDo: '경기도',
      addrGu: '성북구',
      pending: true, // 모집중
      createdAt: '2024-08-26T16:05:45.986094',
      endDate: '2025-08-01',
    },
    {
      id: 28,
      imageUrl: 'https://delivery183.org/PROPERTY_IMAGE/8de749ab-7fd0-4e5d-95e7-a88711a4cc9c%3Aswiper.png',
      name: '잠실 푸르지오',
      addrDo: '경기도',
      addrGu: '성북구',
      pending: true, // 모집중
      createdAt: '2024-09-06T17:49:40.55042',
      endDate: '2024-08-29',
    },
    {
      id: 21,
      imageUrl: 'https://delivery183.org/PROPERTY_IMAGE/8de749ab-7fd0-4e5d-95e7-a88711a4cc9c%3Aswiper.png',
      name: '잠실 푸르지오',
      addrDo: '경기도',
      addrGu: '성북구',
      pending: true, // 모집중
      createdAt: '2024-08-30T01:15:56.353587',
      endDate: '2024-08-29',
    },
    {
      id: 20,
      imageUrl: 'https://delivery183.org/PROPERTY_IMAGE/8de749ab-7fd0-4e5d-95e7-a88711a4cc9c%3Aswiper.png',
      name: '잠실 푸르지오',
      addrDo: '경기도',
      addrGu: '성북구',
      pending: true, // 모집중
      createdAt: '2024-08-29T23:50:28.88131',
      endDate: '2024-08-29',
    },
  ],
};

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
