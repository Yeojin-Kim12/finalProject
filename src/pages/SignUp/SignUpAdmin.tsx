import { useCallback, useState } from 'react';

import { useForm, FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Stepper from '@/components/Stepper';
import useScrollToTopOnClick from '@/hooks/useScrollToTopOnClick';
import PageHeader from '@/components/common/PageHeader';
import StepNavigation from '@/components/common/StepNavigation';
import SignUpCommonStep1 from '@/components/SignUp/SignUpCommonStep1';
import SignUpAdminStep2 from '@/components/SignUp/SignUpAdminStep2';
import SignUpAdminStep3 from '@/components/SignUp/SignUpAdminStep3';

const schema = z
  .object({
    name: z.string().min(7, '최소입력주세요.'),
    email: z.string().email('유효하지 않은 이메일 형식입니다.'),
    emailVerificationCode: z.number().min(6, '인증코드 숫자 6자리를 입력주세요.'),
    password: z.string().min(3, '비밀번호는 3자 이상이어야 합니다.'),
    confirmPassword: z.string().min(3, '비밀번호'),
    address: z.string().min(1, '주소를 입력해주세요'),
    housingFile: z
      .array(
        z.object({
          name: z.string().optional(),
          url: z.string().optional(),
          type: z.string().optional(),
        }),
      )
      .superRefine((files, ctx) => {
        const hasFile = files.some((file) => file.type === 'HOUSING');
        if (!hasFile) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: '이미지를 첨부해주세요',
          });
        }
      }),
    registrationFile: z
      .array(
        z.object({
          name: z.string().optional(),
          url: z.string().optional(),
          type: z.string().optional(),
        }),
      )
      .superRefine((files, ctx) => {
        const hasFile = files.some((file) => file.type === 'REGISTRATION');
        if (!hasFile) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: '이미지를 첨부해주세요',
            path: [0],
          });
        }
      }),
    agree1: z.string().refine((val) => val === 'true', {
      message: '동의해주세요',
    }),
    agree2: z.string().refine((val) => val === 'true', {
      message: '동의해주세요',
    }),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: '비밀번호가 일치하지 않습니다.',
      path: ['confirmPassword'],
    },
  );

const steps = ['약관동의', '회원가입', '담당자인증', '가입완료'];
const SignUpAdmin = () => {
  const scrollToTop = useScrollToTopOnClick();
  const [step, setStep] = useState(1);
  const methods = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange',
    criteriaMode: 'all',
    defaultValues: {
      name: '',
      email: '',
      address: '',
      phone: '',
      password: '',
      confirmPassword: '',
      agree1: 'false',
      agree2: 'false',
    },
  });

  const navigate = useNavigate();
  const nextStep = useCallback(async () => {
    let isValid = true;
    // if (step === 1) {
    //   isValid = await methods.trigger(['agree1', 'agree2']);
    // } else if (step === 2) {
    //   isValid = await methods.trigger(['name', 'email', 'password', 'confirmPassword']);
    // }

    if (isValid) {
      setStep(step + 1);
      scrollToTop();
    }
  }, [step, methods]);

  const prevStep = useCallback(() => {
    scrollToTop();
    if (step === 1) {
      navigate('/login');
    } else {
      setStep(step - 1);
    }
  }, [step, navigate]);

  const onSubmit = (data: any) => {
    console.log('data', data);
    navigate('/signup-completed', { state: { name: data.name } });
  };

  return (
    <div className="flex justify-center">
      <section className="w-[1200px] flex flex-col items-center gap-11 py-12 tablet:w-full tablet:px-7 mobile:gap-9 mobile:w-full mobile:pt-0 mobile:pb-9 mobile:px-5">
        <PageHeader title="회원가입" />
        <Stepper currentStep={step} stepLabel={steps}></Stepper>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="w-full max-w-[720px] flex flex-col gap-11 mobile:gap-9"
            noValidate>
            {step === 1 && <SignUpCommonStep1 />}
            {step === 2 && <SignUpAdminStep2 />}
            {step === 3 && <SignUpAdminStep3 />}
            <StepNavigation next={nextStep} back={prevStep} isLastStep={step === 3} lastLabel="가입하기" />
          </form>
        </FormProvider>
      </section>
    </div>
  );
};

export default SignUpAdmin;
