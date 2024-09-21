import { getCurrentMonth, getWeekOfMonth } from '@/lib/utils';
import { IconTriangleFilled, IconTriangleInvertedFilled } from '@tabler/icons-react';

interface DashBoardFiveWeeksProps {
  data: number[];
}
const DashBoardFiveWeeks = ({ data = [0, 0, 0, 0, 0] }: DashBoardFiveWeeksProps) => {
  const currentMonth = getCurrentMonth();
  const renderComparison = () => {
    if (data.length >= 2) {
      const thisWeek = data[data.length - 1];
      const lastWeek = data[data.length - 2];
      const difference = thisWeek - lastWeek;
      switch (true) {
        // 증가
        case difference > 0:
          return (
            <div className="w-fit flex gap-3 items-center p-3 rounded-4 bg-accent-base text-accent-strong text-label-base font-bold">
              <span>지난주 대비 {difference.toLocaleString()}건</span>
              <IconTriangleFilled size={16} />
            </div>
          );
        // 감소
        case difference < 0:
          return (
            <div className="w-fit flex gap-3 items-center p-3 rounded-4 bg-secondary-base text-secondary-default text-label-base font-bold">
              <span>지난주 대비 {Math.abs(difference).toLocaleString()}건</span>
              <IconTriangleInvertedFilled size={16} />
            </div>
          );
        // 동일
        case difference === 0:
          return (
            <div className="w-fit flex gap-3 items-center p-3 rounded-4 bg-highlight-base text-highlight-strong text-label-base font-bold">
              <span>지난주와 동일</span>
            </div>
          );
      }
    } else {
      return null;
    }
  };
  const getWeeksLabel = (length: number): string[] => {
    const result = [];
    const today = new Date();

    for (let i = 0; i < length; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() - i * 7);

      const month = currentDate.getMonth() + 1;
      const weekOfMonth = getWeekOfMonth(currentDate);

      result.push(`${month}월 ${weekOfMonth}째주`);
    }

    return result.reverse();
  };

  const transformData = (data: number[]): { all: string; height: string; label: string }[] => {
    const maxAll = Math.max(...data.map((item) => item));
    const lastWeeksLabels = getWeeksLabel(data.length);

    return data.map((item, index) => {
      let percentage = Math.round((item / maxAll) * 100);
      if (percentage === 0) {
        percentage = 0;
      } else if (percentage < 15) {
        percentage = 15;
      }
      const displayAll = item === 0 ? '-' : item.toLocaleString();
      return {
        all: displayAll,
        height: `${percentage}%`,
        label: lastWeeksLabels[index],
      };
    });
  };
  const graphData = transformData(data);
  return (
    <article className="flex flex-col justify-between size-full border border-assistive-default rounded-6 p-8 gap-6">
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-2">
          <span className="text-detail-sm text-assistive-strong">{currentMonth}</span>
          <h4 className="text-title-base text-static-default font-bold">주별 상담신청수</h4>
        </div>
        {renderComparison()}
      </div>
      <div className="flex justify-evenly gap-4 text-detail-sm text-assistive-strong">
        {graphData.map((item, index) => (
          <div key={item.label} className="flex flex-col items-center justify-end gap-4">
            <div className="h-[80px] flex flex-col gap-2 items-center justify-end">
              <span>{item.all}</span>
              <div
                className={`w-6 rounded-t-6 ${index === graphData.length - 1 ? 'bg-primary-alternative' : 'bg-assistive-alternative'}`}
                style={{ height: item.height }}></div>
            </div>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </article>
  );
};

export default DashBoardFiveWeeks;
