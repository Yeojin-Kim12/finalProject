import Breadcrumb from '@/components/common/Breadcrumb';
import MyPropertyTable from '@/components/PropertyManagement/MyPropertyTable';
import PropertyManagementCard from '@/components/PropertyManagement/PropertyManagementCard';

const PropertyManagement = () => {
  return (
    <>
      <div className="w-[1200px] mx-auto">
        <Breadcrumb links={['마이페이지', '매물관리']} />
      </div>
      <main className="w-[1200px] mx-auto flex flex-col py-10">
        <h1 className="w-full py-3 px-6 mb-11 text-center text-heading-lg font-bold ">매물관리</h1>
        <PropertyManagementCard />
        <MyPropertyTable />
      </main>
    </>
  );
};

export default PropertyManagement;
