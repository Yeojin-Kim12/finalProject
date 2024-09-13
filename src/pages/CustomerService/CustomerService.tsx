// import { useConsultPendingSummaries } from '@/api/consulting';
import { ComponentType } from 'react';
import { ConsultingPending } from '@/components/Table/ConsultingPending';
import { CustomerData } from '@/types/types';
import { ConsultingCompleted } from '@/components/Table/ConsultingCompleted';
import { columnsPending } from '@/components/ui/columnsPending';
import { columnsCompleted } from '@/components/ui/columnsCompleted';
import CustomerInquiry from '@/components/CustomerService/CustomerInquiry';
import CustomerConsulting from '@/components/CustomerService/CustomerConsulting';
import CustomerCompleted from '@/components/CustomerService/CustomerCompleted';
import ReactDOM from 'react-dom/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CustomerInquiryProps } from '@/components/CustomerService/CustomerInquiry';
import { CustomerCompletedProps } from '@/components/CustomerService/CustomerCompleted';
import { ListDashes, Plus } from '@phosphor-icons/react';
import AccordionMenu from '@/components/CustomerService/AccordionMenu';
import SampleImg from '../../../public/Imagesample.png';
import { Button } from '@/components/ui/button';
import NewCustomer from '@/components/CustomerService/NewCustomer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogTrigger, DialogDescription } from '@/components/ui/dialogNewCustomer';
import NoProperty from '../../components/CustomerService/NoProperty';
import { sampleResponse } from './data';

const queryClient = new QueryClient();

const accordionSections = [
  {
    title: '모집중',
    items: sampleResponse.sideBarPendingResponseList.map((item) => item.name),
  },
  {
    title: '모집완료',
    items: sampleResponse.sideBarCompletedResponseList.map((item) => item.name),
  },
];

