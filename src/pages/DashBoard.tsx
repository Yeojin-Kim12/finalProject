import Breadcrumb from '@/components/common/Breadcrumb';
import DashBoardCards from '@/components/DashBoard/DashBoardCards';
import DashBoardProjectChart from '@/components/DashBoard/DashBoardProjectChart';
import DashBoardPropertyGraph from '@/components/DashBoard/DashBoardPropertyGraph';
import { dashboard2Data } from '@/constants/msData';

const DashBoard = () => {
  return (
    <>
      <div className="w-[1200px] mx-auto">
        <Breadcrumb links={['마이페이지', '대시보드']} />
      </div>
      <main className="w-[1200px] mx-auto flex flex-col gap-11 py-12">
        <DashBoardCards />

        <DashBoardProjectChart contents={dashboard2Data.contents} />
        <DashBoardPropertyGraph />
      </main>
    </>
  );
};

export default DashBoard;
