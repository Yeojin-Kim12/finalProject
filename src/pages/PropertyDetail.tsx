import Breadcrumb from '@/components/common/Breadcrumb';
import Toast from '@/components/common/Toast';
import AreaList from '@/components/Property/AreaList';
import { CounselDialog, CounselDrawer } from '@/components/Property/CounselFormContent';
import MarketingViewer from '@/components/Property/MarketingViewer';
import NaverMap from '@/components/Property/NaverMap';
import PhoneDialog from '@/components/Property/PhoneDialog';
import PropertyKeyword from '@/components/Property/PropertyKeyword';
import PropertyTopContent from '@/components/Property/PropertyTopContent';
import TabsNavigation from '@/components/Property/TabsNavigation';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import { useFunnel } from '@/hooks/useFunnel';
import useLike from '@/hooks/useLike';
import useResponsive from '@/hooks/useResponsive';
import useScrollToTopOnClick from '@/hooks/useScrollToTopOnClick';
import { BASE_URL } from '@/lib/constants';
import { removePhoneNumberHyphens } from '@/lib/utils';
import { loginState } from '@/recoilstate/login/atoms';
import { Area, SalesInformation } from '@/types/types';
import { getPropertyInfo } from '@/utils/getPropertyInfo';
import { ArrowLineDown } from '@phosphor-icons/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';

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
  const [isCounselFormValidation, setIsCounselFormValidation] = useState(false); // formValidation
  const [isToast, setIsToast] = useState(false);
  const { Funnel, Step, setStep } = useFunnel(steps[0]);

  const [loginData] = useRecoilState(loginState);
  const scrollToTop = useScrollToTopOnClick();
  useEffect(() => {
    scrollToTop();
  }, []);

  const fetchSalesInformation = async (): Promise<SalesInformation> => {
    const url =
      loginData.userInfo?.role === 'MEMBER'
        ? `${BASE_URL}/api/member/properties/${id}`
        : `${BASE_URL}/api/common/properties/${id}`;

    const res = await axios.get<SalesInformation>(url, { withCredentials: true });

    return res.data;
  };

  const { data } = useQuery<SalesInformation>({
    queryKey: ['salesInformation', id],
    queryFn: fetchSalesInformation,
    staleTime: 600000,
    gcTime: 900000,
    refetchOnWindowFocus: false,
    enabled: loginData.isLoggedIn !== null,
  });

  const postCounsel = async (formData: CounselForm) => {
    const url =
      loginData.userInfo?.role === 'MEMBER'
        ? `${BASE_URL}/api/member/properties/${id}/consultation`
        : `${BASE_URL}/api/common/properties/${id}/consultation`;

    const res = await axios.post(url, formData, { withCredentials: true });
    return res.data;
  };

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: postCounsel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['counsel'] });
    },
    onError: (error) => {
      console.error('Post 에러 발생:', error);
    },
  });

  const { liked, toggleLike, setLiked } = useLike(data?.likes || false, Number(id));
  useEffect(() => {
    if (data?.likes !== undefined) {
      setLiked(data.likes);
    }
  }, [data?.likes]);

  // 최저가
  useEffect(() => {
    if (data?.areas) {
      const validAreas = data.areas.map((area) => {
        let discountPrice = area.discountPrice;
        let discountPercent = area.discountPercent;

        if (discountPrice === null && discountPercent === null) {
          discountPrice = area.price;
          discountPercent = 0;
        }

        return {
          ...area,
          discountPrice,
          discountPercent,
        };
      });

      // 최저가 계산
      const lowestPrice = Math.min(
        ...validAreas.map((area) => area.discountPrice).filter((price): price is number => price !== null),
      );
      const lowestPriceAreaIndex = validAreas.findIndex((area) => area.discountPrice === lowestPrice);

      setLowestPriceArea(validAreas[lowestPriceAreaIndex]);
    }
  }, [data]);

  const propertyInfo = getPropertyInfo(data);

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
    setIsCounselFormValidation(name !== '' && isPhoneValidation(phoneNumber) && preferredAt !== undefined);
  }, [counselForm]);

  const handleCounselRegister = () => {
    const phoneNumber = removePhoneNumberHyphens(counselForm.phoneNumber);
    const updatedCounselForm = {
      ...counselForm,
      phoneNumber: phoneNumber,
    };
    mutate(updatedCounselForm, {
      onSuccess: () => {
        handleClose(false);
        showToast();
      },
      onError: (error) => {
        console.log('실패:', error);
      },
    });
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
      {isDesktop && <Breadcrumb links={['미분양 정보', data?.name || '']} />}
      <div>
        <PropertyTopContent
          isMobile={isMobile}
          isDesktop={isDesktop}
          data={data}
          toggleLike={toggleLike}
          liked={liked}
          lowestPriceArea={lowestPriceArea}
          setIsPhoneDialog={setIsPhoneDialog}
          isPhoneDialog={isPhoneDialog}
          setIsCounselRegister={setIsCounselRegister}
          isCounselRegister={isCounselRegister}
        />
        <div className="flex flex-col">
          <TabsNavigation marketingFiles={data?.marketing ? 1 : 0} />
          <div id="areasTab" className="pt-16 mobile:pt-9">
            <div className="flex items-center justify-between mb-6">
              <p className="text-title-2xl tablet:text-title-lg mobile:text-title-lg-m font-bold">
                평형별 매물가격
              </p>
              <a href={data?.supplyInformation?.url} download={data?.supplyInformation?.name}>
                <Button variant="outline" size={isDesktop ? 'lg' : 'xs'}>
                  공급안내표
                  <ArrowLineDown size={isDesktop ? 24 : 16} weight="bold" className="ml-4" />
                </Button>
              </a>
            </div>

            <div>
              {data?.areas?.map((area, index) => {
                const discountPrice =
                  area.discountPrice === null && area.discountPercent === null
                    ? area.price
                    : area.discountPrice;

                const discountPercent =
                  area.discountPrice === null && area.discountPercent === null ? 0 : area.discountPercent;

                const adjustedArea = {
                  ...area,
                  discountPrice,
                  discountPercent,
                };

                const isPrevIndex =
                  index ===
                  data.areas.findIndex((i) => i.discountPrice === lowestPriceArea?.discountPrice) - 1;

                const isLastIndex = index === data.areas.length - 1;
                return (
                  <AreaList
                    key={index}
                    area={adjustedArea}
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
          {data?.marketing && (
            <div id="detailsTab" className="pt-16 mobile:pt-9">
              <MarketingViewer marketingFiles={data.marketing || []} />
            </div>
          )}
          <div id="locationTab" className="pt-16 pb-12 mobile:pt-9 mobile:pb-9">
            <p className="text-title-2xl tablet:text-title-lg mobile:text-title-lg-m font-bold mb-2">위치</p>
            <p className="text-detail-lg tablet:text-detail-base mobile:text-detail-base-m text-assistive-detail mb-8">
              {data?.areaAddr}
            </p>
            <NaverMap address={data?.areaAddr || ''} buildingName={data?.buildingName || ''} />
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
