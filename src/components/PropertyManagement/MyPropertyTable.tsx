import React from 'react';
import { TrashSimple } from '@phosphor-icons/react';
import axios from 'axios';
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Plus } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import DefaultPagination from '../common/DefaultPagination';
import { BASE_URL } from '@/lib/constants';
import { getAuthHeaders } from '@/utils/auth';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { columnsMyProperty } from './columnsMyProperty';

const MyPropertyTable = () => {
  const [currentPage, setCurrentPage] = React.useState(1);

  // 매물 리스트 fetch
  const fetchPropertyTable = async () => {
    const size = 5;
    const page = currentPage - 1;
    try {
      const res = await axios.get(`${BASE_URL}/api/admin/my-properties/table`, {
        params: { page, size },
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
        },
      });
      return res.data;
    } catch (error) {
      console.error('Error fetching property table:', error);
    }
  };
  const { data = [] } = useQuery({
    queryKey: ['properties', currentPage],
    queryFn: fetchPropertyTable,
    placeholderData: keepPreviousData,
  });

  // HTTP DELETE 요청
  const handleDelete = React.useCallback(async (id: number) => {
    try {
      const response = await axios.delete(`/api/properties/${id}`);
      if (response.status === 200) {
      } else {
        console.error('Failed to delete the property');
      }
    } catch (error) {
      console.error('Error deleting the property:', error);
    }
  }, []);

  const columnsWithDelete = React.useMemo(() => {
    return columnsMyProperty.map((column) => {
      if (column.id === 'customColumn2') {
        return {
          ...column,
          cell: ({ row }: any) =>
            typeof row.original.id === 'number' ? (
              <div className="flex relative items-center  cursor-pointer">
                <TrashSimple size={24} weight="light" onClick={() => handleDelete(row.original.id)} />
              </div>
            ) : null,
        };
      }
      return column;
    });
  }, [columnsMyProperty, handleDelete]);

  const rowsData =
    Array.isArray(data?.contents) && data?.contents?.length > 0
      ? data?.contents
      : [
          {
            id: '-',
            name: '-',
            totalCount: '-',
            consultationPendingCount: '-',
            createdAt: '-',
            endDate: '-',
            pending: '-',
          },
        ];
  const table = useReactTable({
    data: rowsData,
    columns: columnsWithDelete,
    getCoreRowModel: getCoreRowModel(),
  });
  const totalPages = data?.totalPages || 1;

  const handlePageChange = (newPage: number) => {
    if (newPage !== currentPage) {
      setCurrentPage(newPage);
    }
  };
  return (
    <section className="flex flex-col gap-11">
      <div>
        <div className="flex">
          <div className="flex items-end mb-3">
            <h1 className="py-[10px] pl-6 pr-3 text-title-sm font-bold text-static-default">매물 목록</h1>
            <span className="py-[10px] text-title-sm font-bold text-primary-default">{data.totalCount}</span>
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
            {table?.getHeaderGroups().map((headerGroup) => (
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
            {table.getCoreRowModel().rows?.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {data && data?.contents?.length === 0 && (
        <div>
          <DefaultPagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </section>
  );
};

export default MyPropertyTable;
