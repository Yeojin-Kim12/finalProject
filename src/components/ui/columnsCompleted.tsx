import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { LabelCustomerRating } from './labelCustomerRating';
import { CustomerCompletedProps } from '../CustomerService/CustomerCompleted';

export interface ConsultingCompleted {
  name: string;
  tier: string;
  phoneNumber: string;
  createdAt: string;
  completedAt: string;
  consultant: string;
  contents: string;
  consultingMessage: string;
}

export function formatDate(dateString: string): string {
  return dateString.split('T')[0].replace(/-/g, '.');
}

export const columnsCompleted = (
  handleCompletedClick: (props: CustomerCompletedProps) => void,
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
  },
  {
    accessorKey: 'createdAt',
    header: '상담신청일자',
    cell: ({ row }) => {
      const createdAt = row.getValue('createdAt') as string;
      return <div className="text-center font-medium">{formatDate(createdAt)}</div>;
    },
  },
  {
    accessorKey: 'completedAt',
    header: '처리일자',
    cell: ({ row }) => {
      const completedAt = row.getValue('completedAt') as string;
      return <div className="text-center font-medium">{formatDate(completedAt)}</div>;
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
      const { name, phoneNumber, createdAt, completedAt, consultant, consultingMessage } = row.original;
      return (
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            handleCompletedClick({ name, phoneNumber, createdAt, completedAt, consultant, consultingMessage })
          }>
          보기
        </Button>
      );
    },
  },
];
