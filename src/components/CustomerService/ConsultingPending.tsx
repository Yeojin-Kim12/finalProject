import React from 'react';
import DropdownWithReset from '../common/DropdownWithReset';
import { MagnifyingGlass, ArrowClockwise, KeyReturn } from '@phosphor-icons/react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnFiltersState,
  getFilteredRowModel,
} from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '../ui/input';
import { operatorIdAll } from '../../lib/dropdownItems';
import SingleDatePicker from '@/components/common/SingleDatePicker';
import DefaultPagination from '../common/DefaultPagination';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchPendingConsultations } from '@/api/consulting';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  propertyId: number | undefined;
}

export function ConsultingPending<TData, TValue>({ columns, propertyId }: DataTableProps<TData, TValue>) {
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState<string>('');
  const [inputValue, setInputValue] = React.useState<string>('');
  const [date, setDate] = React.useState<Date | undefined>();
  const [selectedConsultant, setSelectedConsultant] = React.useState<string>('');
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

  const { data: pendingData } = useQuery({
    queryKey: [
      'pendingConsultation',
      {
        propertyId: propertyId!,
        search: search,
        consultant: selectedConsultant,
        preferredAt: date,
        page: page,
      },
    ],
    queryFn: fetchPendingConsultations,
    enabled: !!propertyId,
    placeholderData: keepPreviousData,
  });

  const table = useReactTable({
    data: pendingData?.contents[0].consultPendingSummaries || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  const resetFilters = () => {
    table.setGlobalFilter('');
    setSearch('');
    setDate(undefined);
    setColumnFilters([]);
    setSelectedConsultant('');
    setPage(1);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value); // 입력값 업데이트
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSearch(inputValue); // Enter 입력 시 search 업데이트
    }
  };
  return (
    <>
      <section className="flex mb-8 mt-10 relative items-center">
        <div className="relative">
          <MagnifyingGlass size={24} className={'text-assistive-divider absolute left-7 inset-y-0 my-auto'} />
          <Input
            type="input-base text"
            placeholder="이름, 전화번호를 입력해주세요"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="w-[435px] pl-14 mr-7"
          />
          <div className="absolute right-10 flex items-center gap-2 text-detail-base text-assistive-divider inset-y-0 my-auto">
            <KeyReturn />
            Enter
          </div>
        </div>
        <div className="flex gap-3">
          <SingleDatePicker defaultLabel={!date ? '상담날짜 선택' : ''} onChange={setDate} />
          <DropdownWithReset
            items={operatorIdAll}
            defaultLabel={selectedConsultant || '상담사'}
            value={selectedConsultant}
            onSelect={(value) => setSelectedConsultant(value)}
            buttonWidth="w-[122px]"
            reset
          />
        </div>
        <div className="flex py-4 px-6 gap-3 absolute right-0 cursor-pointer" onClick={resetFilters}>
          <span className="text-label-lg text-assistive-strong">조건 초기화</span>
          <ArrowClockwise size={24} weight="light" className="text-assistive-strong" />
        </div>
      </section>
      <div className="flex">
        <h1 className="py-[10px] pl-6 pr-3 text-title-sm font-bold text-static-default">총 상담대기</h1>
        <span className="py-[10px] text-title-sm font-bold text-primary-default">
          {pendingData?.totalCount}
        </span>
      </div>

      {/* ... existing JSX ... */}

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getCoreRowModel()?.rows.length !== 0 ? (
            table.getCoreRowModel()?.rows.map((row, index) => (
              <TableRow key={`table-${row.id}-${index}`} data-state={row.getIsSelected() && 'selected'}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              {columns.map((_, index) => (
                <TableCell key={index} className="h-24 text-center">
                  -
                </TableCell>
              ))}
            </TableRow>
          )}
        </TableBody>
      </Table>
      {pendingData?.totalPages !== 0 && (
        <DefaultPagination totalPages={pendingData?.totalPages} currentPage={page} onPageChange={setPage} />
      )}
    </>
  );
}
