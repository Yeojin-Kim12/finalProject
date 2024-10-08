import { useState } from 'react';
import { PencilSimpleLine } from '@phosphor-icons/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { LabelCustomerRating } from '../ui/labelCustomerRating';
import { BASE_URL } from '@/lib/constants';
import { Button } from '../ui/button';
import { getAuthHeaders } from '@/utils/auth';

export interface CustomerCompletedProps {
  adminConsultationId: number;
  name: string;
  phoneNumber: string;
  createdAt: string;
  completedAt?: string;
  memberMessage: string;
  consultMessage: string;
  closePopup?: () => void;
  tier?: string;
}

export default function CustomerCompleted({
  adminConsultationId,
  name,
  phoneNumber,
  createdAt,
  completedAt,
  memberMessage,
  consultMessage,
  closePopup,
  tier,
}: CustomerCompletedProps) {
  const [message, setMessage] = useState(consultMessage);
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (updatedMessage: string) => {
      const response = await axios.put(
        `${BASE_URL}/api/admin/consultations/${adminConsultationId}/completed?consultantMessage=${updatedMessage}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders(),
          },
        },
      );
      if (response.status !== 200 && response.status !== 201) {
        throw new Error('Error occurred while updating the consulting message');
      }
      return response.data;
    },
    onSuccess: () => {
      setIsEditing(false); // Exit edit mode after successful update
    },
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSubmit = () => {
    if (message) {
      mutation.mutate(message);
      if (closePopup) {
        queryClient.invalidateQueries({ queryKey: ['completedData', adminConsultationId] });
        closePopup();
      }
    }
  };

  return (
    <main className="flex flex-col z-50 items-center w-[500px] h-[750px]">
      <div className="w-[424px]">
        <div className="flex items-center gap-5">
          <h1 className="py-4 text-title-2xl font-bold text-static-default">{name} 님</h1>
          <LabelCustomerRating size="m" keyword={tier}>
            {tier}등급
          </LabelCustomerRating>
        </div>
        <article className="flex relative gap-10">
          <div className="flex flex-col">
            <span className="text-body-lg font-normal text-assistive-detail">연락처</span>
            <span className="text-body-lg font-normal text-assistive-detail">상담신청 일자</span>
            <span className="text-body-lg font-normal text-assistive-detail">상담처리 일자</span>
          </div>
          <div className="flex flex-col">
            <span className="text-body-lg font-normal text-assistive-detail">{phoneNumber}</span>
            <span className="text-body-lg font-normal text-assistive-detail">{createdAt}</span>
            <span className="text-body-lg font-bold text-primary-default">{completedAt}</span>
          </div>
          {!isEditing && (
            <PencilSimpleLine
              size={48}
              weight="light"
              className="text-assistive-default absolute right-0 self-end cursor-pointer"
              onClick={handleEditClick}
            />
          )}
        </article>
        <div className="h-[1px] bg-assistive-divider w-full my-4"></div>

        <p className="py-4 text-title-base font-bold text-static-default">고객 문의 사항</p>
        <textarea
          disabled
          className="w-[424px] h-[140px] text-label-lg text-assistive-strong bg-assistive-base overflow-y-auto p-6 border rounded-6 ">
          {memberMessage}
        </textarea>

        <p className="py-4 text-title-base font-bold text-static-default">상담원 상담 메모</p>
        <textarea
          className="w-[424px] h-[214px] text-label-lg text-static-default p-6 border rounded-6"
          onChange={(e) => setMessage(e.target.value)}
          disabled={!isEditing}>
          {consultMessage}
        </textarea>
        {isEditing && (
          <Button variant="primary" size="xl" className="flex mx-auto my-4" onClick={handleSubmit}>
            수정하기
          </Button>
        )}
      </div>
    </main>
  );
}
