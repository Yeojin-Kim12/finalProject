// import { consultingPending } from '@/lib/tableItems';
import { useState } from 'react';
import { Button } from '../ui/button';
import { X, CaretLeft } from '@phosphor-icons/react';
import { ToggleSmall } from '../ui/toggleSmall';
import Dropdown from '../common/Dropdown';
import { consultingStatus } from '../../lib/dropdownItems';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { ConsultingData } from '@/types/types';

export interface CustomerConsultingProps {
  name: string;
  phoneNumber: string;
  consultant: string;
  createdAt: string;
  preferredAt?: string;
  completedAt?: string;
  consultingMessage: string;
  onBackClick: () => void;
  closePopup: () => void;
  onAddCustomer: (data: ConsultingData) => void;
}

export default function CustomerConsulting({
  name,
  phoneNumber,
  createdAt,
  preferredAt,
  consultant,
  consultingMessage,
  onBackClick,
  closePopup,
  onAddCustomer,
}: CustomerConsultingProps) {
  console.log('Consultant:', consultant);

  const [selectedRating, setSelectedRating] = useState<string | null>(null);
  const [selectedConsultingStatus, setSelectedConsultingStatus] = useState<string>('상담완료');
  const [consultingMemo, setConsultingMemo] = useState(consultingMessage);

  const handleSelect = (value: string) => {
    setSelectedConsultingStatus(value);
  };

  const handleToggle = (item: string) => {
    setSelectedRating((prevItem) => (prevItem === item ? null : item));
    console.log(item);
  };

  const handleMemoChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setConsultingMemo(event.target.value);
  };

  const handleSubmit = () => {
    const consultingData = {
      name,
      phoneNumber,
      consultant,
      status: selectedConsultingStatus === '상담대기' ? 'pending' : 'complete',
      consultingMessage: consultingMemo,
      preferredAt,
      tier: selectedRating || '',
      medium: 'Phone',
    };
    console.log(consultingData);

    if (onAddCustomer) {
      onAddCustomer(consultingData);
    }
    mutation.mutate(consultingData);
    closePopup();
  };

  const mutation = useMutation({
    mutationFn: async (newCustomer: ConsultingData) => {
      const response = await axios.post('/api/admin/properties/{propertyId}/consultations', newCustomer, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status !== 200 && response.status !== 201) {
        throw new Error('에러가 발생했습니다 ');
      }
      return response.data;
    },
  });

  return (
    <main className="flex flex-col z-50 items-center mx-auto py-9 w-[420px] h-[665px]">
      <div className="flex w-full justify-end py-2 h-[32px]">
        <X size={32} weight="light" className="text-assistive-strong cursor-pointer" onClick={closePopup} />
      </div>
      <form
        className="w-[424px]"
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}>
        <div className="flex items-center gap-5">
          <CaretLeft size={32} weight="bold" className="cursor-pointer" onClick={onBackClick} />
          <h1 className="py-6 text-title-2xl font-bold text-static-default">{name} 님</h1>
        </div>
        <article className="flex gap-10">
          <div className="flex flex-col">
            <span className="text-body-lg font-normal text-assistive-detail">연락처</span>
            <span className="text-body-lg font-normal text-assistive-detail">상담신청 일자</span>
            <span className="text-body-lg font-bold text-primary-default">희망상담 일자</span>
          </div>
          <div className="flex flex-col">
            <span className="text-body-lg font-normal text-assistive-detail">{phoneNumber}</span>
            <span className="text-body-lg font-normal text-assistive-detail">{createdAt}</span>
            <span className="text-body-lg font-bold text-primary-default">{preferredAt}</span>
          </div>
        </article>
        <div className="h-[1px] bg-assistive-divider w-full my-6"></div>

        <p className="py-4 text-title-base font-bold text-static-default">고객 문의 사항</p>
        <textarea
          disabled
          className="w-[424px] h-[140px] text-label-lg text-assistive-strong bg-assistive-base overflow-y-auto p-6 border rounded-6 ">
          {/* {customerMessage} */}
        </textarea>

        <div className="flex flex-col mb-8">
          <label className="py-4 mt-6 text-title-base font-bold text-static-default">신청 상태</label>
          <Dropdown
            items={consultingStatus}
            defaultLabel="상담완료"
            buttonWidth="w-[138px]"
            onSelect={(event) => handleSelect(event)}
          />
        </div>
        <label className="py-4 mt-6 text-title-base font-bold text-static-default">고객등급</label>
        <div className="flex gap-3 mt-4 mb-6">
          {['S', 'A', 'B', 'C', 'D'].map((item) => (
            <ToggleSmall
              key={item}
              variant={selectedRating === item ? 'fill' : 'default'}
              onClick={() => handleToggle(item)}>
              {item}
            </ToggleSmall>
          ))}
        </div>
        <p className="py-4 text-title-base font-bold text-static-default">상담원 상담 메모</p>
        <textarea
          value={consultingMemo}
          className="w-[424px] h-[214px] text-label-lg text-static-default p-6 border rounded-6 mb-6"
          onChange={handleMemoChange}>
          {consultingMessage}
        </textarea>
        <Button variant="primary" size="xl" className="flex mx-auto mb-9">
          상담완료
        </Button>
      </form>
    </main>
  );
}
