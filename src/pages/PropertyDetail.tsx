import Breadcrumb from '@/components/common/Breadcrumb';
import Toast from '@/components/common/Toast';
import AreaList from '@/components/Property/AreaList';
import { CounselDialog, CounselDrawer } from '@/components/Property/CounselFormContent';
import MarketingViewer from '@/components/Property/MarketingViewer';
import PhoneDialog from '@/components/Property/PhoneDialog';
import PropertyKeyword from '@/components/Property/PropertyKeyword';
import TabsNavigation from '@/components/Property/TabsNavigation';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import { Label } from '@/components/ui/label';
import { getPropertyInfo } from '@/constants/getPropertyInfo';
import { useFunnel } from '@/hooks/useFunnel';
import useResponsive from '@/hooks/useResponsive';
import { formatAmount, getPropertyLabel } from '@/lib/utils';
import { Area, SalesInformation } from '@/types/types';
import { ArrowLineDown, Heart } from '@phosphor-icons/react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const steps = ['희망 상담 일자', '추가 사항'];

interface CounselForm {
  name: string;
  phoneNumber: string;
  preferredAt: string | undefined;
  counselingMessage: string;
}

const initialFormState: CounselForm = {
  name: '',
  phoneNumber: '',
  preferredAt: undefined,
  counselingMessage: '',
};

