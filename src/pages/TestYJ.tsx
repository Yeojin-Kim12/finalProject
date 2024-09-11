import Breadcrumb from '@/components/common/Breadcrumb';
import ItemCard from '@/components/common/ItemCard';
import ItemCounselList from '@/components/common/ItemCounselList';
import ItemList from '@/components/common/ItemList';
import Toast from '@/components/common/Toast';
import SelectedMenu from '@/components/LandList/SelectedMenu';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SalesInformation } from '@/types/types';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const TestYJ = () => {
  const [isToast, setIsToast] = useState(false);
  const [isSelectedMenu, setIsSelectedMenu] = useState(false);
  const showToast = () => {
    setIsToast(!isToast);
  };
  const showMenu = () => {
    setIsSelectedMenu(!isSelectedMenu);
  };
  const hideMenu = () => {
    setIsSelectedMenu(false);
  };

  const fetchSalesInformation = async (): Promise<SalesInformation> => {
    const res = await axios.get<SalesInformation>(`/api/properties`);
    return res.data;
  };

  const { data } = useQuery<SalesInformation>({
    queryKey: ['salesInformation'],
    queryFn: fetchSalesInformation,
  });

  console.log(data);

  const location = useLocation();

  return (
    <>
      <Tabs defaultValue={location.state?.keyword || 'type'}>
        <TabsList>
          <TabsTrigger value="type">분양형태</TabsTrigger>
          <TabsTrigger value="benefit">혜택</TabsTrigger>
          <TabsTrigger value="infra">인프라</TabsTrigger>
        </TabsList>
        <TabsContent value="type">분양형태</TabsContent>
        <TabsContent value="benefit">혜택</TabsContent>
        <TabsContent value="infra">인프라</TabsContent>
      </Tabs>

      <Link to={`/property/${1}`}>상세페이지</Link>
      <div className="flex justify-end">
        <Button variant="assistive" size="sm" onClick={showToast}>
          Toast
        </Button>
        <Button variant="assistive" size="sm" onClick={showMenu}>
          Menu
        </Button>
        <SelectedMenu isOpen={isSelectedMenu} onClose={hideMenu} />
      </div>
      {isToast && <Toast setIsToast={setIsToast} />}

      <div className="flex gap-4 bg-slate-200 h-[500px] justify-center items-center">
        <ItemCard
          id={1}
          size="l"
          imageUrl="https://02bb0bfb4a8e793cf2e2affeb8070c90.r2.cloudflarestorage.com/cheongyak-bucket/MARKETING/4ca28725-c17e-43c9-84a6-314e328b3b0b:byebyebyebyebye"
          title="계양 학마을서원"
          address="인천시 계양구"
          propertyType="VILLA"
          salesType="PRIVATE_SALE"
          totalNumber={100}
          keywords={['BALANCE_DEFERRAL', 'SUBWAY', 'PARK']}
          price={29800}
          discountPrice={22000}
          like={true}
          rank={1}></ItemCard>
        <ItemCard
          size="s"
          id={1}
          imageUrl="https://02bb0bfb4a8e793cf2e2affeb8070c90.r2.cloudflarestorage.com/cheongyak-bucket/전공 책.png"
          title="계양 어떤서원"
          address="인천시 계양구 용종로"
          propertyType="LIVING_ACCOMMODATION"
          salesType="LEASE_SALE"
          totalNumber={100}
          keywords={['DISCOUNT_SALE', 'SHOPPING', 'CASH_PAYMENT']}
          price={29800}
          discountPrice={22000}
          like={false}
          rank={1}></ItemCard>
        <ItemCard
          size="default"
          id={1}
          imageUrl="https://delivery183.org/MARKETING/4ca28725-c17e-43c9-84a6-314e328b3b0b%3Abyebyebyebyebye"
          title="계양 어떤서원 말줄임표확인용"
          address="인천시 계양구 용종로"
          status="모집중"></ItemCard>
      </div>
      <div className="bg-slate-200">
        <ItemList
          size="l"
          id={1}
          imageUrl="https://delivery183.org/%EC%A0%84%EA%B3%B5%20%EC%B1%85.png"
          title="계양 어떤서원"
          address="인천시 계양구 용종로"
          propertyType="APARTMENT"
          salesType="PRIVATE_SALE"
          totalNumber={100}
          keywords={['DISCOUNT_SALE', 'SHOPPING', 'CASH_PAYMENT']}
          price={29800}
          discountPrice={22000}
          like={true}
          rank={1}></ItemList>
        <ItemList
          size="m"
          id={1}
          imageUrl="https://delivery183.org/dir1/0fdb98d7-9e0b-4a6d-b258-91282d038614:마이크 세팅.png"
          title="이미지테스트 한글/특수문자"
          address="인천시 계양구 용종로"
          propertyType="OFFICETEL"
          salesType="PUBLIC_SALE"
          totalNumber={100}
          keywords={['DISCOUNT_SALE', 'SHOPPING', 'CASH_PAYMENT']}
          price={29800}
          discountPrice={22000}
          like={false}
          rank={1}></ItemList>
      </div>
      <ItemCounselList
        imageUrl="https://placehold.co/320x180"
        title="계양 어떤서원"
        status="상담대기"
        createdDate="2024-01-01"
        preferredDate="2024-02-02"
        message="가격문제로 고민중입니다. 연락부탁드립니다."
        name="김여진"
        phoneNumber="010-0000-9999"></ItemCounselList>
      <div className="font-pretendard">
        <Label size="s" variant="elevated">
          모집중
        </Label>
        <Label size="m" variant="primary">
          모집중
        </Label>
        <Label size="l" variant="secondary">
          모집중
        </Label>
        <Label size="l" variant="space">
          00평
        </Label>
      </div>
      <Breadcrumb links={['미분양 정보', '대시보드']} />
    </>
  );
};

export default TestYJ;
