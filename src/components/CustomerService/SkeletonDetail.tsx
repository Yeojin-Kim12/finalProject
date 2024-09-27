import { Skeleton } from '../ui/skeleton';

const SkeletonDetail = () => {
  return (
    <article className="flex flex-col mb-10 gap-7">
      <div className="flex flex-col gap-3">
        <Skeleton className="ml-3 w-[60px] h-[20px]" />
        <Skeleton className="ml-3 w-[150px] h-[40px]" />
      </div>
      <div className="flex justify-between">
        <div className="flex gap-10">
          <Skeleton className="flex-none object-cover w-[320px] h-[180px] rounded-5" />
          <div className="flex gap-4">
            <div className="flex flex-col self-center w-[64px] gap-3 text-detail-base text-assistive-strong">
              <Skeleton className="w-[150px] h-[20px]" />
              <Skeleton className="w-[150px] h-[20px]" />
              <Skeleton className="w-[100px] h-[20px]" />
              <Skeleton className="w-[200px] h-[20px]" />
            </div>
          </div>
        </div>

        <Skeleton className="self-end mr-11 w-[150px] h-[50px]" />
      </div>
    </article>
  );
};

export default SkeletonDetail;
