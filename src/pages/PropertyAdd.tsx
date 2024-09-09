import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFunnel } from '@/hooks/useFunnel';
import { PropertyInformation } from '@/components/PropertyAdd/PropertyInformation';
import { Button } from '@/components/ui/button';
import { propertyAddValues } from '@/constants/propertyAddValues';
import { propertyAddSchema } from '@/schemas/propertyAddSchema';
import { propertyAddTypes } from '@/types/propertyAddTypes';
import AdditionalInformation from '@/components/PropertyAdd/AdditionalInformation';
import { Link } from 'react-router-dom';
import PropertyComplete from '@/components/PropertyAdd/PropertyComplete';
import PropertyKeywords from '@/components/PropertyAdd/PropertyKeywords';

// const steps = ['매물정보 입력', '추가사항 입력', '키워드 선택', '등록 완료'];
const steps = ['매물정보 입력', '키워드 선택', '추가사항 입력', '등록 완료'];

const PropertyAdd = () => {
  const methods = useForm({
    resolver: zodResolver(propertyAddSchema),
    mode: 'onSubmit',
    defaultValues: propertyAddValues,
  });

  const { Funnel, Step, setStep } = useFunnel(steps[0]);

  const validationFields: Record<string, propertyAddTypes[]> = {
    step1: [
      // 'propertyName',
      // 'propertyConstructor',
      // 'propertyCompanyName',
      // 'propertyTotalNumber',
      // 'propertyRecruitmentDate',
      // 'areas',
      // 'propertyAreaAddr',
      // 'propertyModelhouseAddr',
    ],
    step2: ['phoneNumber', 'homepage', 'contactChannel'],
    step3: ['keywords', 'areas'],
    step4: [],
  };

  const handleNextStep = async (currentStep: string, nextStep: string) => {
    const stepIndex = steps.indexOf(currentStep);
    const fieldsToValidate = validationFields[`step${stepIndex + 1}` as keyof typeof validationFields] || [];

    const isValid = await methods.trigger(fieldsToValidate);

    if (isValid) {
      setStep(nextStep);
    } else {
      console.log('Validation failed');
    }
  };

  const onSubmit = async (data: any) => {
    const isValid = await methods.trigger(validationFields['step3']);
    if (isValid) {
      console.log('Form Data:', data);
      setStep(steps[3]);
    } else {
      console.log('Validation failed');
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="w-[1200px] m-auto" noValidate>
        <Funnel>
          <Step name="매물정보 입력">
            <PropertyInformation onNext={() => handleNextStep(steps[0], steps[1])} />
          </Step>

          <Step name="추가사항 입력">
            <AdditionalInformation />
            <Button type="button" onClick={() => setStep(steps[0])}>
              이전
            </Button>
            <Button type="button" onClick={() => handleNextStep(steps[0], steps[2])}>
              다음
            </Button>
          </Step>
          <Step name="키워드 선택">
            <PropertyKeywords />
            <Button type="button" onClick={() => setStep(steps[2])}>
              이전
            </Button>
            <Button type="submit" onClick={() => setStep(steps[3])}>
              등록하기
            </Button>
          </Step>
          <Step name="등록 완료">
            <PropertyComplete />
            <Button type="button" onClick={() => setStep(steps[2])}>
              이전(삭제예정)
            </Button>
            <Link to="/" className="flex justify-center">
              <Button
                type="button"
                variant="outline"
                size="xl"
                className="w-[400px] !text-static-default border-assistive-default">
                매물 관리로 이동
              </Button>
            </Link>
          </Step>
        </Funnel>
      </form>
    </FormProvider>
  );
};

export default PropertyAdd;
