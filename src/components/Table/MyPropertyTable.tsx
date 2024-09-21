import React, { useState, useEffect } from 'react';
import { TrashSimple } from '@phosphor-icons/react';
import { CaretRight, CaretLeft, CaretDoubleLeft, CaretDoubleRight } from '@phosphor-icons/react';
import axios from 'axios';

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
import { Button } from '@/components/ui/button';
import { Plus } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}
interface Identifiable {
  id: number;
}

export function MyPropertyTable<TData extends Identifiable, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [tableData, setTableData] = React.useState<TData[]>(data);
  const [pagination, setPagination] = useState({
    pageIndex: 0, //초기 인덱스
    pageSize: 5, //페이지 길이
  });
  const [currentPage, setCurrentPage] = useState(1);

  // const handleDelete = (id: number) => {
  //   const updatedData = tableData.filter((row) => row.id !== id);
  //   setTableData(updatedData);
  // };

  // HTTP DELETE 요청
  const handleDelete = async (id: number) => {
    const updatedData = tableData.filter((row) => row.id !== id);
    setTableData(updatedData);
    try {
      const response = await axios.delete(`/api/properties/${id}`);
      if (response.status === 200) {
        const updatedData = tableData.filter((row) => row.id !== id);
        setTableData(updatedData);
      } else {
        console.error('Failed to delete the property');
      }
    } catch (error) {
      console.error('Error deleting the property:', error);
    }
  };

  const columnsWithDelete = React.useMemo(() => {
    return columns.map((column) => {
      if (column.id === 'customColumn2') {
        return {
          ...column,
          cell: ({ row }: any) => (
            <div className="flex relative w-[150px] items-center">
              <TrashSimple
                size={24}
                weight="light"
                className="absolute left-0 cursor-pointer"
                onClick={() => handleDelete(row.original.id)}
              />
            </div>
          ),
        };
      }
      return column;
    });
  }, [columns, handleDelete]);

  const table = useReactTable({
    data: tableData,
    columns: columnsWithDelete,
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

  useEffect(() => {
    setCurrentPage(table.getState().pagination.pageIndex + 1);
  }, [table.getState().pagination.pageIndex]);

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
    table.setPageIndex(page - 1);
  };

  return (
    <>
      <div className="flex">
        <div className="flex items-end mb-3">
          <h1 className="py-[10px] pl-6 pr-3 text-title-sm font-bold text-static-default">매물 목록</h1>
          <span className="py-[10px] text-title-sm font-bold text-primary-default">
            {table.getCoreRowModel().rows.length}
          </span>
        </div>
        <div className="flex-grow mb-7">
          <div className="flex justify-end">
            <Link to="/property-add">
              <Button variant="primary" size="lg" className="gap-4">
                매물등록
                <Plus size={24} weight="bold" />
              </Button>
            </Link>
          </div>
        </div>
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
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
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
            setCurrentPage((prev) => Math.max(prev - 1, 1));
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
            setCurrentPage((prev) => Math.min(prev + 1, totalPages));
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
