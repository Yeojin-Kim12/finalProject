import { myProperty } from '@/lib/tableItems';
import { MyPropertyTable } from '@/components/Table/MyPropertyTable';
import { columnsMyProperty } from '@/components/ui/columnsMyProperyt';
import SampleImg from '../../../public/Imagesample.png';
import Breadcrumb from '@/components/common/Breadcrumb';

// table에 사용하는 데이터
const myPropertyData = myProperty.map((property) => ({
  id: property.id,
  name: property.name,
  total_number: property.total_number,
  pending: property.pending,
  consultation_pending: property.consultation_pending,
  createdAt: property.createdAt,
  endDate: property.endDate,
}));

export default function PropertyManagement() {
  return (
    <main className="flex">
      <section className="container mx-auto py-10 ">
        <Breadcrumb links={['마이페이지', '매물관리']} />
        <h1 className="w-full py-3 px-6 mb-11 text-center text-heading-lg font-bold ">매물관리</h1>

        {/* 이 위치에 매물 카드 들어갑니다. */}
        <article className="flex flex-col mb-10">
          <div className="flex mb-6">
            <img src={SampleImg} className="object-cover w-[272px] h-[153px]" />
          </div>
          <h1 className="mb-5 text-title-xl font-bold">계양 학마을 서원</h1>
          <p className="text-detail-lg font-normal text-assistive-strong">아파트 민간분양</p>
        </article>

        {/* 매물 리스트 테이블 */}
        <MyPropertyTable columns={columnsMyProperty} data={myPropertyData} />
      </section>
    </main>
  );
}
