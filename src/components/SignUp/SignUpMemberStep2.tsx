import SignUpInputValidation from '../common/SignUpInputValidation';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import axios from 'axios';
import { BASE_URL } from '@/lib/constants';

const SignUpMemberStep2 = () => {
  const [isVerifyEmail, setIsVerifyEmail] = React.useState<boolean>(false);
  const [isSendCode, setIsSendCode] = React.useState<boolean>(false);
  const [isVerifyCode, setIsVerifyCode] = React.useState<boolean>(false);
  const { getValues, setValue, setError } = useFormContext();

  //이메일 중복확인 전송
  const handleVerifyEmail = async (isValid: boolean) => {
    if (!isValid) return;
    const email: string = getValues('email');
    const res = await axios.post(
      `${BASE_URL}/api/auth/register/verify-member-email`,
      { email: email },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    console.log(res);
    if (typeof res.data === 'string') {
      setValue('isVerifyEmail', true);
      setError('email', { type: 'emailSuccess', message: res.data });
      setIsVerifyEmail(true);
    } else {
      const errorMessage = res.data.result.resultMessage;
      console.log(errorMessage);
      setError('email', { type: 'emailError', message: errorMessage });
    }
  };

  //휴대폰번호 인증번호 전송
  const handleSendPhoneCode = async (isValid: boolean) => {
    if (!isValid) return;
    const phoneNumber = getValues('phoneNumber');
    const res = await axios.post(
      `${BASE_URL}/api/auth/register/send-sms-code`,
      { phoneNumber },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    console.log(res);
    if (typeof res.data === 'string') {
      setValue('isSendCode', true);
      setError('phoneNumber', { type: 'phoneNumberSuccess', message: res.data });
      setIsSendCode(true);
    } else {
      setValue('isSendCode', false);
      setIsSendCode(false);
      const errorMessage = res.data.result.resultMessage;
      setError('phoneNumber', { type: 'phoneNumberError', message: errorMessage });
    }
  };

  //인증번호 확인
  const handleConfirmPhoneCode = async (isValid: boolean) => {
    if (!isValid) return;
    const phoneNumber = getValues('phoneNumber');
    const certificationCode = getValues('certificationCode');
    const res = await axios.post(
      `${BASE_URL}/api/auth/register/verify-sms`,
      { phoneNumber, certificationCode },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    console.log(res);
    if (typeof res.data === 'string') {
      setValue('isVerifyCode', true);
      setError('certificationCode', { type: 'codeSuccess', message: res.data });
      setIsVerifyCode(true);
    } else {
      const errorMessage = res.data.result.resultMessage;
      console.log(errorMessage);
      setError('certificationCode', { type: 'codeError', message: errorMessage });
    }
  };
  React.useEffect(() => {
    setIsSendCode(getValues('isSendCode'));
    setIsVerifyCode(getValues('isVerifyCode'));
  }, []);
  return (
    <>
      <article className="flex flex-col gap-10 mobile:gap-6">
        <SignUpInputValidation name="name" label="이름" placeholder="이름을 입력해주세요" />
        <SignUpInputValidation
          name="email"
          label="이메일(아이디)"
          placeholder="이메일(아이디)를 입력해주세요"
          errorMessage="이메일(아이디)를 입력해주세요"
          buttonTitle={`${isVerifyEmail ? '확인 완료' : '중복 확인'}`}
          buttonVariant="outline"
          buttonSize="lg"
          onButtonClick={handleVerifyEmail}
          disabled={isVerifyEmail}
          buttonDisabled={isVerifyEmail}
        />
        <SignUpInputValidation
          type="password"
          name="password"
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요"
        />
        <SignUpInputValidation
          type="password"
          name="confirmPassword"
          label="비밀번호 확인"
          placeholder="비밀번호를 다시 입력해주세요"
        />
      </article>
      <div className="w-full h-1 bg-assistive-divider divide-y"></div>
      <article className="flex flex-col gap-10 mobile:gap-6">
        <SignUpInputValidation
          name="phoneNumber"
          label="휴대폰번호"
          placeholder="휴대폰 번호를 입력해주세요"
          errorMessage="휴대폰 번호를 입력해주세요"
          buttonTitle={isSendCode ? '전송 완료' : '인증번호 전송'}
          buttonVariant="outline"
          buttonSize="lg"
          onButtonClick={handleSendPhoneCode}
          numberOnly
          disabled={isVerifyCode}
          buttonDisabled={isVerifyCode}
        />
        {isSendCode && (
          <SignUpInputValidation
            name="certificationCode"
            label="인증번호"
            placeholder="인증번호를 입력해주세요"
            errorMessage="인증번호 4자리를 입력해주세요"
            buttonTitle={`${isVerifyCode ? '인증 완료' : '인증하기'}`}
            buttonVariant="outline"
            buttonType="button"
            buttonSize="lg"
            onButtonClick={handleConfirmPhoneCode}
            disabled={isVerifyCode}
            buttonDisabled={isVerifyCode}
            numberOnly
          />
        )}
      </article>
    </>
  );
};

export default SignUpMemberStep2;
