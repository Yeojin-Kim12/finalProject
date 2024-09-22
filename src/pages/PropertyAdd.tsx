import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PropertyInformation } from '@/components/PropertyAdd/PropertyInformation';
import { propertyAddValues } from '@/constants/propertyAddValues';
import { propertyAddSchema } from '@/schemas/propertyAddSchema';
import { propertyAddTypes } from '@/types/propertyAddTypes';
import AdditionalInformation from '@/components/PropertyAdd/AdditionalInformation';
import { useNavigate } from 'react-router-dom';
import PropertyComplete from '@/components/PropertyAdd/PropertyComplete';
import PropertyKeywords from '@/components/PropertyAdd/PropertyKeywords';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { formatPropertyData } from '@/utils/formatPropertyData';
import PageHeader from '@/components/common/PageHeader';
import Stepper from '@/components/Stepper';
import { useCallback, useState } from 'react';
import useScrollToTopOnClick from '@/hooks/useScrollToTopOnClick';
import StepNavigation from '@/components/common/StepNavigation';
import { BASE_URL } from '@/lib/constants';

const steps = ['매물정보 입력', '추가사항 입력', '키워드 선택', '등록 완료'];

const postProperty = async (property: any) => {
  console.log('전송할 데이터 (JSON):', JSON.stringify(property, null, 2));
  try {
    const response = await axios.post(`${BASE_URL}/api/admin/properties`, property, {
      withCredentials: true,
    });
    return response.data.property;
  } catch (error: any) {
    if (error.response) {
      console.error('서버 응답 에러:', error.response.data);
    } else {
      console.error('네트워크 에러:', error.message);
    }
    throw error;
  }
};

const PropertyAdd = () => {
  const scrollToTop = useScrollToTopOnClick();
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const methods = useForm({
    resolver: zodResolver(propertyAddSchema),
    mode: 'onSubmit',
    defaultValues: propertyAddValues,
  });

  const validationFields: Record<string, propertyAddTypes[]> = {
    step1: [
      'name',
      'constructorName',
      'companyName',
      'totalNumber',
      'areas',
      'areaAddr',
      'modelhouseAddr',
      'files',
      'dateRange',
    ],
    step2: ['phoneNumber', 'homepage', 'contactChannel'],
    step3: ['keywords', 'areas'],
    step4: [],
  };
  const nextStep = useCallback(async () => {
    let isValid = true;

    const fieldsToValidate = validationFields[`step${step}`];

    if (fieldsToValidate && fieldsToValidate.length > 0) {
      isValid = await methods.trigger(fieldsToValidate);
    }
    if (isValid) {
      if (step === 3) {
        methods.handleSubmit(onSubmit)();
      } else {
        setStep(step + 1);
        scrollToTop();
      }
    }
  }, [step, methods]);

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: postProperty,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: (error) => {
      console.log('Post 에러 발생:', error);
    },
  });

  const onSubmit = async (data: any) => {
    const isValid = await methods.trigger(validationFields['step3']);

    if (isValid) {
      const formattedData = formatPropertyData(data);

      mutate(formattedData, {
        onSuccess: () => {
          setStep(4);
        },
        onError: (error) => {
          console.log('실패:', error);
        },
      });
    }
  };

  const prevStep = useCallback(() => {
    scrollToTop();
    if (step === 1) {
      navigate('/property-management');
    } else {
      setStep(step - 1);
    }
  }, [step, navigate]);

  return (
    <div className="flex justify-center">
      <section className="w-[1200px] flex flex-col items-center gap-11 py-12 tablet:w-full tablet:px-7 mobile:gap-9 mobile:w-full mobile:pt-0 mobile:pb-9 mobile:px-5">
        {step !== 4 && (
          <>
            <PageHeader title="매물등록" />
            <Stepper currentStep={step} stepLabel={steps}></Stepper>
          </>
        )}
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="w-[720px] m-auto" noValidate>
            {step === 1 && <PropertyInformation />}
            {step === 2 && <AdditionalInformation />}
            {step === 3 && <PropertyKeywords />}
            {step === 4 && <PropertyComplete />}
            {step !== 4 && (
              <StepNavigation next={nextStep} back={prevStep} isLastStep={step === 3} lastLabel="등록하기" />
            )}
          </form>
        </FormProvider>
      </section>
    </div>
  );
};

export default PropertyAdd;
