import DashBoardConsultation from '@/components/DashBoard/DashBoardConsultation';
import DashBoardFiveWeeks from '@/components/DashBoard/DashBoardFiveWeeks';
import DashBoardPending from '@/components/DashBoard/DashBoardPending';
import DashBoardToday from '@/components/DashBoard/DashBoardToday';
import DashBoardWeek from '@/components/DashBoard/DashBoardWeek';
import { DashBoardData } from '@/constants/msData';

const DashBoard = () => {
  return (
    <main className="w-[1200px] mx-auto py-12">
      <section className="grid grid-cols-8 gap-6 grid-rows-[auto,250px] ">
        <div className="col-span-4 row-span-2">
          <DashBoardToday data={DashBoardData.today} />
        </div>
        <div className="col-span-2">
          <DashBoardWeek type="thisWeek" data={DashBoardData.this_week} />
        </div>

        <div className="col-span-2">
          <DashBoardWeek type="lastWeek" data={DashBoardData.last_week} />
        </div>

        <div className="col-span-3">
          <DashBoardFiveWeeks data={DashBoardData.last_five_weeks} />
        </div>

        <div className="col-span-1">
          <DashBoardPending data={DashBoardData.today.pending} />
        </div>
        <div className="col-span-4">
          <DashBoardConsultation type="highest" data={DashBoardData.highest_consultation} />
        </div>
        <div className="col-span-4">
          <DashBoardConsultation type="lowest" data={DashBoardData.lowest_consultation} />
        </div>
      </section>
    </main>
  );
};

export default DashBoard;
