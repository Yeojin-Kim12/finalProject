import React, { useState, useEffect } from 'react';
import DropdownWithReset from '../common/DropdownWithReset';
import { MagnifyingGlass, ArrowClockwise } from '@phosphor-icons/react';
import { CaretRight, CaretLeft, CaretDoubleLeft, CaretDoubleRight } from '@phosphor-icons/react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  ColumnFiltersState,
  getFilteredRowModel,
} from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '../ui/input';
import { operatorIdAll } from '../../lib/dropdownItems';
import SingleDatePicker from '@/components/common/SingleDatePicker';
import { formatDashDate } from '@/lib/utils';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading: boolean;
  error: any;
  selectedConsultant: string;
  setSelectedConsultant: (value: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

export function ConsultingPending<TData, TValue>({
  columns,
  data,
  isLoading,
  error,
  selectedConsultant,
  setSelectedConsultant,
  currentPage,
  setCurrentPage,
  date,
  setDate,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

  const [pagination, setPagination] = useState({
    pageIndex: 0, //초기 인덱스
    pageSize: 5, //페이지 길이
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    state: {
      columnFilters,
      pagination,
    },
  });

  const totalPages = table.getPageCount();
  const pagesToShow = 5;

  const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
  const endPage = Math.min(totalPages, startPage + pagesToShow - 1);

  const handleSelect = (value: string) => {
    if (value === '초기화') {
      setColumnFilters((filters) => filters.filter((filter) => filter.id !== 'consultant'));
    } else {
      setColumnFilters([{ id: 'consultant', value }]);
    }
    setSelectedConsultant(value);
  };

  const resetFilters = () => {
    table.setGlobalFilter('');
    // setSearch('');
    // setPreferredAt('');
    setColumnFilters([]);
    setSelectedConsultant('상담사');
  };

  useEffect(() => {
    setCurrentPage(table.getState().pagination.pageIndex + 1);
  }, [table.getState().pagination.pageIndex]);

  useEffect(() => {
    if (date) {
      const localDate = new Date(date);
      const formattedDate = formatDashDate(localDate);
      setColumnFilters((filters) => [
        ...filters.filter((filter) => filter.id !== 'preferredAt'),
        { id: 'preferredAt', value: formattedDate },
      ]);
    } else {
      setColumnFilters((filters) => filters.filter((filter) => filter.id !== 'preferredAt'));
    }
  }, [date]);

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
    table.setPageIndex(page - 1);
  };

  return (
    <>
      <section className="flex mb-8 mt-10 relative items-center">
        <MagnifyingGlass size={24} className={'text-assistive-divider absolute left-7 top-5'} />
        <Input
          type="text"
          placeholder="이름, 전화번호를 입력해주세요"
          value={table.getState().globalFilter ?? ''}
          onChange={(event) => table.setGlobalFilter(event.target.value)}
          className="w-[435px] pl-14 mr-7"
        />
        <div className="flex gap-3">
          <SingleDatePicker defaultLabel="상담날짜 선택" onChange={setDate} />
          <DropdownWithReset
            items={operatorIdAll}
            defaultLabel={selectedConsultant || '상담사'}
            value={selectedConsultant}
            onSelect={handleSelect}
            buttonWidth="w-[122px]"
            reset
          />
        </div>
        <div className="flex py-4 px-6 gap-3 absolute right-0 cursor-pointer">
          <span className="text-label-lg text-assistive-strong" onClick={resetFilters}>
            조건 초기화
          </span>
          <ArrowClockwise size={24} weight="light" className="text-assistive-strong" />
        </div>
      </section>
      <div className="flex">
        <h1 className="py-[10px] pl-6 pr-3 text-title-sm font-bold text-static-default">총 상담대기</h1>
        <span className="py-[10px] text-title-sm font-bold text-primary-default">
          {table.getCoreRowModel().rows.length}
        </span>
      </div>

      {/* ... existing JSX ... */}
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error loading data</div>
      ) : (
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
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
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
      )}
      {/* <DefaultPagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} /> */}

      <section className="flex items-center justify-center space-x-3 py-4 mt-11">
        <button
          className="border-none p-1"
          onClick={() => {
            table.setPageIndex(0);
            setCurrentPage(1);
          }}
          disabled={!table.getCanPreviousPage()}>
          <CaretDoubleLeft size={32} weight="light" className="text-assistive-divider" />
        </button>
        <button
          className="border-none p-1"
          onClick={() => {
            table.previousPage();
            setCurrentPage(currentPage - 1);
          }}
          disabled={!table.getCanPreviousPage()}>
          <CaretLeft size={32} weight="light" className="text-assistive-divider" />
        </button>
        {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
          const page = startPage + i;
          return (
            <span
              key={page}
              onClick={() => handlePageClick(page)}
              className={`flex h-10 w-10 px-4 justify-center rounded-10 items-center text-label-lg cursor-pointer ${
                page === currentPage
                  ? 'bg-primary-base font-bold text-primary-default'
                  : 'font-normal text-static-default'
              }`}>
              {page}
            </span>
          );
        })}
        <button
          className="border-none p-1"
          onClick={() => {
            table.nextPage();
            setCurrentPage(Math.min(currentPage + 1, totalPages));
          }}
          disabled={!table.getCanNextPage()}>
          <CaretRight size={32} weight="light" className="text-assistive-divider" />
        </button>
        <button
          className="border-none p-1"
          onClick={() => {
            table.setPageIndex(totalPages - 1);
            setCurrentPage(totalPages);
          }}
          disabled={!table.getCanNextPage()}>
          <CaretDoubleRight size={32} weight="light" className="text-assistive-divider" />
        </button>
      </section>
    </>
  );
}

// response
// "content": {
//   "consultPendingSummaries": [
//       {
//           "preferredAt": "2025-01-01",
//           "createdAt": "2024-08-20",
//           "consultant": "a-10",
//           "name": "2:37",
//           "phoneNumber": "01012341899",
//           "addConsultation": "true" //true 라면 추가 상담 뱃지 (lms가 아니라면 추가뱃지)
//       },
//     ]}
