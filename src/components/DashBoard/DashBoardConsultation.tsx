import { getCurrentMonth } from '@/lib/utils';
import { Buildings } from '@phosphor-icons/react';
interface DashBoardConsultationProps {
  type: 'highest' | 'lowest';
  data: {
    propertyName: string;
    all: number;
  };
}
const DashBoardConsultation = ({ type, data = { propertyName: '', all: 0 } }: DashBoardConsultationProps) => {
  const currentMonth = getCurrentMonth();
  return (
    <article className="relative w-full p-9 border border-assistive-default rounded-5 flex flex-col gap-7">
      <div className="flex flex-col gap-2">
        <p className="text-detail-sm text-assistive-strong">{currentMonth}</p>
        <p className="text-title-base text-static-default font-bold">
          {type === 'highest' ? '상담신청수가 가장 많은' : '상담신청수가 가장 적은'}
        </p>
      </div>
      <div className="flex items-center gap-4 font-bold">
        <p className="text-title-2xl text-static-default">{data.propertyName}</p>
        <p
          className={`${type === 'highest' ? 'text-accent-strong' : 'text-secondary-default'} text-display-sm `}>
          {data.all.toLocaleString()}건
        </p>
      </div>
      <Buildings
        size={164}
        weight="bold"
        className="absolute my-auto text-assistive-alternative right-8  -z-10"
      />
    </article>
  );
};

export default DashBoardConsultation;
