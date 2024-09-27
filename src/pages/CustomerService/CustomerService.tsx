import React, { ComponentType } from 'react';
import { ConsultingPending } from '@/components/CustomerService/ConsultingPending';
import { CustomerData } from '@/types/types';
import { ConsultingCompleted } from '@/components/CustomerService/ConsultingCompleted';
import { columnsPending } from '@/components/ui/columnsPending';
import { columnsCompleted } from '@/components/ui/columnsCompleted';
import CustomerInquiry from '@/components/CustomerService/CustomerInquiry';
import CustomerConsulting, { CustomerConsultingProps } from '@/components/CustomerService/CustomerConsulting';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CustomerCompleted from '@/components/CustomerService/CustomerCompleted';
import { ListDashes, Plus, X } from '@phosphor-icons/react';
import AccordionMenu from '@/components/CustomerService/AccordionMenu';
import { propertyTypeMapping } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import NewCustomer from '@/components/CustomerService/NewCustomer';
import { keepPreviousData, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger, DialogDescription } from '@/components/ui/dialogNewCustomer';
import NoProperty from '../../components/CustomerService/NoProperty';
import { useQueryClient } from '@tanstack/react-query';
import { fetchSidebarData, fetchSidebarDetailData } from '@/api/consulting';
import Draggable from 'react-draggable';
import { getAuthHeaders } from '@/utils/auth';
import axios from 'axios';
import { BASE_URL } from '@/lib/constants';

function CustomerService() {
  const [isOpen, setIsOpen] = useState(false);
  const [customers, setCustomers] = useState<CustomerData[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<number>();
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showConsulting, setShowConsulting] = useState(false);
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
    console.log('new:', newCustomer);

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
    (!sidebarData.sideBarPendingResponseList?.length && !sidebarData.sideBarCompletedResponseList?.length);

  const openModal = (Component: ComponentType<CustomerConsultingProps>, props: CustomerConsultingProps) => {
    setModalContent(
      <QueryClientProvider client={queryClient}>
        {showConsulting ? (
          <CustomerConsulting
            addConsultation={props.addConsultation}
            memberConsultationId={props.memberConsultationId}
            name={props.name}
            phoneNumber={props.phoneNumber}
            consultant={props.consultant}
            createdAt={props.createdAt}
            preferredAt={props.preferredAt}
            memberMessage={props.memberMessage}
            consultingMessage={props.consultingMessage}
            onAddCustomer={handleAddNewCustomer}
            closePopup={handleCloseModal}
          />
        ) : (
          <Component {...props} closePopup={handleCloseModal} />
        )}
      </QueryClientProvider>,
    );
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // 모달을 닫음
    setShowConsulting(false); // 상담 상태를 초기화
    setModalContent(null); // 모달 내용을 초기화
  };

  const handleInquiryClick = (memberConsultationId: number) => {
    const fetchInquiryData = async () => {
      const res = await axios.get(`${BASE_URL}/api/admin/consultations/${memberConsultationId}/pending`, {
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
        },
      });

      return res.data;
    };

    const InquiryModal = () => {
      const { data, isLoading } = useQuery({
        queryKey: ['inquiryData', memberConsultationId],
        queryFn: fetchInquiryData,
      });
      if (isLoading) return;

      return (
        <CustomerInquiry
          addConsultation={data?.addConsultation}
          memberConsultationId={data?.memberConsultationId}
          name={data?.memberName || ''}
          phoneNumber={data?.phoneNumber || ''}
          createdAt={data?.createdAt || ''}
          preferredAt={data?.preferredAt}
          memberMessage={data?.memberMessage || ''}
          consultingMessage={data?.consultantMessage || ''}
          onConsultingClick={() => {
            setShowConsulting(true);
            openModal(CustomerConsulting, {
              addConsultation: data?.addConsultation,
              memberConsultationId: data?.memberConsultationId,
              name: data?.memberName || '',
              phoneNumber: data?.phoneNumber || '',
              consultant: data.consultant,
              createdAt: data?.createdAt || '',
              memberMessage: data?.memberMessage || '',
              consultingMessage: data?.consultingMessage || '',
              preferredAt: data?.preferredAt,
              onAddCustomer: handleAddNewCustomer,
              closePopup: handleCloseModal,
            });
          }}
        />
      );
    };

    openModal(InquiryModal, {} as any);
  };

  const handleCompletedClick = (adminConsultationId: number) => {
    const fetchCompletedData = async () => {
      const res = await axios.get(`${BASE_URL}/api/admin/consultations/${adminConsultationId}/completed`, {
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
        },
      });

      return res.data;
    };

    const completedModal = () => {
      const { data, isLoading } = useQuery({
        queryKey: ['completedData', adminConsultationId],
        queryFn: fetchCompletedData,
      });
      if (isLoading) return;
      return (
        <CustomerCompleted
          adminConsultationId={data?.adminConsultationId}
          name={data?.name || ''}
          phoneNumber={data?.phoneNumber || ''}
          createdAt={data?.createdAt || ''}
          completedAt={data?.completedAt}
          memberMessage={data?.memberMessage || ''}
          consultMessage={data?.consultMessage || ''}
          tier={data?.tier || ''}
          closePopup={handleCloseModal}
        />
      );
    };
    openModal(completedModal, {} as any);
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
                columns={columnsPending(handleInquiryClick, selectedProperty || 1)}
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

      {isModalOpen && (
        <Draggable handle=".modal-header">
          <div className="fixed inset-0 flex justify-center items-center z-50 pointer-events-none">
            <div className="bg-white w-[500px] h-[826px] rounded-9 shadow-xl relative pointer-events-auto">
              <div className="modal-header cursor-move">
                <div className="flex w-full justify-end px-8 pt-9 pb-2">
                  <X
                    size={32}
                    weight="light"
                    className="text-assistive-strong cursor-pointer"
                    onClick={handleCloseModal}
                  />
                </div>
              </div>
              <div>{modalContent}</div>
            </div>
          </div>
        </Draggable>
      )}
    </main>
  );
}

export default CustomerService;
