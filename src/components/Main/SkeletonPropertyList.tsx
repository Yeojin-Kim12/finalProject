import { Skeleton } from '../ui/skeleton';

const SkeletonPropertyList = () => {
  return (
    <div className="mb-12 tablet:mb-11 mobile:mb-9">
      <div className="mb-6 mobile:mb-9">
        <h1 className="text-title-2xl mobile:text-title-lg-m font-bold">전국 미분양 매물 TOP 20</h1>
        <p className="text-detail-lg mobile:text-detail-base-m">표시되는 가격은 최소 평형 최저가입니다</p>
      </div>
      <section className="block mobile:hidden">
        <div className="flex flex-col w-[1200px] tablet:w-full">
          <div className="flex items-center gap-7 px-7 py-6 tablet:gap-6">
            <div>
              <Skeleton className="w-[272px] h-[153px] !rounded-5 tablet:w-[192px] tablet:h-[108px]" />
            </div>
            <div className="w-full flex justify-between items-center">
              <div className="flex flex-col gap-4">
                <Skeleton className="w-[230px] h-[45px]" />
                <Skeleton className="w-[300px] h-[20px]" />
                <Skeleton className="w-[180px] h-[20px]" />
              </div>
              <div className="flex flex-col items-center gap-4 ml-10">
                <Skeleton className="w-[200px] h-[30px] tablet:w-[150px]" />
                <Skeleton className="w-[70px] h-[20px]" />
                <Skeleton className="w-[220px] h-[30px] tablet:w-[180px]" />
              </div>
              <Skeleton className="size-8" />
            </div>
          </div>
          <Skeleton className="w-full h-[2px] mb-6" />
        </div>
      </section>
    </div>
  );
};

export default SkeletonPropertyList;
