import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import useResponsive from '@/hooks/useResponsive';
import { CaretDoubleLeft, CaretDoubleRight, CaretLeft, CaretRight } from '@phosphor-icons/react';
import { useState } from 'react';

const DefaultPagination = ({
  totalPages,
  onPageChange,
}: {
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  const { isMobile } = useResponsive();
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const pageSize = isMobile ? 1 : 5; // 한 번에 표시할 페이지 수

  const startPage = Math.floor((currentPage - 1) / pageSize) * pageSize + 1;
  const endPage = Math.min(startPage + pageSize - 1, totalPages);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      onPageChange(page);
    }
  };

  return (
    <Pagination>
      <PaginationContent className={`${isMobile ? 'px-5 py-3 gap-2' : 'px-6 py-4 gap-3'} items-center`}>
        {!isMobile && (
          <PaginationItem>
            <PaginationLink
              aria-label="처음 페이지로 이동"
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              className={`flex w-auto h-auto p-0 ${currentPage === 1 ? 'cursor-default' : 'cursor-pointer'}`}>
              <CaretDoubleLeft
                size={32}
                weight="thin"
                className={`${currentPage === 1 ? 'text-assistive-divider' : 'text-static-default'}`}
              />
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationPrevious
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`flex p-0 ${currentPage === 1 ? 'cursor-default' : 'cursor-pointer'}`}>
            <CaretLeft
              size={isMobile ? 24 : 32}
              weight="thin"
              className={`${currentPage === 1 ? 'text-assistive-divider' : 'text-static-default'}`}
            />
          </PaginationPrevious>
        </PaginationItem>

        {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              isActive={page === currentPage}
              onClick={() => handlePageChange(page)}
              className={`text-label-lg mobile:text-label-sm-m font-normal w-10 mobile:w-8 h-10 mobile:h-8 ${
                page === currentPage
                  ? 'bg-primary-base text-primary-default text-label-lg mobile:text-label-sm-m font-bold'
                  : ''
              } border-0 rounded-full cursor-pointer`}>
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`flex p-0 ${currentPage === totalPages ? 'cursor-default' : 'cursor-pointer'}`}>
            <CaretRight
              size={isMobile ? 24 : 32}
              weight="thin"
              className={`${currentPage === totalPages ? 'text-assistive-divider' : 'text-static-default'}`}
            />
          </PaginationNext>
        </PaginationItem>

        {!isMobile && (
          <PaginationItem>
            <PaginationLink
              aria-label="마지막 페이지로 이동"
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
              className={`flex w-auto h-auto p-0 ${currentPage === totalPages ? 'cursor-default' : 'cursor-pointer'}`}>
              <CaretDoubleRight
                size={32}
                weight="thin"
                className={`${currentPage === totalPages ? 'text-assistive-divider' : 'text-static-default'}`}
              />
            </PaginationLink>
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default DefaultPagination;
