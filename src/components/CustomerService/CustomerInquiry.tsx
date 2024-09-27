// import { consultingPending } from '@/lib/tableItems';
import { Button } from '../ui/button';

export interface CustomerInquiryProps {
  addConsultation: boolean;
  memberConsultationId: number;
  name: string;
  phoneNumber: string;
  createdAt: string;
  preferredAt?: string;
  completedAt?: string;
  consultingMessage: string;
  memberMessage: string;
  onConsultingClick: () => void;
}

export default function CustomerInquiry({
  addConsultation,
  name,
  phoneNumber,
  createdAt,
  preferredAt,
  consultingMessage,
  memberMessage,
  onConsultingClick,
}: CustomerInquiryProps & { onConsultingClick: () => void }) {
  return (
    <main className="flex flex-col z-50 items-center mx-auto pb-9 w-[420px] h-[665px]">
      <section className="w-full px-4">
        <div className="flex items-center gap-5">
          <h1 className="py-6 text-title-2xl font-bold text-static-default">{name} 님</h1>
          {addConsultation && (
            <span className="flex justify-center bg-primary-base text-primary-default text-label-base px-4 py-1 rounded-6">
              추가상담
            </span>
          )}
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
        <p className="py-5 text-title-base font-bold text-static-default">
          {addConsultation ? '상담원 상담 메모' : '문의사항'}
        </p>
        <textarea className="w-full h-[214px] p-6 border rounded-6 mb-6">
          {addConsultation ? consultingMessage : memberMessage}
        </textarea>
        <Button variant="primary" size="xl" className="flex mx-auto" onClick={onConsultingClick}>
          상담하기
        </Button>
      </section>
    </main>
  );
}
