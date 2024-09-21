import React from 'react';
import DashBoardToday from './DashBoardToday';
import DashBoardWeek from './DashBoardWeek';
import DashBoardFiveWeeks from './DashBoardFiveWeeks';
import DashBoardPending from './DashBoardPending';
import DashBoardConsultation from './DashBoardConsultation';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const DashBoardCards = () => {
  const [time, setTime] = React.useState<string>('');

  React.useEffect(() => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    setTime(`${hours}:${minutes}`);
  }, []);

  const fetchDashBoardCards = async () => {
    const res = await axios.get('/api/admin/dashboard/cards');
    return res.data;
  };
  const { data } = useQuery({
    queryKey: ['DashBoardCards'],
    queryFn: fetchDashBoardCards,
  });
  return (
    <>
      <section className="grid grid-cols-8 gap-6 grid-rows-[auto,250px] ">
        <div className="col-span-4 row-span-2">
          <DashBoardToday data={data?.today} time={time} />
        </div>
        <div className="col-span-2">
          <DashBoardWeek type="thisWeek" data={data?.thisWeekProgress} />
        </div>

        <div className="col-span-2">
          <DashBoardWeek type="lastWeek" data={data?.lastWeekProgress} />
        </div>

        <div className="col-span-3">
          <DashBoardFiveWeeks data={data?.totalNumberByWeek} />
        </div>

        <div className="col-span-1">
          <DashBoardPending data={data?.today.pending} time={time} />
        </div>
        <div className="col-span-4">
          <DashBoardConsultation type="highest" data={data?.highestConsultation} />
        </div>
        <div className="col-span-4">
          <DashBoardConsultation type="lowest" data={data?.lowestConsultation} />
        </div>
      </section>
    </>
  );
};

export default DashBoardCards;