export default function CustomerService() {
  const [isOpen, setIsOpen] = useState(false);
  const [customers, setCustomers] = useState<CustomerData[]>([]);
  const [selectedProperty, setSelectedProperty] = useState(sampleResponse.sideBarSelectedPropertyResponse);
  const popupWindowRef = useRef<Window | null>(null);

  const addNewCustomer = (newCustomer: CustomerData) => {
    const customerWithPropertyId = { ...newCustomer, id: selectedProperty.id };

    setCustomers((prevCustomers) => {
      // 전화번호가 동일한 고객은 상담대기에서 제거
      const updatedCustomers = prevCustomers.filter(
        (customer) => customer.phoneNumber !== newCustomer.phoneNumber,
      );
      return [...updatedCustomers, customerWithPropertyId];
    });
  };

  const pendingCustomers = customers.filter((customer) => customer.status === 'pending');
  const completedCustomers = customers.filter((customer) => customer.status === 'complete');

  const handlePropertySelect = (name: string) => {
    const selectedFromPending = sampleResponse.sideBarPendingResponseList.find(
      (property) => property.name === name,
    );
    const selectedFromCompleted = sampleResponse.sideBarCompletedResponseList.find(
      (property) => property.name === name,
    );
    const selected = selectedFromPending || selectedFromCompleted;

    if (selected) {
      setSelectedProperty({
        ...selected,
        file: 'https://example.com/sample-image.png',
        companyName: 'Selected Company',
        constructor: 'Selected Constructor',
        totalNumber: 300,
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        propertyType: 'APARTMENT',
      });
    }
  };

  const filteredPendingCustomers = pendingCustomers.filter((customer) => customer.id === selectedProperty.id);
  const filteredCompletedCustomers = completedCustomers.filter(
    (customer) => customer.id === selectedProperty.id,
  );

  const isSampleResponseEmpty =
    !sampleResponse ||
    (!sampleResponse.sideBarPendingResponseList.length &&
      !sampleResponse.sideBarCompletedResponseList.length);

  // popup 윈도우
  const openPopupWindow = <P extends {}>(
    Component: ComponentType<P>,
    props: P,
    title: string = 'Popup',
    width: number = 420,
    height: number = 665,
  ) => {
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    popupWindowRef.current = window.open(
      '',
      '_blank',
      `width=${width},height=${height},left=${left},top=${top}`,
    );

    if (popupWindowRef.current) {
      popupWindowRef.current.document.write(`
		<html>
			<head>
				<title>${title}</title>
				<link href="/src/index.css" rel="stylesheet">
			</head>
			<body>
				<div id="popup-root"></div>
			</body>
		</html>
	`);
      popupWindowRef.current.document.close();

      popupWindowRef.current.onload = () => {
        const popupRoot = popupWindowRef.current?.document.getElementById('popup-root');
        if (popupRoot) {
          const root = ReactDOM.createRoot(popupRoot);

          // 팝업 내용의 상태를 관리하기 위한 wrapper
          function PopupWrapper() {
            const [showConsulting, setShowConsulting] = useState(false);

            // 컴포넌트간 이동 로직
            const handleConsultingClick = () => {
              setShowConsulting(true);
            };
            const handleBackToInquiry = () => {
              setShowConsulting(false);
            };

            return (
              <QueryClientProvider client={queryClient}>
                {showConsulting ? (
                  <CustomerConsulting
                    {...props}
                    onBackClick={handleBackToInquiry}
                    closePopup={handleClosePopup}
                    onAddCustomer={addNewCustomer}
                  />
                ) : (
                  <Component
                    {...props}
                    onConsultingClick={handleConsultingClick}
                    closePopup={handleClosePopup}
                  />
                )}
              </QueryClientProvider>
            );
          }

          root.render(<PopupWrapper />);
        } else {
          console.error('Error occurred: Unable to find popup root.');
        }
      };
    }
  };

  const handleClosePopup = () => {
    if (popupWindowRef.current) {
      popupWindowRef.current.close(); // Close the popup window
      popupWindowRef.current = null; // Reset the reference
    }
  };

  const handleInquiryClick = (props: CustomerInquiryProps) => {
    openPopupWindow(CustomerInquiry, props, 'Inquiry');
  };
  const handleCompletedClick = (props: CustomerCompletedProps) => {
    openPopupWindow(CustomerCompleted, props, 'Completed');
    console.log(props);
  };

  return (
    <main className="flex">
      <aside className="flex flex-col w-[264px] mt-7 ml-7">
        <div className="flex py-6 px-6 gap-6 border-b-[1px] border-assistive-alternative">
          <ListDashes size={24} weight="light" />
          <h1 className="text-label-lg font-bold text-static-default ">매물 전체보기</h1>
        </div>
        <AccordionMenu sections={accordionSections} onItemSelect={handlePropertySelect} />
      </aside>

      {isSampleResponseEmpty ? (
        <NoProperty />
      ) : (
        <section className="container mx-auto py-10 ">
          <article className="flex flex-col mb-10">
            <p className="ml-3 text-body-lg font-normal text-assistive-strong">아파트 민간분양</p>
            <h1 className="ml-3 text-title-2xl font-bold">{selectedProperty.name}</h1>
            <div className="flex">
              <img src={SampleImg} className="object-cover w-[320px] h-[180px]" />
              <div className="flex flex-col self-center ml-10 w-[64px] gap-3 text-detail-base text-assistive-strong">
                <p>시행사</p>
                <p>시공사</p>
                <p>세대수</p>
                <p>모집기간</p>
              </div>
              <div className="flex flex-col self-center ml-4 w-[542px] gap-3 text-detail-base text-static-default">
                <p>{selectedProperty.companyName}</p>
                <p>{selectedProperty.constructor}</p>
                <p>{selectedProperty.totalNumber}</p>
                <p>
                  {selectedProperty.startDate}-{selectedProperty.endDate}
                </p>
              </div>
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <div className="self-end">
                  <DialogTrigger>
                    <Button variant="primary" size="lg" className="gap-4">
                      고객추가
                      <Plus size={24} weight="bold" />
                    </Button>
                  </DialogTrigger>
                </div>
                <DialogContent>
                  <NewCustomer onAddCustomer={addNewCustomer} />
                  <DialogDescription />
                </DialogContent>
              </Dialog>
            </div>
          </article>

          <Tabs defaultValue="pending" className="w-full">
            <TabsList className="flex">
              <TabsTrigger value="pending">상담대기</TabsTrigger>
              <TabsTrigger value="completed">상담완료</TabsTrigger>
            </TabsList>
            <TabsContent value="pending">
              <ConsultingPending
                columns={columnsPending(handleInquiryClick)}
                data={filteredPendingCustomers}
              />
            </TabsContent>
            <TabsContent value="completed">
              <ConsultingCompleted
                columns={columnsCompleted(handleCompletedClick)}
                data={filteredCompletedCustomers}
              />
            </TabsContent>
          </Tabs>
        </section>
      )}
    </main>
  );
}

// response
// {
//   "sideBarPendingResponseList": [// 모집중(최대 20개 출력),
//     {
//          "id": 1,
//           "name": "Example Property Name"
//     }
//   ],
//   "sideBarCompletedResponseList": [
//       {
//           "id": 2,
//           "name": "Example Property Name"
//       }
//   ],
//   "sideBarSelectedPropertyResponse": { // 현재 사이드바에서 선택된 매물 정보
//       "id": 2,
//       "name": "Example Property Name", //매물 이름
//       "file": "image url", //이미지
//       "companyName": "Example Company",
//       "constructor": "Example Constructor",
//       "totalNumber": 500,
//       "startDate": "2026-01-01",
//       "endDate": "2024-01-01",
//       "propertyType": "APARTMENT"
//   }
// }
// }
