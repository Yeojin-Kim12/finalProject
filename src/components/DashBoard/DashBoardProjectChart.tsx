import ApexChart from 'react-apexcharts';
import { Label } from '../ui/label';

interface ChartData {
  propertyName: string;
  pending: number;
  all: number;
}
interface DashBoardProjectChartProps {
  contents: ChartData[];
}
const DashBoardProjectChart = ({ contents }: DashBoardProjectChartProps) => {
  const series = [
    {
      name: '상대완료',
      data: contents.map((item) => item.all),
    },
    {
      name: '상담대기',
      data: contents.map((item) => item.pending),
    },
  ];

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'bar',
      width: '100%',
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        dataLabels: {
          position: 'top',
        },
        horizontal: false,
        columnWidth: '30%',
        borderRadius: 10,
        borderRadiusApplication: 'around',
        hideZeroBarsWhenGrouped: true,
        colors: {
          backgroundBarColors: [],
          backgroundBarOpacity: 0,
        },
      },
    },
    dataLabels: {
      enabled: true,
      offsetY: -15,
      offsetX: 5,
      style: {
        colors: ['#778292'],
        fontSize: '13px',
      },
    },
    stroke: {
      show: true,
      width: 10,
      colors: ['transparent'],
    },
    xaxis: {
      categories: contents.map((item) => item.propertyName),
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
      labels: {
        style: {
          fontSize: '13px',
          fontFamily: 'Pretendard, sans-serif',
        },
      },
      max: (max) => {
        max = max + 20;
        return max;
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

  return (
    <section className="w-full flex flex-col gap-9">
      <div className="flex items-center gap-4">
        <h3 className="text-title-xl text-static-default font-bold">프로젝트별 현황</h3>
        <Label size="l" variant="primary" className="font-normal !rounded-10">
          15
        </Label>
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
        <div className="w-full">
          <ApexChart options={options} series={series} type="bar" height={350} />
        </div>
      </div>
    </section>
  );
};

export default DashBoardProjectChart;
