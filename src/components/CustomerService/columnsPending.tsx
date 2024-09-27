import { ColumnDef } from '@tanstack/react-table';
// import { operatorId } from '../../lib/dropdownItems';
import Dropdown from '../common/Dropdown';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { BASE_URL } from '@/lib/constants';
import { useQuery } from '@tanstack/react-query';
import { getAuthHeaders } from '@/utils/auth';
import { formatPhoneNumber, formatDateWithDots } from '@/lib/utils';

export interface ConsultingPending {
  memberConsultationId: number;
  name: string;
  phoneNumber: string;
  createdAt: string;
  preferredAt: string;
  consultant: string;
  consultingMessage: string;
  addConsultation: boolean;
}

export const columnsPending = (
  handleViewClick: (memberConsultationId: number) => void,
  propertyId: number,
): ColumnDef<ConsultingPending>[] => [
  {
    accessorKey: 'name',
    header: '고객명',
    cell: ({ row }) => {
      return (
        <div className="relative flex items-center pl-11">
          {row.original.addConsultation && (
            <span className="absolute left-6 -top-6 flex text-center justify-center mb-7 bg-primary-base text-primary-default text-label-xs px-3 py-1 rounded-6 mr-2 ">
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
    accessorKey: 'preferredAt',
    header: '희망상담일자',
    cell: ({ row }) => {
      return <span>{formatDateWithDots(row.original.preferredAt)}</span>;
    },
  },
  {
    accessorKey: 'consultant',
    header: '상담사',
    cell: ({ row }) => {
      const fetchConsultants = async (propertyId: number) => {
        const res = await axios.get(`${BASE_URL}/api/admin/consultations/${propertyId}`, {
          headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders(),
          },
        });
        return res.data.consultantResponses;
      };
      const { data, isLoading } = useQuery({
        queryKey: ['Consultants', propertyId],
        queryFn: () => fetchConsultants(propertyId!),
        enabled: !!propertyId,
      });

      // ui에 빈 값이 보이지 않게 하기 위함
      if (isLoading) {
        return;
      }
      const handleSelect = (value: string) => {
        row.original.consultant = value;
      };
      const consultants =
        data?.map((consultant: { consultant: string }) => ({
          value: consultant.consultant,
          label: consultant.consultant,
        })) || [];

      return row.original.consultant === null ? (
        <Dropdown items={consultants} defaultLabel="" onSelect={handleSelect} buttonWidth="w-[99px]" />
      ) : (
        <span>{row.original.consultant}</span>
      );
    },
  },
  {
    accessorKey: 'contents',
    header: '문의내역',
    cell: ({ row }) => {
      const { memberConsultationId } = row.original;
      return (
        <Button variant="outline" size="sm" onClick={() => handleViewClick(memberConsultationId)}>
          보기
        </Button>
      );
    },
  },
];
