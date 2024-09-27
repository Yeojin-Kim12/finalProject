import { ColumnDef } from '@tanstack/react-table';
import { Label } from '@/components/ui/label';
import { PencilSimple, TrashSimple } from '@phosphor-icons/react';

export interface MyProperty {
  id: number;
  name: string;
  createdAt: string;
  endDate: string;
  totalCount: number;
  pending: boolean | string;
  consultationPendingCount: number;
}

export const columnsMyProperty: ColumnDef<MyProperty>[] = [
  {
    accessorKey: 'name',
    header: '매물명',
  },
  {
    accessorKey: 'totalCount',
    header: '세대수',
  },
  {
    accessorKey: 'consultationPendingCount',
    header: '상담대기',
  },
  {
    accessorKey: 'pending',
    header: '모집상태',
    cell: ({ row }) => {
      return row.original.pending === '-' ? (
        '-'
      ) : row.original.pending === true ? (
        <Label size="m" variant="highlight">
          모집중
        </Label>
      ) : (
        <Label size="m" variant="assistive" className="!text-static-default">
          모집완료
        </Label>
      );
    },
  },
  {
    accessorKey: 'endDate',
    header: '마감기한',
  },
  {
    accessorKey: 'createdAt',
    header: '등록일',
  },
  {
    id: 'customColumn1',
    header: '', // No header for this column
    cell: ({ row }) => {
      return typeof row.original.id === 'number' ? (
        <div className="flex relative w-[50px] items-center">
          <PencilSimple size={24} weight="light" className="absolute right-0 cursor-pointer" />
        </div>
      ) : null;
    },
  },
  {
    id: 'customColumn2',
    header: '', // No header for this column
    cell: ({ row }) => {
      return typeof row.original.id === 'number' ? (
        <div className="flex relative w-[150px] items-center">
          <TrashSimple size={24} weight="light" className="absolute left-0 cursor-pointer" />
        </div>
      ) : null;
    },
  },
];
