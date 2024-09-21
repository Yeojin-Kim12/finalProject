import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import StatusCard from './StatusCard';
import DropdownWithReset from '../common/DropdownWithReset';
const recruitmentStatus = [
  {
    value: 'openList',
    label: '모집중',
  },
  {
    value: 'closedList',
    label: '모집완료',
  },
];
interface PropertyItem {
  propertyId: number;
  propertyName: string;
}
const DashBoardPropertyGraph = () => {
  const [selectStatus, setSelectStatus] = React.useState<'openList' | 'closedList'>(
    recruitmentStatus[0].value as 'openList' | 'closedList',
  );
  const [selectProperty, setSelectProperty] = React.useState();

  const handleSelectStatus = (value: 'openList' | 'closedList') => {
    setSelectStatus(value);
    console.log(selectProperty);
  };
  const handleSelectProperty = () => {};

  const fetchDropdownSelect = async () => {
    const res = await axios.get('/api/admin/dashboard/dropdown-selects');
    console.log(res);
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
      setSelectProperty(statusData[selectStatus][0].value);
    }
  }, [statusData, selectStatus]);
  return (
    <section className="flex flex-col gap-9">
      <div className="flex items-center gap-4">
        <h3 className="text-title-xl text-static-default font-bold">매물현황</h3>
      </div>
      <div className="flex gap-4">
        <DropdownWithReset
          items={recruitmentStatus}
          defaultLabel={recruitmentStatus[0].label}
          buttonWidth="w-[150px]"
          onSelect={(value) => handleSelectStatus(value as 'openList' | 'closedList')}
        />
        {statusData && statusData[selectStatus] ? (
          <DropdownWithReset
            items={statusData[selectStatus]}
            defaultLabel={statusData[selectStatus][0].label}
            onSelect={() => handleSelectProperty()}
          />
        ) : null}
      </div>
      <div className="grid grid-cols-10 justify-items-center gap-9">
        <div className="w-[1px] h-full bg-assistive-strong"></div>
        <StatusCard label="상담신청" value={12} />
        <StatusCard label="상담완료" value={12} />
        <StatusCard label="상담대기" value={12} />
        <div className="w-[1px] h-full bg-assistive-strong"></div>
        <StatusCard label="전화" value={12} />
        <StatusCard label="카카오톡" value={12} />
        <StatusCard label="LMS" value={12} />
      </div>
    </section>
  );
};

export default DashBoardPropertyGraph;
