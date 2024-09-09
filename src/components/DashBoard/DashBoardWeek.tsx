import { formatDate } from '@/lib/utils';

interface DashBoardWeekProps {
  type: 'thisWeek' | 'lastWeek';
  data: {
    completed: number;
    all: number;
  };
}
interface dateTypeProps {
  type: 'thisWeek' | 'lastWeek';
}
const DashBoardWeek = ({ type, data }: DashBoardWeekProps) => {
  function getWeekDates({ type }: dateTypeProps) {
    const today = new Date();
    const dayOfWeek = today.getDay();

    let startOfWeek, endOfWeek;

    if (type === 'thisWeek') {
      startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - (dayOfWeek - 1));
      endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 4);
    } else if (type === 'lastWeek') {
      startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - (dayOfWeek + 6));
      endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 4);
    } else {
      throw new Error('error: getWeekDates error');
    }

    return `${formatDate(startOfWeek)} ~ ${formatDate(endOfWeek)}`;
  }

  const progress = Math.round((data.completed / data.all) * 100);
  const graphProgress = Math.max(progress, 0);
  const calProgress = graphProgress / 2;
  const turnProgress = calProgress / 100;
  return (
    <article className="size-full flex flex-col justify-between border border-assistive-default rounded-6 px-8 py-7 gap-9">
      <div className="flex flex-col gap-2">
        <span className="text-detail-sm text-assistive-strong">{getWeekDates({ type })}</span>
        <h4 className="text-title-base text-static-default font-bold">
          {type === 'thisWeek' ? '이번주' : '지난주 '} 상담진행률
        </h4>
      </div>
      {/* 그래프 */}
      <div className="relative w-full flex justify-center h-[110px]">
        <div className="absolute mx-auto bottom-0 z-10 text-heading-sm text-primary-default font-bold">
          {progress}%
        </div>
        <div className="relative w-[220px] h-[110px] rounded-t-full bg-assistive-base"></div>
        <div
          className="absolute left-0 -bottom-[11px] bg-assistive-base size-[21.5px] rounded-10"
          style={{ boxShadow: '-1px 5px 0 2px #fffff' }}></div>
        <div
          className="absolute right-0 -bottom-[11px] bg-assistive-base size-[21.5px] rounded-10"
          style={{ boxShadow: '1px 5px 0 2px #ffffff' }}></div>

        {progress !== 0 && (
          <>
            <div
              className="absolute top-0 left-0 size-[220px] rounded-10 bg-assistive-base"
              style={{
                background: `conic-gradient(from 270deg,#A8B9F5 ${calProgress}%, transparent ${calProgress}% 100%)`,
              }}>
              <div className="relative size-full">
                <div
                  className="absolute top-0 left-0 size-1/2 origin-bottom-right"
                  style={{ transform: `rotate(${turnProgress}turn)` }}>
                  <div className="absolute left-0 -bottom-[11px] bg-primary-alternative size-[22.5px] rounded-10"></div>
                </div>
              </div>
            </div>
            <div className="absolute left-0 -bottom-[11px] bg-primary-alternative size-[21.5px] rounded-10"></div>
          </>
        )}
        <div className="absolute mx-auto bottom-0 w-[176px] h-[88px] bg-static-white rounded-t-full"></div>
      </div>
      <div className="w-full flex flex-col">
        <div className="flex items-center justify-between gap-4">
          <h5 className="text-body-sm text-assistive-strong whitespace-nowrap">상담신청</h5>
          <span className="text-title-lg text-assistive-strong font-bold">{data.all.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <h5 className="text-body-sm text-assistive-strong whitespace-nowrap">상담완료</h5>
          <span className="text-title-lg text-primary-default font-bold">
            {data.completed.toLocaleString()}
          </span>
        </div>
      </div>
    </article>
  );
};

export default DashBoardWeek;
