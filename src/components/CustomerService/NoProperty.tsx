import { BuildingApartment } from '@phosphor-icons/react';

export default function NoProperty() {
  return (
    <main className="flex w-full justify-center">
      <section className="flex flex-col justify-center items-center w-[1200px] h-[563px]">
        <div className="flex justify-center items-center mb-11 w-[120px] h-[120px] rounded-full bg-primary-base">
          <BuildingApartment size={80} className="text-primary-strong" />
        </div>
        <h1 className="flex mb-6 text-title-2xl font-bold text-static-default">매물을 등록해주세요</h1>
        <p className="text-body-lg text-static-default">
          다양한 미분양 매물을{' '}
          <a href="" className="text-primary-default underline">
            간편하게 등록
          </a>{' '}
          하고 관리해보세요
        </p>
      </section>
    </main>
  );
}
