import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import StatusCard from './StatusCard';
import DropdownWithReset from '../common/DropdownWithReset';
import DateNavigator from './DateNavigator';
import { BASE_URL } from '@/lib/constants';
import { initializeGraphRequirements, recruitmentStatus, timePeriods } from './constants';
import { formatDashDate } from '@/lib/utils';
import ReactApexChart from 'react-apexcharts';
import { getAuthHeaders } from '@/utils/auth';

interface PropertyItem {
  propertyId: number;
  propertyName: string;
}
const DashBoardPropertyGraph = () => {
  const [selectStatus, setSelectStatus] = React.useState<'openList' | 'closedList'>(
    recruitmentStatus[0]?.value as 'openList' | 'closedList',
  );
  const [selectProperty, setSelectProperty] = React.useState<string>();
  const [graphInterval, setGraphInterval] = React.useState<string>(timePeriods[0]?.value);

  const [selectedDaily, setSelectedDaily] = React.useState<Date>(new Date());
  const [selectedWeekly, setSelectedWeekly] = React.useState<Date>(new Date());
  const [selectedMonthly, setSelectedMonthly] = React.useState<Date>(new Date());

  // 모집상태 선택
  const handleSelectStatus = (value: 'openList' | 'closedList') => {
    setSelectStatus(value);
  };
  // 매물 선택
  const handleSelectProperty = (value: any) => {
    setSelectProperty(value);
  };

  // 매물 Dropdown axios
  const fetchDropdownSelect = async () => {
    const res = await axios.get(`${BASE_URL}/api/admin/dashboard/dropdown-selects`, {
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
    });
    const transformedData = {
      openList: res.data.openList.map((item: PropertyItem) => ({
        value: item.propertyId,
        label: item.propertyName,
      })),
      closedList: res.data.closedList.map((item: PropertyItem) => ({
        value: item.propertyId,
        label: item.propertyName,
      })),
    };
    return transformedData;
  };
  const { data: statusData } = useQuery({
    queryKey: ['DashBoardStatus'],
    queryFn: fetchDropdownSelect,
  });
  React.useEffect(() => {
    if (statusData && statusData[selectStatus]) {
      setSelectProperty(statusData[selectStatus][0]?.value);
    }
  }, [statusData, selectStatus]);
  // 매물 초기화
  React.useEffect(() => {}, [selectProperty]);

  // 매물현황 axios
  const fetchPropertyGraph = async () => {
    const end = (() => {
      switch (graphInterval) {
        case 'DAILY':
          return formatDashDate(selectedDaily);
        case 'WEEKLY':
          return formatDashDate(selectedWeekly);
        case 'MONTHLY':
          return formatDashDate(selectedMonthly);
        default:
          return '';
      }
    })();
    const res = await axios.get(`${BASE_URL}/api/admin/dashboard/properties/${selectProperty}`, {
      params: {
        end: end,
        graphInterval: graphInterval,
      },
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
    });
    return res.data;
  };

  const { data: graphData } = useQuery({
    queryKey: [
      'ProperyGraphData',
      selectProperty,
      graphInterval,
      selectedDaily,
      selectedWeekly,
      selectedMonthly,
    ],
    queryFn: fetchPropertyGraph,
    enabled: !!selectProperty,
  });

  const processedGraphData = {
    pending: graphData?.pending || 0,
    completed: graphData?.completed || 0,
    all: graphData?.all || 0,
    phone: graphData?.phone || 0,
    channel: graphData?.channel || 0,
    lms: graphData?.lms || 0,
    graphRequirements: (() => {
      if (graphData?.graphRequirements) {
        const pendingCounts = graphData.graphRequirements.map((item: any) => item.pending || 0);
        const completedCounts = graphData.graphRequirements.map((item: any) => item.completed || 0);
        const allCounts = graphData.graphRequirements.map((item: any) => item.all || 0);

        return [
          {
            name: '상담신청',
            data: allCounts,
          },
          {
            name: '상담완료',
            data: completedCounts,
          },
          {
            name: '상담대기',
            data: pendingCounts,
          },
        ];
      } else {
        return initializeGraphRequirements(graphInterval);
      }
    })(),
  };

  // xasis
  const generateXAxisCategories = () => {
    switch (graphInterval) {
      case 'DAILY': {
        return Array.from({ length: 24 }, (_, i) => `${i + 1}시`);
      }

      case 'WEEKLY': {
        const categories = [];
        const startDate = new Date(selectedWeekly);

        for (let i = 6; i >= 0; i--) {
          const date = new Date(startDate);
          date.setDate(startDate.getDate() - i);
          categories.push(formatDashDate(date));
        }
        return categories;
      }

      case 'MONTHLY': {
        // selectedMonthly의 해당 월부터 이전 6개월의 데이터 생성
        const categories = [];
        const startDate = new Date(selectedMonthly);
        startDate.setDate(1); // 해당 월의 첫 날로 설정

        for (let i = 0; i < 6; i++) {
          const month = startDate.getMonth() - i;
          const year = startDate.getFullYear() + Math.floor(month / 12);
          const formattedMonth = new Date(year, month % 12, 1).toLocaleString('default', { month: 'long' });
          categories.push(formattedMonth);
        }
        return categories.reverse(); // 월 순서대로 반환
      }

      default:
        return [];
    }
  };
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'area',
      toolbar: { show: false },
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: 0.1,
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'horizontal',
        opacityTo: 0.2,
        stops: [0, 90, 100],
      },
    },
    stroke: {
      curve: 'smooth',
      width: 1,
    },
    tooltip: { style: { fontSize: '13px', fontFamily: 'Pretendard, sans-serif' }, x: { show: false } },
    xaxis: {
      categories: generateXAxisCategories(),
      tooltip: {
        enabled: false,
      },
      labels: { style: { colors: '#778292', fontSize: '17px', fontFamily: 'Pretendard' } },
      crosshairs: {
        show: true,
      },
    },
    yaxis: { labels: { style: { fontSize: '13px', fontFamily: 'Pretendard, sans-serif' } } },
    legend: {
      show: false,
    },
    colors: ['#119ACB', '#204AE5', '#F4436F'],
  };
  return (
    <section className="flex flex-col gap-9">
      <div className="flex items-center gap-4">
        <h3 className="text-title-xl text-static-default font-bold">매물현황</h3>
      </div>
      <div className="flex gap-4">
        <DropdownWithReset
          items={recruitmentStatus}
          defaultLabel={recruitmentStatus[0]?.label}
          buttonWidth="w-[150px]"
          onSelect={(value) => handleSelectStatus(value as 'openList' | 'closedList')}
          value={selectStatus}
        />
        {statusData && statusData[selectStatus]?.length !== 0 ? (
          <DropdownWithReset
            items={statusData[selectStatus]}
            defaultLabel={statusData[selectStatus][0]?.label}
            onSelect={(value) => handleSelectProperty(value)}
            value={selectProperty}
          />
        ) : null}
      </div>
      <div className="flex gap-9 items-center">
        <DropdownWithReset
          items={timePeriods}
          defaultLabel={timePeriods[0].label}
          onSelect={(value) => setGraphInterval(value)}
          value={graphInterval}
          buttonClassName="!shadow-none font-bold"
        />
        <div className="grow flex items-center justify-between">
          <DateNavigator
            graphInterval={graphInterval}
            selectedDaily={selectedDaily}
            setSelectedDaily={setSelectedDaily}
            selectedWeekly={selectedWeekly}
            setSelectedWeekly={setSelectedWeekly}
            selectedMonthly={selectedMonthly}
            setSelectedMonthly={setSelectedMonthly}
          />
        </div>
        <div className="w-[1px] h-[76px] bg-assistive-default"></div>
        <div className="grow-0 flex items-end gap-9">
          <StatusCard label="상담신청" value={processedGraphData?.all} />
          <StatusCard label="상담완료" value={processedGraphData?.completed} />
          <StatusCard label="상담대기" value={processedGraphData?.pending} />
        </div>
        <div className="w-[1px] h-[76px] bg-assistive-default"></div>
        <div className="grow-0 flex items-end gap-9">
          <StatusCard label="전화" value={processedGraphData?.phone} />
          <StatusCard label="카카오톡" value={processedGraphData?.channel} />
          <StatusCard label="LMS" value={processedGraphData?.lms} />
        </div>
      </div>
      <div>
        <ReactApexChart
          options={options}
          series={processedGraphData.graphRequirements}
          type="area"
          height={350}
        />
      </div>
    </section>
  );
};

export default DashBoardPropertyGraph;
