import { useCallback, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import Stepper from '@/components/Stepper';
import useScrollToTopOnClick from '@/hooks/useScrollToTopOnClick';
import PageHeader from '@/components/common/PageHeader';
import StepNavigation from '@/components/common/StepNavigation';
import SignUpMemberStep2 from '@/components/SignUp/SignUpMemberStep2';
import SignUpCommonStep1 from '@/components/SignUp/SignUpCommonStep1';
import SignUpMemberSchema from './SignUpMemberSchema';
import axios from 'axios';
import { BASE_URL } from '@/lib/constants';

const steps = ['약관동의', '회원가입', '가입완료'];
const SignUpMember = () => {
  const scrollToTop = useScrollToTopOnClick();
  const [step, setStep] = useState(1);
  const methods = useForm({
    resolver: zodResolver(SignUpMemberSchema),
    mode: 'onChange',
    criteriaMode: 'all',
    defaultValues: {
      agree1: 'false',
      agree2: 'false',
      name: '',
      email: '',
      isVerifyEmail: false,
      password: '',
      confirmPassword: '',
      phoneNumber: '',
      certificationCode: '',
      isSendCode: false,
      isVerifyCode: false,
    },
  });

  const navigate = useNavigate();
  const nextStep = useCallback(async () => {
    let isValid = false;
    if (step === 1) {
      isValid = await methods.trigger(['agree1', 'agree2']);
    }

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

  const onSubmit = async (data: any) => {
    console.log('data', data);
    const isValid = await methods.trigger([
      'name',
      'email',
      'isVerifyEmail',
      'password',
      'confirmPassword',
      'phoneNumber',
      'certificationCode',
      'isVerifyCode',
    ]);
    const { name, email, password, phoneNumber } = data;
    if (isValid) {
      const res = await axios.post(
        `${BASE_URL}/api/auth/member-signup`,
        { name, email, password, phoneNumber },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      console.log(res);
      if (typeof res.data === 'string') {
        navigate('/signup-completed', { state: { name: data.name, type: 'member' } });
      } else {
        console.error(res.data.result.resultMessage);
      }
    }
  };

  return (
    <div className="flex justify-center">
      <section className="w-[1200px] flex flex-col items-center gap-11 py-12 tablet:w-full tablet:px-7 mobile:gap-9 mobile:w-full mobile:pt-0 mobile:pb-9 mobile:px-5">
        <PageHeader title="회원가입" />
        <Stepper currentStep={step} stepLabel={steps}></Stepper>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="w-full max-w-[720px] flex flex-col gap-11 mobile:gap-9">
            {step === 1 && <SignUpCommonStep1 />}
            {step === 2 && <SignUpMemberStep2 />}
            <StepNavigation
              next={nextStep}
              back={prevStep}
              isLastStep={step === steps.length - 1}
              lastLabel="가입하기"
            />
          </form>
        </FormProvider>
      </section>
    </div>
  );
};

export default SignUpMember;
