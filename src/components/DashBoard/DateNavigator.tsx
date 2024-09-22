import { formatDate } from '@/lib/utils';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';

// 날짜 포맷 함수 (YYYY.MM.)
const formatMonth = (date: Date) => {
  return `${date.getFullYear()}. ${('0' + (date.getMonth() + 1)).slice(-2)}.`; // YYYY.MM. 포맷
};

// 주간의 시작 날짜 계산
const getWeekStart = (endDate: Date) => {
  const start = new Date(endDate);
  start.setDate(endDate.getDate() - 6);
  return start;
};

// 월간의 시작 달 계산
const getMonthStart = (endDate: Date) => {
  const start = new Date(endDate);
  start.setMonth(endDate.getMonth() - 5);
  return start;
};

// Props 타입 정의
interface DateNavigatorProps {
  graphInterval: string;
  selectedDaily: Date;
  setSelectedDaily: (date: Date) => void;
  selectedWeekly: Date;
  setSelectedWeekly: (date: Date) => void;
  selectedMonthly: Date;
  setSelectedMonthly: (date: Date) => void;
}

const DateNavigator = ({
  graphInterval,
  selectedDaily,
  setSelectedDaily,
  selectedWeekly,
  setSelectedWeekly,
  selectedMonthly,
  setSelectedMonthly,
}: DateNavigatorProps) => {
  // 일간 날짜 변경
  const changeDaily = (days: number) => {
    const newDate = new Date(selectedDaily);
    newDate.setDate(newDate.getDate() + days);
    setSelectedDaily(newDate);
  };

  // 주간 날짜 변경
  const changeWeek = (weeks: number) => {
    const newEnd = new Date(selectedWeekly);
    newEnd.setDate(newEnd.getDate() + weeks * 7);
    setSelectedWeekly(newEnd);
  };

  // 월간 날짜 변경
  const changeMonth = (direction: number) => {
    const newEnd = new Date(selectedMonthly);
    newEnd.setDate(newEnd.getDate() - 1);
    newEnd.setMonth(newEnd.getMonth() + direction * 6);
    const lastDay = new Date(newEnd.getFullYear(), newEnd.getMonth() + 1, 0);
    setSelectedMonthly(lastDay);
  };

  return (
    <>
      {/* 일간 날짜 네비게이션 */}
      {graphInterval === 'DAILY' && (
        <>
          <CaretLeft
            className="size-7 cursor-pointer text-static-default hover:text-assistive-strong"
            weight="bold"
            onClick={() => changeDaily(-1)}
          />
          <div className="text-title-lg font-bold select-none">{formatDate(selectedDaily)}</div>
          <CaretRight
            className="size-7 cursor-pointer text-static-default hover:text-assistive-strong"
            weight="bold"
            onClick={() => changeDaily(1)}
          />
        </>
      )}
      {/* 주간 날짜 네비게이션 */}
      {graphInterval === 'WEEKLY' && (
        <>
          <CaretLeft
            className="size-7 cursor-pointer text-static-default hover:text-assistive-strong"
            weight="bold"
            onClick={() => changeWeek(-1)}
          />
          <div className="text-title-lg font-bold select-none ">
            {` ${formatDate(getWeekStart(selectedWeekly))} - ${formatDate(selectedWeekly)} `}
          </div>
          <CaretRight
            className="size-7 cursor-pointer text-static-default hover:text-assistive-strong"
            weight="bold"
            onClick={() => changeWeek(1)}
          />
        </>
      )}
      {/* 월간 날짜 네비게이션 */}
      {graphInterval === 'MONTHLY' && (
        <>
          <CaretLeft
            className="size-7 cursor-pointer text-static-default hover:text-assistive-strong"
            weight="bold"
            onClick={() => changeMonth(-1)}
          />
          <div className="text-title-lg font-bold select-none ">
            {` ${formatMonth(getMonthStart(selectedMonthly))} - ${formatMonth(selectedMonthly)} `}
          </div>
          <CaretRight
            className="size-7 cursor-pointer text-static-default hover:text-assistive-strong"
            weight="bold"
            onClick={() => changeMonth(1)}
          />
        </>
      )}
    </>
  );
};

export default DateNavigator;
