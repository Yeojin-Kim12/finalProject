import React, { useState, useEffect } from 'react';
import DropdownWithReset from '../common/DropdownWithReset';
import { MagnifyingGlass } from '@phosphor-icons/react';
import {
  CaretRight,
  CaretLeft,
  CaretDoubleLeft,
  CaretDoubleRight,
  ArrowClockwise,
} from '@phosphor-icons/react';
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
import { operatorIdAll, customerRating } from '../../lib/dropdownItems';
import SingleDatePicker from '@/components/common/SingleDatePicker';
import { formatDashDate } from '@/lib/utils';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  selectedConsultant: string;
  setSelectedConsultant: React.Dispatch<React.SetStateAction<string>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  totalPages: number;
  pageSize: number;
}

export function ConsultingCompleted<TData, TValue>({
  columns,
  data,
  selectedConsultant,
  setSelectedConsultant,
  currentPage,
  setCurrentPage,
  date,
  setDate,
  totalPages,
  pageSize,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

  const [selectedRating, setSelectedRating] = useState<string>('고객등급');

  const [pagination, setPagination] = useState({
    pageIndex: currentPage - 1,
    pageSize: pageSize,
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    pageCount: totalPages,
    state: {
      columnFilters,
      pagination,
    },
  });

  const pagesToShow = 5;
  const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
  const endPage = Math.min(totalPages, startPage + pagesToShow - 1);

  const handleSelect = (filterType: 'consultant' | 'tier', value: string, defaultLabel: string) => {
    if (value === defaultLabel) {
      setColumnFilters((filters) => filters.filter((filter) => filter.id !== filterType));
    } else {
      setColumnFilters([{ id: filterType, value }, ...columnFilters.filter((f) => f.id !== filterType)]);
    }

    if (filterType === 'consultant') {
      setSelectedConsultant(value);
    } else if (filterType === 'tier') {
      setSelectedRating(value);
    }
  };

  const resetFilters = () => {
    table.setGlobalFilter('');
    setColumnFilters([]);
    setSelectedConsultant('상담사');
    setSelectedRating('고객등급');
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
    setPagination((prev) => ({ ...prev, pageIndex: page - 1 }));
  };

  return (
    <>
      <div className="flex mb-8 mt-10 relative">
        <MagnifyingGlass size={24} className={'text-assistive-divider absolute left-7 top-5'} />
        <Input
          type="text"
          placeholder="이름, 전화번호를 입력해주세요"
          value={table.getState().globalFilter ?? ''}
          onChange={(event) => table.setGlobalFilter(event.target.value)}
          className="w-[435px] pl-14 mr-7"
        />
        <div className="space-x-3">
          <SingleDatePicker defaultLabel="상담날짜 선택" onChange={setDate} />
          <DropdownWithReset
            items={customerRating}
            defaultLabel={selectedRating || '고객등급'}
            value={selectedRating}
            buttonWidth="w-[138px]"
            onSelect={(value) => handleSelect('tier', value, '고객등급')}
            reset
          />
          <DropdownWithReset
            items={operatorIdAll}
            defaultLabel={selectedConsultant || '상담사'}
            value={selectedConsultant}
            buttonWidth="w-[122px]"
            onSelect={(value) => handleSelect('consultant', value, '상담사')}
            reset
          />
        </div>
        <div className="flex py-4 px-6 gap-3 absolute right-0 cursor-pointer">
          <span className="cursor-pointer text-label-lg text-assistive-strong" onClick={resetFilters}>
            조건 초기화
          </span>
          <ArrowClockwise size={24} weight="light" className="text-assistive-strong" />
        </div>
      </div>
      <div className="flex">
        <h1 className="py-[10px] pl-6 pr-3 text-title-sm font-bold text-static-default">총 상담완료</h1>
        <span className="py-[10px] text-title-sm font-bold text-primary-default">
          {table.getCoreRowModel().rows.length}
        </span>
      </div>

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
      <section className="flex items-center justify-center space-x-3 py-4 mt-11">
        <button className="border-none p-1" onClick={() => handlePageClick(1)} disabled={currentPage === 1}>
          <CaretDoubleLeft size={32} weight="light" className="text-assistive-divider" />
        </button>
        <button
          className="border-none p-1"
          onClick={() => handlePageClick(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}>
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
          onClick={() => handlePageClick(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}>
          <CaretRight size={32} weight="light" className="text-assistive-divider" />
        </button>
        <button
          className="border-none p-1"
          onClick={() => handlePageClick(totalPages)}
          disabled={currentPage === totalPages}>
          <CaretDoubleRight size={32} weight="light" className="text-assistive-divider" />
        </button>
      </section>
    </>
  );
}
