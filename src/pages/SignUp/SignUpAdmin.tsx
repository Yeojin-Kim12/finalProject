import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import Stepper from '@/components/Stepper';
import useScrollToTopOnClick from '@/hooks/useScrollToTopOnClick';
import PageHeader from '@/components/common/PageHeader';
import StepNavigation from '@/components/common/StepNavigation';
import SignUpCommonStep1 from '@/components/SignUp/SignUpCommonStep1';
import SignUpAdminStep2 from '@/components/SignUp/SignUpAdminStep2';
import SignUpAdminStep3 from '@/components/SignUp/SignUpAdminStep3';
import SignUpAdminSchema from './SignUpAdminSchema';
import axios from 'axios';
import { BASE_URL } from '@/lib/constants';

const steps = ['약관동의', '회원가입', '담당자인증', '가입완료'];
const SignUpAdmin = () => {
  const scrollToTop = useScrollToTopOnClick();
  const [step, setStep] = React.useState(1);
  const methods = useForm({
    resolver: zodResolver(SignUpAdminSchema),
    mode: 'onSubmit',
    criteriaMode: 'all',
    defaultValues: {
      agree1: 'false',
      agree2: 'false',
      name: '',
      email: '',
      certificationCode: '',
      isSendCode: false,
      isVerifyCode: false,
      password: '',
      confirmPassword: '',
      phoneNumber: '',
      companyName: '',
      registrationFile: [],
      address: '',
      addressDetail: '',
      business: '',
      housingFile: [],
    },
  });

  const navigate = useNavigate();
  const nextStep = React.useCallback(async () => {
    let isValid = false;
    if (step === 1) {
      isValid = await methods.trigger(['agree1', 'agree2']);
    } else if (step === 2) {
      isValid = await methods.trigger([
        'name',
        'email',
        'certificationCode',
        'isVerifyCode',
        'password',
        'confirmPassword',
        'phoneNumber',
        'companyName',
        'registrationFile',
        'address',
        'addressDetail',
      ]);
    }

    if (isValid) {
      setStep(step + 1);
      scrollToTop();
    }
  }, [step, methods]);

  const prevStep = React.useCallback(() => {
    scrollToTop();
    if (step === 1) {
      navigate('/login');
    } else {
      setStep(step - 1);
    }
  }, [step, navigate]);

  const onSubmit = async (data: any) => {
    const isValid = await methods.trigger(['business', 'housingFile']);
    const {
      name,
      email,
      password,
      phoneNumber,
      companyName,
      business,
      housingFile,
      address,
      addressDetail,
      registrationFile,
    } = data;
    const fullAddress = `${address} ${addressDetail}`;
    if (isValid) {
      const res = await axios.post(
        `${BASE_URL}/api/auth/admin-signup`,
        {
          name,
          email,
          password,
          phoneNumber,
          companyName,
          address: fullAddress,
          registrationFile: registrationFile[0],
          business,
          housingFile: housingFile[0],
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (typeof res.data === 'string') {
        navigate('/signup-completed', { state: { name: data.name, type: 'member' } });
      } else {
        console.error(res.data.result.resultMessage);
      }
    }
    navigate('/signup-completed', { state: { name: data.name, type: 'admin' } });
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
