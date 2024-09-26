import { Label } from '../ui/label';
import React from 'react';
import { BASE_URL } from '@/lib/constants';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import ReactApexChart from 'react-apexcharts';
import { getAuthHeaders } from '@/utils/auth';

const DashBoardProjectChart = () => {
  const [currentPage, setCurrentPage] = React.useState(0);

  const fetchPropertyCard = async (page: number) => {
    const res = await axios.get(`${BASE_URL}/api/admin/dashboard/properties`, {
      params: {
        page: page,
        size: 5,
      },
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
    });

    return res.data;
  };

  const { data } = useQuery({
    queryKey: ['projectChart', currentPage],
    queryFn: () => fetchPropertyCard(currentPage),
  });
  const totalPages = data?.totalPages;
  const handlePrevPage = () => {
    if (currentPage !== 0) {
      setCurrentPage(currentPage - 1);
    } else setCurrentPage(totalPages - 1);
  };
  const handleNextPage = () => {
    if (currentPage !== totalPages - 1) {
      setCurrentPage(currentPage + 1);
    } else setCurrentPage(0);
  };
  const series =
    data && data?.body === null
      ? [
          {
            name: '상담완료',
            data: [0, 0, 0, 0, 0],
          },
          {
            name: '상담대기',
            data: [0, 0, 0, 0, 0],
          },
        ]
      : [
          {
            name: '상담완료',
            data: [...(data?.contents?.map((item: any) => item.all) || []), ...Array(5).fill(0)].slice(0, 5),
          },
          {
            name: '상담대기',
            data: [...(data?.contents?.map((item: any) => item.pending) || []), ...Array(5).fill(0)].slice(
              0,
              5,
            ),
          },
        ];

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'bar',
      width: '100%',
      offsetY: -15,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        dataLabels: {
          position: 'top',
        },
        columnWidth: '15%',
        rangeBarGroupRows: true,
        borderRadius: 10,
        borderRadiusApplication: 'end',
        colors: {
          backgroundBarColors: [],
          backgroundBarOpacity: 0,
        },
      },
    },
    dataLabels: {
      enabled: true,
      offsetY: -20,
      offsetX: 5,
      style: {
        colors: ['#778292'],
        fontSize: '13px',
        fontFamily: 'Pretendard, sans-serif',
      },
    },

    stroke: {
      show: true,
      width: 10,
      colors: ['transparent'],
    },
    xaxis: {
      categories:
        data?.body === null
          ? ['-', '-', '-', '-', '-']
          : [...(data?.contents?.map((item: any) => item.propertyName) || []), ...Array(5).fill('-')].slice(
              0,
              5,
            ),
      labels: {
        style: {
          fontSize: '17px',
          fontFamily: 'Pretendard, sans-serif',
          colors: '#778292',
        },
      },
      crosshairs: {
        show: false,
      },
    },
    yaxis: {
      min: 0,
      forceNiceScale: true,
      labels: {
        minWidth: 0,
        style: {
          fontSize: '13px',
          fontFamily: 'Pretendard, sans-serif',
        },
      },
    },
    tooltip: {
      y: {
        formatter: (val: number) => `${val}`,
      },
    },
    legend: {
      show: false,
    },

    colors: ['#7B93F0', '#F77394'],
  };
  let startX: number | null = null;

  const handleMouseDown = (event: React.MouseEvent) => {
    startX = event.clientX;
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (startX !== null) {
      const currentX = event.clientX;
      const distance = currentX - startX;

      if (distance > 100) {
        handlePrevPage();
        startX = null;
      } else if (distance < -100) {
        handleNextPage();
        startX = null;
      }
    }
  };

  const handleMouseUp = () => {
    startX = null; // 초기화
  };
  return (
    <section className="w-full flex flex-col gap-9">
      <div className="flex items-center gap-4">
        <h3 className="text-title-xl text-static-default font-bold">프로젝트별 현황</h3>
        {data && data?.totalElements && (
          <Label size="l" variant="primary" className="font-normal !rounded-10">
            {data.totalElements}
          </Label>
        )}
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex justify-end gap-6">
          <div className="flex items-center gap-3 text-assistive-strong">
            <div className="size-6 rounded-10 bg-primary-normal"></div>
            <span>상담완료</span>
          </div>
          <div className="flex items-center gap-3 text-assistive-strong">
            <div className="size-6 rounded-10 bg-accent-normal"></div>
            <span>상담대기</span>
          </div>
        </div>
        <div className="w-full flex flex-col items-center">
          <div
            className="w-full cursor-pointer"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}>
            <ReactApexChart options={options} series={series} type="bar" height={350} />
          </div>
          {data && data?.body !== null && (
            <div className="flex gap-6 items-center">
              <div className="size-5 text-assistive-default cursor-pointer" onClick={handlePrevPage}>
                <CaretLeft weight="bold" />
              </div>
              <div className="flex gap-3 cursor-pointer">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <span
                    key={index}
                    className={`swiper-pagination-bullet ${
                      index === currentPage ? 'swiper-pagination-bullet-active' : ''
                    }`}
                    onClick={() => setCurrentPage(index)}
                  />
                ))}
              </div>
              <div className="size-5 text-assistive-default cursor-pointer" onClick={handleNextPage}>
                <CaretRight weight="bold" />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DashBoardProjectChart;
