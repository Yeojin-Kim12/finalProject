import useResponsive from '@/hooks/useResponsive';
import { Skeleton } from '../ui/skeleton';

const SkeletonSelectedList = () => {
  const { isDesktop } = useResponsive();
  const itemNumber = isDesktop ? 9 : 6;
  return (
    <>
      <section className="block mobile:hidden">
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-title-2xl font-bold">전체 목록</p>
            <p className="text-detail-lg">표시되는 가격은 최소 평형 기준 최저가입니다</p>
          </div>
          <div className="flex justify-between items-center">
            <Skeleton className="w-[200px] h-[20px]" />
            <Skeleton className="w-[130px] h-[46px]" />
          </div>
          <div className="grid grid-cols-3 tablet:grid-cols-2">
            {Array.from({ length: itemNumber }).map((_, index) => (
              <div key={`list-${index}`} className="flex flex-col gap-6 px-5 pt-6 pb-9 h-[380px]">
                <Skeleton className="w-[320px] h-[180px] !rounded-5" />
                <Skeleton className="w-[180px] h-[26px] tablet:w-[250px]" />
                <Skeleton className="w-[260px] h-[26px] tablet:w-[150px]" />
                <Skeleton className="w-[130px] h-[26px] tablet:w-[150px]" />
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="hidden mobile:block">
        {Array.from({ length: itemNumber }).map((_, index) => (
          <div key={`list-${index}`} className="w-[326px] h-[184px] px-4 py-5 flex justify-between">
            <div className="flex flex-col gap-3">
              <Skeleton className="w-[120px] h-[20px]" />
              <Skeleton className="w-[100px] h-[20px]" />
              <Skeleton className="w-[50px] h-[15px]" />
              <Skeleton className="w-[50px] h-[15px]" />
              <Skeleton className="w-[150px] h-[25px]" />
              <Skeleton className="w-[170px] h-[20px]" />
            </div>
            <div>
              <Skeleton className="size-[112px] !rounded-5" />
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default SkeletonSelectedList;
