import { ColumnDef } from '@tanstack/react-table';
// import { operatorId } from '../../lib/dropdownItems';
// import Dropdown from '../common/Dropdown';
import { Button } from '@/components/ui/button';
import { CustomerInquiryProps } from '../CustomerService/CustomerInquiry';

export interface ConsultingPending {
  name: string;
  phoneNumber: string;
  createdAt: string;
  preferredAt: string;
  consultant: string;
  consultingMessage: string;
  addConsultation: boolean;
}

export const columnsPending = (
  handleViewClick: (props: CustomerInquiryProps) => void,
): ColumnDef<ConsultingPending>[] => [
  {
    accessorKey: 'name',
    header: '고객명',
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          {row.original.addConsultation && (
            <span className="flex text-center justify-center mb-7 bg-primary-base text-primary-default text-label-xs px-3 py-1 rounded-6 mr-2">
              추가
            </span>
          )}
          <span>{row.original.name}</span>
        </div>
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
  },
  {
    accessorKey: 'preferredAt',
    header: '희망상담일자',
  },
  {
    accessorKey: 'consultant',
    header: '상담사',
    // cell: ({ row }) => {
    //   const handleSelect = (value: string) => {
    //     row.original.consultant = value;
    //   };
    //   return (
    //     <Dropdown
    //       items={operatorId}
    //       defaultLabel={row.original.consultant || 'a1-1'}
    //       onSelect={handleSelect}
    //       buttonWidth="w-[99px]"
    //     />
    //   );
    // },
  },
  {
    accessorKey: 'contents',
    header: '문의내역',
    cell: ({ row }) => {
      const { name, phoneNumber, createdAt, preferredAt, consultingMessage } = row.original;
      return (
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            handleViewClick({
              name,
              phoneNumber,
              createdAt,
              preferredAt,
              consultingMessage,
              closePopup: () => {},
              onConsultingClick: () => {},
            })
          }>
          보기
        </Button>
      );
    },
  },
];
