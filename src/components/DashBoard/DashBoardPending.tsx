import { useEffect, useRef } from 'react';
import fitty from 'fitty';

interface DashBoardPendingProps {
  data: number;
}
const DashBoardPending = ({ data }: DashBoardPendingProps) => {
  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      const fittyInstance = fitty(textRef.current, {
        minSize: 19,
        maxSize: 50,
        multiLine: false,
      });

      return () => fittyInstance.unsubscribe();
    }
  }, []);
  return (
    <article className="size-full bg-accent-base rounded-6 px-5 py-8 flex flex-col justify-between">
      <div className="flex flex-col gap-2">
        <span className="text-detail-sm text-assistive-strong">최근 11:56</span>{' '}
        <h4 className="text-title-base text-assistive-detail font-bold">상담대기</h4>
      </div>
      <div className="flex items-end justify-end text-title-base text-assistive-detail font-bold">
        <span className="text-heading-lg text-accent-strong pl-8 leading-[100%]" ref={textRef}>
          {data.toLocaleString()}
        </span>
        건
      </div>
    </article>
  );
};

export default DashBoardPending;