const PropertyDetail = () => {
  const { isDesktop, isTablet, isMobile } = useResponsive();
  const { id } = useParams<{ id: string }>();
  const [lowestPriceArea, setLowestPriceArea] = useState<Area | null>(null); // 최저가
  const [isPhoneDialog, setIsPhoneDialog] = useState(false); // 전화문의
  const [isCounselRegister, setIsCounselRegister] = useState(false); // 상담신청
  const [isInfoContent, setIsInfoContent] = useState(false);
  const [counselForm, setCounselForm] = useState(initialFormState); // 상담신청 값
  const [isCounselFormValidation, setisCounselFormValidation] = useState(false); // formValidation
  const [isToast, setIsToast] = useState(false);
  const { Funnel, Step, setStep } = useFunnel(steps[0]);

  const fetchSalesInformation = async (): Promise<SalesInformation> => {
    const res = await axios.get<SalesInformation>(`/api/properties/${id}`, {
      withCredentials: true,
    });
    return res.data;
  };
  const { data } = useQuery<SalesInformation>({
    queryKey: ['salesInformation', id],
    queryFn: fetchSalesInformation,
  });

  // 최저가
  useEffect(() => {
    if (data?.areas) {
      const lowestPrice = Math.min(...data?.areas.map((area) => area.discountPrice));
      const lowestPriceAreaIndex = data?.areas.findIndex((area) => area.discountPrice === lowestPrice);
      setLowestPriceArea(data?.areas[lowestPriceAreaIndex]);
    }
  }, [data]);

  const propertyInfo = getPropertyInfo(data);
  const supplyInformationFile = data?.files?.find((file) => file.type === 'supply_information');
  const marketingFiles = data?.files?.filter((file) => file.type === 'marketing');

  // 핸드폰 유효성검사
  const isPhoneValidation = (phoneNumber: string) => {
    const phoneRegex = /^010-\d{4}-\d{4}$/;
    return phoneRegex.test(phoneNumber);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCounselForm((prevForm) => ({
      ...prevForm,
      [name]: name === 'preferredAt' ? new Date(value) : value,
    }));
  };

  useEffect(() => {
    const { name, phoneNumber, preferredAt } = counselForm;
    setisCounselFormValidation(name !== '' && isPhoneValidation(phoneNumber) && preferredAt !== undefined);
  }, [counselForm]);

  const handleCounselRegister = () => {
    // 상담신청 api
    console.log('상담 등록:', counselForm);
    handleClose(false);
    showToast();
  };

  const handleClose = (isCounselRegister: boolean) => {
    if (!isCounselRegister) {
      setCounselForm(initialFormState);
      setStep(steps[0]);
    }
    setIsCounselRegister(isCounselRegister);
  };

  const showToast = () => {
    setIsToast(!isToast);
  };

  return (
    <div className={`w-[1200px] tablet:w-[720px] mobile:w-[328px] h-full m-auto text-static-default`}>
      {isDesktop && <Breadcrumb links={['미분양 정보', data?.buildingName || '']} />}
      <div>
        <div
          className={`flex ${isMobile ? 'flex-col mb-9' : 'items-center mb-11'} w-full h-[576px] tablet:h-[384px] mobile:h-[723px] gap-6`}>
          <div className="w-[576px] tablet:w-[352px] mobile:w-[328px]">
            {/* 이미지 크기 다시 지정하기 */}
            <img
              className="w-full h-full object-cover rounded-7"
              src={data?.imageUrl}
              alt={data?.buildingName}
            />
          </div>
          <div className="flex flex-col gap-7 tablet:gap-2 mobile:gap-4 grow justify-center">
            <div className="flex gap-4 tablet:mb-2 mobile:gap-3">
              {data?.benefit?.map((benefit, index) => (
                <Label
                  key={index}
                  keyword={getPropertyLabel(benefit.name)}
                  size={isDesktop ? 'l' : 'm'}
                  className="mobile:text-label-base-m">
                  {getPropertyLabel(benefit.name)}
                </Label>
              ))}
            </div>
            <div className="flex flex-col gap-0 desktop:gap-4 ">
              <div className="flex items-center gap-2 text-detail-xl tablet:text-detail-base mobile:text-detail-base-m text-assistive-detail">
                <p>{getPropertyLabel(data?.propertyType || '')}</p>
                <div className="w-[1px] h-[10px] bg-assistive-detail" />
                <p>{getPropertyLabel(data?.salesType || '')}</p>
                <div className="w-[1px] h-[10px] bg-assistive-detail" />
                <p>총 {data?.totalNumber}세대</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-heading-base tablet:text-title-2xl mobile:text-title-2xl-m font-bold">
                  {data?.buildingName}
                </div>
                {/* like api 추가하기 */}
                <div className="p-3 border border-assistive-default rounded-10 cursor-pointer">
                  {data?.likes ? (
                    <Heart size={isDesktop ? 32 : 24} weight="fill" className="text-accent-strong" />
                  ) : (
                    <Heart size={isDesktop ? 32 : 24} weight="thin" className="text-assistive-strong" />
                  )}
                </div>
              </div>
              <div className="text-assistive-detail text-detail-xl tablet:text-detail-base mobile:text-detail-base-m">
                {data?.areaAddr}
              </div>
            </div>
            <div>
              {lowestPriceArea && (
                <div>
                  <span className="line-through text-detail-xl tablet:text-detail-base mobile:text-detail-base-m text-assistive-default">
                    {formatAmount(lowestPriceArea.price)}
                  </span>
                  <div className="flex mt-1">
                    <span className="text-accent-strong text-title-2xl tablet:text-title-xl mobile:text-title-xl-m font-bold mr-3">
                      {lowestPriceArea.discountPercent}%
                    </span>
                    <span className="text-static-default text-title-2xl tablet:text-title-xl mobile:text-title-xl-m font-bold">
                      {formatAmount(lowestPriceArea.discountPrice)}
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div>
              <span className="text-assistive-strong text-detail-xl tablet:text-detail-base mobile:text-detail-base-m">
                편의시설
              </span>
              <div className="flex gap-4 mt-4 tablet:my-2">
                {data?.infra?.map((infra, index) => (
                  <Label
                    key={index}
                    keyword={getPropertyLabel(infra.name)}
                    size={isDesktop ? 'l' : 'm'}
                    className="mobile:text-label-base-m">
                    {getPropertyLabel(infra.name)}
                  </Label>
                ))}
              </div>
            </div>
            <div>
              <div className="flex gap-3">
                <Button
                  variant="assistive"
                  size={isDesktop ? 'xl' : 'sm'}
                  className="w-full"
                  onClick={() => setIsPhoneDialog(!isPhoneDialog)}>
                  전화문의
                </Button>
                <Button
                  variant="assistive"
                  size={isDesktop ? 'xl' : 'sm'}
                  className="w-full"
                  onClick={() => data?.contactChannel && window.open(data?.contactChannel)}>
                  카카오톡 채널문의
                </Button>
              </div>
              <Button
                className="w-full mt-3"
                size={isDesktop ? 'xl' : 'sm'}
                onClick={() => setIsCounselRegister(!isCounselRegister)}>
                상담신청
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <TabsNavigation marketingFiles={marketingFiles?.length || 0} />
          <div id="areasTab" className="pt-16 mobile:pt-9">
            <div className="flex items-center justify-between mb-6">
              <p className="text-title-2xl tablet:text-title-lg mobile:text-title-lg-m font-bold">
                평형별 매물가격
              </p>
              <a href={supplyInformationFile?.url} download={supplyInformationFile?.name}>
                <Button variant="outline" size={isDesktop ? 'lg' : 'xs'}>
                  공급안내표
                  <ArrowLineDown size={isDesktop ? 24 : 16} weight="bold" className="ml-4" />
                </Button>
              </a>
            </div>

            <div>
              {data?.areas?.map((area, index) => {
                const isPrevIndex =
                  index ===
                  data.areas.findIndex((i) => i.discountPrice === lowestPriceArea?.discountPrice) - 1;
                const isLastIndex = index === data.areas.length - 1;
                return (
                  <AreaList
                    key={index}
                    area={area}
                    lowestPriceArea={lowestPriceArea}
                    isPrevIndex={isPrevIndex}
                    isLastIndex={isLastIndex}
                    index={index}
                  />
                );
              })}
            </div>
          </div>
          <div id="benefitTab" className="pt-16 mobile:pt-9">
            {data?.benefit && <PropertyKeyword type="benefit" data={data?.benefit} />}
          </div>
          <div id="infraTab" className="pt-16 mobile:pt-9">
            {data?.infra && <PropertyKeyword type="infra" data={data?.infra} />}
          </div>
          <div id="propertyTab" className="pt-16 mobile:pt-9">
            <p className="text-title-2xl tablet:text-title-lg mobile:text-title-lg-m font-bold mb-5 mobile:mb-8">
              매물정보
            </p>
            {propertyInfo.map((property, index) => (
              <div
                key={index}
                className={clsx(
                  'flex flex-col border border-assistive-divider rounded-6 gap-5',
                  isDesktop && 'p-10 mb-5',
                  isTablet && 'p-7 mb-4',
                  isMobile && 'p-7 mb-3',
                )}>
                {property.map((item, itemIndex) => (
                  <div key={`${item.label}-${itemIndex}`} className="flex">
                    <p className="min-w-[99px] text-body-lg tablet:text-detail-lg mobile:text-detail-lg-m font-bold">
                      {item.label}
                    </p>
                    <p className="text-body-lg tablet:text-detail-lg mobile:text-detail-lg-m">{item.value}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
          {marketingFiles?.length !== 0 && (
            <div id="detailsTab" className="pt-16 mobile:pt-9">
              <MarketingViewer marketingFiles={marketingFiles || []} />
            </div>
          )}
          <div id="locationTab" className="pt-16 pb-12 mobile:pt-9 mobile:pb-9">
            <p className="text-title-2xl tablet:text-title-lg mobile:text-title-lg-m font-bold mb-2">위치</p>
            <p className="text-detail-lg tablet:text-detail-base mobile:text-detail-base-m text-assistive-detail mb-8">
              {data?.areaAddr}
            </p>
            {/* 지도 활성화하기 */}
            {/* <NaverMap address={data?.areaAddr || ''} buildingName={data?.buildingName || ''} /> */}
          </div>
        </div>
      </div>
      {isMobile ? (
        <Drawer open={isPhoneDialog} onOpenChange={setIsPhoneDialog}>
          <DrawerContent className="w-full h-[352px] px-5 pt-9 rounded-t-6">
            <PhoneDialog data={data} setIsPhoneDialog={setIsPhoneDialog} />
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={isPhoneDialog} onOpenChange={setIsPhoneDialog}>
          <DialogContent className="w-[400px] h-[426px] pt-8 pb-5 px-0">
            <DialogTitle className="hidden" />
            <PhoneDialog data={data} setIsPhoneDialog={setIsPhoneDialog} />
          </DialogContent>
        </Dialog>
      )}
      {isMobile ? (
        <CounselDrawer
          isOpen={isCounselRegister}
          handleClose={handleClose}
          Funnel={Funnel}
          Step={Step}
          setStep={setStep}
          steps={steps}
          counselForm={counselForm}
          setCounselForm={setCounselForm}
          handleInputChange={handleInputChange}
          isCounselFormValidation={isCounselFormValidation}
          handleCounselRegister={handleCounselRegister}
          setIsInfoContent={setIsInfoContent}
          isInfoContent={isInfoContent}
          isPhoneValidation={isPhoneValidation}
        />
      ) : (
        <CounselDialog
          isOpen={isCounselRegister}
          handleClose={handleClose}
          counselForm={counselForm}
          setCounselForm={setCounselForm}
          handleInputChange={handleInputChange}
          isCounselFormValidation={isCounselFormValidation}
          handleCounselRegister={handleCounselRegister}
          setIsInfoContent={setIsInfoContent}
          isInfoContent={isInfoContent}
          isPhoneValidation={isPhoneValidation}
        />
      )}
      {isToast && <Toast setIsToast={setIsToast} />}
    </div>
  );
};

export default PropertyDetail;
