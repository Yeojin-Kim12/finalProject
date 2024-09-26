import { ColumnDef } from '@tanstack/react-table';
// import { operatorId } from '../../lib/dropdownItems';
import Dropdown from '../common/Dropdown';
import { Button } from '@/components/ui/button';
import { CustomerInquiryProps } from '../CustomerService/CustomerInquiry';
import axios from 'axios';
import { BASE_URL } from '@/lib/constants';
import { useQuery } from '@tanstack/react-query';
import { getAuthHeaders } from '@/pages/LoginSignup/Login';

export interface ConsultingPending {
  name: string;
  phoneNumber: string;
  createdAt: string;
  preferredAt: string;
  consultant: string;
  consultingMessage: string;
  addConsultation: boolean;
}

export function formatDate(dateString: string): string {
  return dateString.split('T')[0].replace(/-/g, '.');
}

export const columnsPending = (
  handleViewClick: (props: CustomerInquiryProps) => void,
  propertyId: number | undefined,
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
    cell: ({ row }) => {
      const fetchConsultants = async () => {
        const res = await axios.get(`${BASE_URL}/api/admin/consultations/${propertyId}`, {
          headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders(),
          },
        });
        return res.data;
      };
      const { data } = useQuery({
        queryKey: ['Consultants'],
        queryFn: fetchConsultants,
      });

      const handleSelect = (value: string) => {
        row.original.consultant = value;
      };
      return row.original.consultant === null ? (
        <Dropdown
          items={data.consultantResponses}
          defaultLabel="a1-1"
          onSelect={handleSelect}
          buttonWidth="w-[99px]"
        />
      ) : (
        <span>{row.original.consultant}</span>
      );
    },
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
