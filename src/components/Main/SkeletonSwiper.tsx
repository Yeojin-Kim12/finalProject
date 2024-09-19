import { Skeleton } from '@/components/ui/skeleton';
import useResponsive from '@/hooks/useResponsive';

const SkeletonSwiper = () => {
  const { isMobile } = useResponsive();
  return (
    <>
      {isMobile ? (
        <div className="flex w-full justify-start aspect-[18/9] gap-8 mobile:pl-5 overflow-hidden">
          <Skeleton className="w-[90%] h-full !rounded-8 bg-primary-base" />
          <Skeleton className="w-[calc(10%-32px)] h-full !rounded-l-8 bg-primary-base" />
        </div>
      ) : (
        <div className="mx-auto flex w-[88%] aspect-[28/9] items-center ">
          <Skeleton className="w-[20%] h-[75%] !rounded-l-8 !rounded-r-0 bg-primary-base" />
          <Skeleton className="w-[57%] h-full !rounded-8 bg-primary-base" />
          <Skeleton className="w-[20%] h-[75%] !rounded-r-8 !rounded-l-0 bg-primary-base" />
        </div>
      )}
    </>
  );
};

export default SkeletonSwiper;
