import Breadcrumb from '@/components/common/Breadcrumb';
import ItemCard from '@/components/common/ItemCard';
import ItemCounselList from '@/components/common/ItemCounselList';
import ItemList from '@/components/common/ItemList';
import Toast from '@/components/common/Toast';
import SelectedMenu from '@/components/LandList/SelectedMenu';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

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

  return (
    <>
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
          size="l"
          imageUrl="https://placehold.co/320x180"
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
          imageUrl="https://placehold.co/320x180"
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
          imageUrl="https://placehold.co/320x180"
          title="계양 어떤서원 말줄임표확인용"
          address="인천시 계양구 용종로"
          status="모집중"></ItemCard>
      </div>
      <div className="bg-slate-200">
        <ItemList
          size="l"
          imageUrl="https://placehold.co/320x180"
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
          imageUrl="https://placehold.co/320x180"
          title="계양 어떤서원"
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
