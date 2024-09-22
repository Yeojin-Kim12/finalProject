import { Skeleton } from '../ui/skeleton';

const SkeletonCard = () => {
  const repeatCount = 4;

  return (
    <div className="flex">
      {Array.from({ length: repeatCount }).map((_, index) => (
        <div key={index} className="flex flex-col gap-4 px-4 pt-4 pb-7">
          <Skeleton className="w-[270px] h-[156px]" />
          <Skeleton className="w-[200px] h-[30px]" />
          <Skeleton className="w-[100px] h-[20px]" />
        </div>
      ))}
    </div>
  );
};

export default SkeletonCard;
