import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { useState } from 'react';
import useResponsive from '@/hooks/useResponsive';

export interface ItemCounselListProps {
  imageUrl: string; // 이미지
  title: string; // 제목
  status: string; // 상태
  createdDate: string; // 상담신청날짜
  preferredDate: string; //상담희망날짜
  message: string; // 상담내용
  name: string; // 이름
  phoneNumber: string; // 연락처
}

const ItemCounselList = ({
  imageUrl,
  title,
  status,
  createdDate,
  preferredDate,
  message,
  name,
  phoneNumber,
}: ItemCounselListProps) => {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const { isMobile } = useResponsive();

  const handleInquiry = () => {
    setIsInquiryOpen(!isInquiryOpen);
  };

  return (
    <>
      <div className="w-[1200px] min-w-[1200px] h-[228px] px-8 py-7 mobile:w-[360px] mobile:min-w-[360px] mobile:h-[152px] mobile:px-4 mobile:py-6 flex bg-white border-b border-assistive-divider gap-6">
        <div className="block w-[320px] mobile:hidden">
          <img src={imageUrl} alt={title} className="w-[320px] h-full min-w-[320px] rounded-5 object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="mb-3 mobile:mb-2">
            <span className="text-detail-lg mobile:text-detail-sm-m text-assistive-detail">
              {createdDate}
            </span>
            <h2 className="w-full text-title-xl mobile:text-title-base-m mt-3 mb-4 mobile:mt-2 mobile:mb-2 text-static-default font-bold overflow-hidden text-ellipsis whitespace-nowrap">
              {title}
            </h2>
            {status === 'pending' ? (
              <Label size={isMobile ? 's' : 'm'} variant="secondary" className="mobile:text-[11px]">
                상담대기
              </Label>
            ) : (
              <Label size={isMobile ? 's' : 'm'} variant="primary" className="mobile:text-[11px]">
                상담완료
              </Label>
            )}
          </div>
          <div className="flex items-center gap-6">
            <span className="w-full text-detail-lg mobile:text-detail-sm-m text-assistive-detail overflow-hidden text-ellipsis whitespace-nowrap">
              {message}
            </span>
            <Button
              size={isMobile ? 'xs' : 'sm'}
              variant={isInquiryOpen ? 'disabled' : 'outline'}
              disabled={isInquiryOpen ? true : false}
              onClick={handleInquiry}>
              문의내역 보기
            </Button>
          </div>
        </div>
      </div>
      <div
        className={`w-[1200px] min-w-[1200px] mobile:w-[360px] mobile:min-w-[360px] bg-assistive-base overflow-hidden transition-all duration-300 ease-in-out ${
          isInquiryOpen ? 'px-6 py-5 mobile:px-4 mobile:py-3 max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        }`}>
        <div className="px-6 mobile:px-0">
          <div className="grid items-center justify-start grid-cols-[auto_1px_auto_1px_auto] mobile:grid-cols-[auto_1px_auto_1px] mt-6 mb-9 mobile:mt-3 mobile:mb-5 gap-5 mobile:gap-3 text-detail-lg mobile:text-detail-sm-m text-assistive-detail">
            <p>이름: {name}</p>
            <div className="w-[1px] h-6 mobile:h-[10px] bg-assistive-detail"></div>
            <p>연락처: {phoneNumber}</p>
            <div className="w-[1px] h-6 mobile:h-[10px] bg-assistive-detail"></div>
            <p className="mobile:col-span-3">희망 상담 일자: {preferredDate}</p>
          </div>
          <p className="mt-9 mb-6 mobile:mt-5 mobile:mb-3 text-body-lg mobile:text-body-sm-m text-static-default whitespace-pre-line">
            {message}
          </p>
        </div>
        <div className="flex justify-end">
          <Button size={isMobile ? 'xs' : 'sm'} variant="assistive" onClick={handleInquiry}>
            닫기
          </Button>
        </div>
      </div>
    </>
  );
};

export default ItemCounselList;
