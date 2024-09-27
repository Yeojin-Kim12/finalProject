import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { LabelCustomerRating } from '../ui/labelCustomerRating';
import { formatDateWithDots, formatPhoneNumber } from '@/lib/utils';

export interface ConsultingCompleted {
  adminConsultationId: number;
  name: string;
  tier: string;
  phoneNumber: string;
  createdAt: string;
  completedAt: string;
  consultant: string;
  contents: string;
  consultMessage: string;
  memberMessage: string;
}

export function formatDate(dateString: string): string {
  return dateString.split('T')[0].replace(/-/g, '.');
}

export const columnsCompleted = (
  handleCompletedClick: (adminConsultationId: number) => void,
): ColumnDef<ConsultingCompleted>[] => [
  {
    accessorKey: 'name',
    header: '고객명',
  },
  {
    accessorKey: 'tier',
    header: '고객등급',
    cell: ({ row }) => {
      const tier = row.original.tier;

      return (
        <LabelCustomerRating size="m" keyword={tier}>
          {tier}등급
        </LabelCustomerRating>
      );
    },
  },

  {
    accessorKey: 'phoneNumber',
    header: '전화번호',
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center">{formatPhoneNumber(row.original.phoneNumber)}</div>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: '상담신청일자',
    cell: ({ row }) => {
      return <span>{formatDateWithDots(row.original.createdAt)}</span>;
    },
  },
  {
    accessorKey: 'completedAt',
    header: '처리일자',
    cell: ({ row }) => {
      return <span>{formatDateWithDots(row.original.completedAt)}</span>;
    },
  },
  {
    accessorKey: 'consultant',
    header: '상담사',
    cell: ({ row }) => {
      const operatorData = row.original.consultant;
      return <div>{operatorData}</div>;
    },
  },
  {
    accessorKey: 'contents',
    header: '문의내역',
    cell: ({ row }) => {
      const { adminConsultationId } = row.original;
      return (
        <Button variant="outline" size="sm" onClick={() => handleCompletedClick(adminConsultationId)}>
          보기
        </Button>
      );
    },
  },
];
