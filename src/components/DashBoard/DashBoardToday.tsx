interface GraphProps {
  data: {
    pending: number;
    completed: number;
    all: number;
  };
}
const DashBoardToday = ({ data }: GraphProps) => {
  const progress = Math.round((data.completed / data.all) * 100);
  const graphProgress = Math.max(progress, 9);
  const calProgress = graphProgress - 4.1;
  const deg = Math.round((graphProgress / 100) * 360);

  return (
    <article className="relative flex flex-col justify-between size-full border border-assistive-default rounded-6 p-9">
      <div className="flex flex-col gap-4">
        <span className="text-detail-lg text-assistive-strong">최근 11:56</span>
        <h4 className="text-title-2xl text-static-default font-bold">오늘의 상담진행률</h4>
        <div className="text-display-lg text-primary-default font-bold">{progress}%</div>
      </div>

      <div className="w-full flex items-end">
        <div className="w-[160px] flex flex-col gap-7">
          <div className="w-full flex items-center justify-between">
            <span className="text-body-lg text-assistive-strong ">상담신청</span>
            <span className="text-title-xl text-assistive-strong font-bold">{data.all.toLocaleString()}</span>
          </div>
          <div className="w-full flex items-center justify-between">
            <span className="text-body-lg text-assistive-strong">상담대기</span>
            <span className="text-title-xl text-accent-strong font-bold">
              {data.pending.toLocaleString()}
            </span>
          </div>
          <div className="w-full flex items-center justify-between">
            <span className="text-body-lg text-assistive-strong">상담완료</span>
            <span className="text-title-xl text-primary-default font-bold">
              {data.completed.toLocaleString()}
            </span>
          </div>
        </div>
        <div className="absolute bottom-7 right-7 flex items-center justify-center size-[340px]">
          {/* 도넛 그래프 */}
          {progress !== 0 && (
            <>
              <div
                className="size-[340px] rounded-full bg-assistive-base transition-all duration-300"
                style={{
                  background: `conic-gradient(from 0.021turn,#7B93F0 ${calProgress}%, transparent ${calProgress}% 100%)`,
                }}></div>
              <div className="absolute top-0 right-0 size-1/2 origin-bottom-left rotate-0">
                <div className="absolute top-[1px] bg-primary-normal w-[40px] h-[91.3px] rounded-bl-5 rounded-t-7 skew-y-[10deg]"></div>
              </div>
              <div
                className={`absolute top-0 right-0 size-1/2 origin-bottom-left `}
                style={{ transform: `rotate(${deg}deg)` }}>
                <div className="absolute top-[1px] -left-[40px] bg-primary-normal w-[40px] h-[91.3px] rounded-br-5 rounded-t-7 -skew-y-[10deg]"></div>
              </div>
            </>
          )}
          <div className="absolute m-auto size-[160px]  bg-static-white rounded-10"></div>
          <div className="absolute m-auto size-[300px] bg-assistive-base rounded-10 -z-10"></div>
        </div>
      </div>
    </article>
  );
};

export default DashBoardToday;
