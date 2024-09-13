import Dropdown from '@/components/common/Dropdown';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { customerRating, optionSupport, paymentSupport, time, transportation } from '@/lib/dropdownItems';
import { scroller, Element } from 'react-scroll';
// import { ConsultingPending } from '@/components/Table/ConsultingPending';
// import { ConsultingCompleted } from '@/components/Table/ConsultingCompleted';
// import { columnsPending } from '@/components/ui/columnsPending';
// import { columnsCompleted } from '@/components/ui/columnsCompleted';
import { consultingPending, consultingCompleted, myProperty } from '@/lib/tableItems';
// import { MyPropertyTable } from '@/components/Table/MyPropertyTable';
// import { columnsMyProperty } from '@/components/ui/columnsMyProperyt';
import CustomerInquiry from '@/components/CustomerService/CustomerInquiry';
import ReactDOM from 'react-dom/client';
// import { useDragger } from '../hooks/useDragger';

// table에 사용하는 데이터
const consultingPendingData = consultingPending.map((consulting) => ({
  name: consulting.name,
  phoneNumber: consulting.phoneNumber,
  createdAt: consulting.createdAt,
  preferredAt: consulting.preferredAt,
  consultant: consulting.consultant,
}));

const consultingCompletedData = consultingCompleted.map((consulting) => ({
  name: consulting.name,
  tier: consulting.tier,
  phoneNumber: consulting.phoneNumber,
  createdAt: consulting.createdAt,
  completedAt: consulting.completedAt,
  consultant: consulting.consultant,
  contents: consulting.contents,
}));

const myPropertyData = myProperty.map((property) => ({
  id: property.id,
  name: property.name,
  total_number: property.total_number,
  pending: property.pending,
  status: property.status,
  created_at: property.created_at,
  end_date: property.end_date,
}));

const TestHY = () => {
  const handleSelect = (value: string) => {
    console.log('Selected value:', value);
  };
  // 이동 가능 컴포넌트 훅
  // useDragger('blue-box');

  // 원하는 Element로 이동하는 tab
  function scrollToElement(name: string) {
    scroller.scrollTo(name, {
      duration: 1500,
      delay: 0,
      spy: true,
      offset: -145,
      smooth: 'easeInOutQuart',
    });
  }

  const handleViewClick = (props: any) => {
    const width = 517;
    const height = 830;

    // popup 윈도우
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    const popupWindow = window.open('', '_blank', `width=${width},height=${height},left=${left},top=${top}`);

    if (popupWindow) {
      popupWindow.document.write(`
      <html>
        <head>
          <title>Inquiry</title>
          <link href="/src/index.css" rel="stylesheet">
        </head>
        </head>
        <body>
          <div id="inquiry-root"></div>
        </body>
      </html>
    `);
      popupWindow.document.close();

      popupWindow.onload = () => {
        const inquiryRoot = popupWindow.document.getElementById('inquiry-root');
        if (inquiryRoot) {
          const root = ReactDOM.createRoot(inquiryRoot);
          root.render(<CustomerInquiry {...props} />);
        } else {
          console.error('에러가 발생했습니다');
        }
      };
    }
  };

  return (
    <div className="relative h-[3000px]">
      {/* dropdown 에시 */}
      <Dropdown
        items={paymentSupport}
        defaultLabel="중도금 무이자"
        buttonWidth="w-[176px]"
        onSelect={handleSelect}
      />
      <Dropdown
        items={optionSupport}
        defaultLabel="무상제공"
        buttonWidth="w-[138px]"
        onSelect={handleSelect}
      />
      <Dropdown items={transportation} defaultLabel="도보" buttonWidth="w-[105px]" onSelect={handleSelect} />
      <Dropdown items={time} defaultLabel="00분" buttonWidth="w-[112px]" onSelect={handleSelect} />
      <Dropdown
        items={customerRating}
        defaultLabel="고객등급"
        buttonWidth="w-[138px]"
        onSelect={handleSelect}
      />

      {/* 화면이 바뀌는 tab */}
      <div className="max-w-[1000px]">
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="flex">
            <TabsTrigger value="caseOpen">상담대기</TabsTrigger>
            <TabsTrigger value="caseClosed">상담완료</TabsTrigger>
            <TabsTrigger value="caseClosed2">상담완료</TabsTrigger>
          </TabsList>
          <TabsContent value="caseOpen">상담대기 내역 표시</TabsContent>
          <TabsContent value="caseClosed">상담완료 내역 표시</TabsContent>
        </Tabs>

        {/* 스크롤 기능 tab */}
        <div className="sticky top-[92px] bg-static-white mt-4 z-50">
          <Tabs defaultValue="account" className="w-full bg-static-white">
            <TabsList className="flex">
              <TabsTrigger value="caseOpen" onClick={() => scrollToElement('category2')}>
                상담대기
              </TabsTrigger>
              <TabsTrigger value="caseClosed" onClick={() => scrollToElement('category3')}>
                상담완료
              </TabsTrigger>
              <TabsTrigger value="caseClosed2">상담완료</TabsTrigger>
              <TabsTrigger value="caseClosed3">상담완료</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* 스크롤 컴포넌트 지정 */}
        <Element name="category0" className="flex h-[200px] bg-highlight-base">
          category0
        </Element>
        <Element name="category2" className="flex h-[200px] bg-secondary-base">
          category1
        </Element>
        <Element name="category3" className="flex h-[200px] bg-accent-normal">
          category2
        </Element>
      </div>

      {/* 테이블 */}
      {/* <div className="container mx-auto py-10 ">
        <ConsultingPending columns={columnsPending(handleViewClick)} data={consultingPendingData} />
        <ConsultingCompleted columns={columnsCompleted(handleViewClick)} data={consultingCompletedData} />
        <MyPropertyTable columns={columnsMyProperty} data={myPropertyData} />
      </div> */}

      {/* 이동 가능 컴포넌트 */}
      <div
        id="blue-box"
        className="absolute w-[517px] h-[830px] rounded-[40px] bg-static-white shadow-xl cursor-pointer">
        {/* <CustomerInquiry /> */}
      </div>
    </div>
  );
};

export default TestHY;
