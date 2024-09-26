import React, { ComponentType } from 'react';
import { ConsultingPending } from '@/components/CustomerService/ConsultingPending';
import { CustomerData } from '@/types/types';
import { ConsultingCompleted } from '@/components/CustomerService/ConsultingCompleted';
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
import { propertyTypeMapping } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import NewCustomer from '@/components/CustomerService/NewCustomer';
import { keepPreviousData, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogTrigger, DialogDescription } from '@/components/ui/dialogNewCustomer';
import NoProperty from '../../components/CustomerService/NoProperty';
import { useQueryClient } from '@tanstack/react-query';
import { fetchSidebarData, fetchSidebarDetailData } from '@/api/consulting';

function CustomerService() {
  const [isOpen, setIsOpen] = useState(false);
  const [customers, setCustomers] = useState<CustomerData[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<number>();
  const popupWindowRef = useRef<Window | null>(null);

  const queryClient = useQueryClient();

  // TODO:customers 사용안해서 임시로 넣어둔 것.
  console.log(customers);

  // 사이브바 fetch
  const { data: sidebarData } = useQuery({
    queryKey: ['sidebar'],
    queryFn: fetchSidebarData,
  });

  // 매물 상세(상단) fetch
  const { data: sidebarDetailData } = useQuery({
    queryKey: ['sidebarDetail', selectedProperty!],
    queryFn: () => fetchSidebarDetailData(selectedProperty!),
    placeholderData: keepPreviousData,
  });

  // selectedProperty 초기화
  React.useEffect(() => {
    if (!selectedProperty && sidebarData?.sideBarPendingResponseList?.length > 0) {
      setSelectedProperty(sidebarData.sideBarPendingResponseList[0].id);
    }
  }, [sidebarData, selectedProperty]);

  const handleAddNewCustomer = (newCustomer: CustomerData) => {
    setCustomers((prevCustomers) => [...prevCustomers, newCustomer]);
    setIsOpen(false);
  };
  const accordionSections = [
    {
      title: '모집중',
      items:
        sidebarData?.sideBarPendingResponseList?.map((item: { id: number; name: string }) => ({
          id: item.id,
          name: item.name,
        })) || [],
    },
    {
      title: '모집완료',
      items:
        sidebarData?.sideBarCompletedResponseList?.map((item: { id: number; name: string }) => ({
          id: item.id,
          name: item.name,
        })) || [],
    },
  ];

  const handlePropertySelect = (id: number) => {
    if (selectedProperty !== id) {
      const selectedFromPending = sidebarData?.sideBarPendingResponseList.find(
        (property: { id: number }) => property.id === id,
      );
      const selectedFromCompleted = sidebarData?.sideBarCompletedResponseList.find(
        (property: { id: number }) => property.id === id,
      );
      const selected = selectedFromPending || selectedFromCompleted;

      if (selected) {
        setSelectedProperty(selected.id);
      }
    }
  };

  const isSidebarDataEmpty =
    !sidebarData ||
    (!sidebarData.sideBarPendingResponseList.length && !sidebarData.sideBarCompletedResponseList.length);

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
            <style>
            #popup-root {
             width: 125%;
              height: 125%;
              transform: scale(0.8);
              transform-origin: center;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%) scale(0.8);
            }
          </style>
			</head>
			<body>
				<div id="popup-root"></div>
        <script src="/index.js"></script>
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
                    // @ts-ignore: Unreachable code error
                    onAddCustomer={handleAddNewCustomer}
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
  };

  return (
    <main className="flex gap-10">
      <aside className="flex-none flex flex-col w-[280px] mt-7 ml-7 ">
        <div className="flex py-6 px-6 gap-6 border-b-[1px] border-assistive-alternative">
          <ListDashes size={24} weight="light" />
          <h1 className="text-label-lg font-bold text-static-default ">매물 전체보기</h1>
        </div>
        <AccordionMenu
          sections={accordionSections}
          onItemSelect={handlePropertySelect}
          selectedProperty={selectedProperty}
        />
      </aside>

      {isSidebarDataEmpty ? (
        <NoProperty />
      ) : (
        <section className="container mx-auto py-10 ">
          <article className="flex flex-col mb-10 gap-7">
            <div>
              <p className="ml-3 text-body-lg font-normal text-assistive-strong">
                {propertyTypeMapping[sidebarDetailData?.propertyType]}
              </p>
              <h1 className="ml-3 text-title-2xl font-bold">{sidebarDetailData?.propertyName}</h1>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-10">
                <img
                  src={sidebarDetailData?.image}
                  className="flex-none object-cover w-[320px] h-[180px] rounded-5"
                />
                <div className="flex gap-4">
                  <div className="flex flex-col self-center w-[64px] gap-3 text-detail-base text-assistive-strong">
                    <p>시행사</p>
                    <p>시공사</p>
                    <p>세대수</p>
                    <p>모집기간</p>
                  </div>
                  <div className="flex flex-col self-center w-[542px] gap-3 text-detail-base text-static-default">
                    <p>{sidebarDetailData?.companyName}</p>
                    <p>{sidebarDetailData?.constructor}</p>
                    <p>{sidebarDetailData?.totalNumber}</p>
                    <p>
                      {sidebarDetailData?.startDate} - {sidebarDetailData?.endDate}
                    </p>
                  </div>
                </div>
              </div>
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <div className="self-end mr-11">
                  <DialogTrigger asChild>
                    <Button variant="primary" size="lg" className="gap-4">
                      고객추가
                      <Plus size={24} weight="bold" />
                    </Button>
                  </DialogTrigger>
                </div>
                <DialogContent>
                  <NewCustomer onAddCustomer={handleAddNewCustomer} propertyId={sidebarDetailData?.id} />
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
                columns={columnsPending(handleInquiryClick, selectedProperty)}
                propertyId={selectedProperty}
              />
            </TabsContent>
            <TabsContent value="completed">
              <ConsultingCompleted
                columns={columnsCompleted(handleCompletedClick)}
                propertyId={selectedProperty}
              />
            </TabsContent>
          </Tabs>
        </section>
      )}
    </main>
  );
}

export default CustomerService;
