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

const steps = ['매물정보 입력', '추가사항 입력', '키워드 선택', '등록 완료'];

const postProperty = async (property: any) => {
  const response = await axios.post('/api/admin/properties', property);
  return response.data.property;
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

  // const handleNextStep = async (nextStep: string) => {
  //   const stepIndex = steps.indexOf(nextStep);
  //   const fieldsToValidate = validationFields[`step${stepIndex}` as keyof typeof validationFields];
  //   const isValid = await methods.trigger(fieldsToValidate);
  //   step1: [
  //   'propertyName',
  //   'propertyConstructor',
  //   'propertyCompanyName',
  //   'propertyTotalNumber',
  //   'propertyRecruitmentDate',
  //   'areas',
  //   'propertyAreaAddr',
  //   'propertyModelhouseAddr',
  //   ],
  //   step2: ['phoneNumber', 'homepage', 'contactChannel'],
  //   step3: ['keywords', 'areas'],
  //   step4: [],
  // };

  const nextStep = useCallback(async () => {
    let isValid = true;

    const fieldsToValidate = validationFields[`step${step}`];

    if (fieldsToValidate && fieldsToValidate.length > 0) {
      isValid = await methods.trigger(fieldsToValidate);
    }

    if (isValid) {
      setStep(step + 1);
      scrollToTop();
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
          setStep(3);
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
      navigate('/');
    } else {
      setStep(step - 1);
    }
  }, [step, navigate]);

  // const handleNextStep = async (currentStep: string, nextStep: string) => {
  //   const stepIndex = steps.indexOf(currentStep);
  //   const fieldsToValidate = validationFields[`step${stepIndex + 1}` as keyof typeof validationFields] || [];

  //   const isValid = await methods.trigger(fieldsToValidate);

  //   if (isValid) {
  //     setStep(nextStep);
  //   } else {
  //     console.log('Validation failed');
  //   }
  // };

  return (
    // <FormProvider {...methods}>
    //   <form onSubmit={methods.handleSubmit(onSubmit)} className="w-[1200px] m-auto">
    //     <Funnel>
    //       <Step name="매물정보 입력">
    //         <PropertyInformation onNext={() => handleNextStep(steps[1])} />
    //       </Step>

    //       <Step name="추가사항 입력">
    //         <AdditionalInformation />
    //         <div className="flex items-center justify-center w-full gap-5">
    //           <Button
    //             type="button"
    //             variant="assistive"
    //             className="w-[220px]"
    //             onClick={() => setStep(steps[0])}>
    //             이전
    //           </Button>
    //           <Button type="submit" className="w-[220px]" onClick={() => handleNextStep(steps[2])}>
    //             다음
    //           </Button>
    //         </div>
    //       </Step>
    //       <Step name="키워드 선택">
    //         <PropertyKeywords />
    //         <Button type="button" onClick={() => setStep(steps[1])}>
    //           이전
    //         </Button>
    //         <Button type="submit">등록하기</Button>
    //       </Step>
    //       <Step name="등록 완료">
    //         <PropertyComplete />
    //         <Button type="button" onClick={() => setStep(steps[2])}>
    //           이전(삭제예정)
    //         </Button>
    //         <Link to="/" className="flex justify-center">
    //           <Button
    //             type="button"
    //             variant="outline"
    //             size="xl"
    //             className="w-[400px] !text-static-default border-assistive-default">
    //             매물 관리로 이동
    //           </Button>
    //         </Link>
    //       </Step>
    //     </Funnel>
    //   </form>
    // </FormProvider>
    <div className="flex justify-center">
      <section className="w-[1200px] flex flex-col items-center gap-11 py-12 tablet:w-full tablet:px-7 mobile:gap-9 mobile:w-full mobile:pt-0 mobile:pb-9 mobile:px-5">
        <PageHeader title="매물등록" />
        <Stepper currentStep={step} stepLabel={steps}></Stepper>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="w-[720px] m-auto" noValidate>
            {step === 1 && <PropertyInformation />}
            {step === 2 && <AdditionalInformation />}
            {step === 3 && <PropertyKeywords />}
            {step === 4 && <PropertyComplete />}
            <StepNavigation next={nextStep} back={prevStep} isLastStep={step === 3} lastLabel="등록하기" />
          </form>
        </FormProvider>
      </section>
    </div>
  );
};

export default PropertyAdd;
