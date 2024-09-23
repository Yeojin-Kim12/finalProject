// import { consultingPending } from '@/lib/tableItems';
import { Button } from '../ui/button';
import { X } from '@phosphor-icons/react';

export interface CustomerInquiryProps {
  name: string;
  phoneNumber: string;
  createdAt: string;
  preferredAt?: string;
  completedAt?: string;
  consultant?: string;
  consultingMessage: string;
  closePopup: () => void;
  onConsultingClick: () => void;
}

export default function CustomerInquiry({
  name,
  phoneNumber,
  createdAt,
  preferredAt,
  // consultant,
  consultingMessage,
  onConsultingClick,
  closePopup,
}: CustomerInquiryProps & { onConsultingClick: () => void }) {
  return (
    <main className="flex flex-col z-50 items-center mx-auto py-9 w-[420px] h-[665px]">
      <div className="flex w-full justify-end py-2 h-[32px]">
        <X size={32} weight="light" className="text-assistive-strong cursor-pointer" onClick={closePopup} />
      </div>
      <section className="w-[424px]">
        <div className="flex items-center gap-5">
          <h1 className="py-6 text-title-2xl font-bold text-static-default">{name} 님</h1>
          <span className="flex justify-center bg-primary-base text-primary-default text-label-base px-4 py-1 rounded-6">
            추가상담
          </span>
        </div>
        <article className="flex gap-10">
          <div className="flex flex-col">
            <span className="text-body-lg font-normal text-assistive-detail">연락처</span>
            <span className="text-body-lg font-normal text-assistive-detail">관심 매물</span>
            <span className="text-body-lg font-normal text-assistive-detail">상담신청 일자</span>
            <span className="text-body-lg font-bold text-primary-default">희망상담 일자</span>
          </div>
          <div className="flex flex-col">
            <span className="text-body-lg font-normal text-assistive-detail">{phoneNumber}</span>
            <span className="text-body-lg font-normal text-assistive-detail">관심 매물</span>
            <span className="text-body-lg font-normal text-assistive-detail">{createdAt}</span>
            <span className="text-body-lg font-bold text-primary-default">{preferredAt}</span>
          </div>
        </article>
        <div className="h-[1px] bg-assistive-divider w-full my-10"></div>
        <p className="py-5 text-title-base font-bold text-static-default">상담원 상담 메모</p>
        <textarea className="w-[424px] h-[214px] p-6 border rounded-6 mb-6">{consultingMessage}</textarea>
        <Button variant="primary" size="xl" className="flex mx-auto" onClick={onConsultingClick}>
          상담하기
        </Button>
      </section>
    </main>
  );
}

// 추가뱃지 유
// {
//     "memberName": "test error",
//     "propertyName": "Example Property Name",
//     "phoneNumber": "01012389999",
//     "createdAt": "2024-08-21",
//     "preferredAt": "2025-01-01",
//     "counsultMesssage" : "상담원 메세지",
//     "memberMessage": null,
//     "addConsultation": "true"
// }
