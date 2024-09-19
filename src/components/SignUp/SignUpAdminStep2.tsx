import { useDaumPostcodePopup } from 'react-daum-postcode';
import SignUpInputValidation from '../common/SignUpInputValidation';
import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { useFileUpload } from '@/hooks/useFileUpload';
import { Tag } from '../ui/tag';
import axios from 'axios';
import { BASE_URL } from '@/lib/constants';

const SignUpAdminStep2 = () => {
  const [isSendCode, setIsSendCode] = React.useState<boolean>(false);
  const [isVerifyCode, setIsVerifyCode] = React.useState<boolean>(false);
  const [pdfName, setPdfName] = React.useState('');
  const {
    control,
    setValue,
    getValues,
    setError,
    formState: { errors },
  } = useFormContext();
  const { append: appendRegistrationFile, remove: removeRegistrationFile } = useFieldArray({
    control,
    name: 'registrationFile',
  });
  const { uploadToServer } = useFileUpload();
  React.useEffect(() => {
    setIsSendCode(getValues('isSendCode'));
    setIsVerifyCode(getValues('isVerifyCode'));
  }, []);

  // 주소검색
  const postcodeUrl = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
  const postcodeOpen = useDaumPostcodePopup(postcodeUrl);

  //이메일코드 전송
  const handleSendEmailCode = async (isValid: boolean) => {
    if (!isValid) return;
    const email = getValues('email');
    const res = await axios.post(
      `${BASE_URL}/api/auth/register/send-email-code`,
      { email },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    console.log(res);
    if (typeof res.data === 'string') {
      setValue('isSendCode', true);
      setIsSendCode(true);
    } else {
      setValue('isSendCode', false);
      setIsSendCode(false);
    }
  };

  //인증번호 확인
  const handleConfirmEmailCode = async (isValid: boolean) => {
    if (!isValid) return;
    const email = getValues('email');
    const verificationCode = getValues('certificationCode');
    const res = await axios.post(
      `${BASE_URL}/api/auth/register/verify-admin-email`,
      { email, verificationCode },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    console.log(res);
    if (typeof res.data === 'string') {
      setValue('isVerifyCode', true);
      setIsVerifyCode(true);
    } else {
      const errorMessage = res.data.result.resultMessage;
      console.log(errorMessage);
      setError('certificationCode', { type: 'codeError', message: errorMessage });
    }
  };

  // useEffect를 사용하여 pdfName 업데이트
  React.useEffect(() => {
    const getFile = getValues('registrationFile');
    if (getFile.length > 0) {
      setPdfName(getFile[0].name);
    } else {
      setPdfName('');
    }
  }, [getValues]);
  // 파일첨부
  const handlePdfFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(file);

    if (file && file.type === 'application/pdf') {
      const getFile = getValues('registrationFile');
      setPdfName(file.name);
      if (getFile.length > 0) {
        removeRegistrationFile(0);
      }

      // 새로운 파일 업로드
      const uploadedUrls = await uploadToServer([file], 'REGISTRATION');
      if (uploadedUrls !== undefined && uploadedUrls.length > 0) {
        console.log('업로드된 파일 URL:', uploadedUrls[0]);
        appendRegistrationFile({
          name: file.name,
          url: uploadedUrls[0],
          type: 'REGISTRATION',
        });
      }
    } else {
      console.error('PDF 파일만 업로드할 수 있습니다.');
    }
  };
  const handleRemoveFile = (name: string) => {
    const housingFiles = getValues('registrationFile');
    const index = housingFiles.findIndex((file: { name: string }) => file.name === name);

    if (index !== -1) {
      removeRegistrationFile(index);
      setPdfName(''); // pdfName 상태 초기화
    }
  };
  //우편번호 검색
  const handlePostcodeClick = (isValid: boolean) => {
    isValid;
    console.log('check');
    postcodeOpen({
      onComplete: (data) => setValue('address', data.address),
    });
  };

  return (
    <>
      <article className="flex flex-col gap-10 mobile:gap-6">
        <SignUpInputValidation name="name" label="이름" placeholder="이름을 입력해주세요" />
        <SignUpInputValidation
          name="email"
          label="이메일(아이디)"
          placeholder="이메일(아이디)를 입력해주세요"
          buttonTitle={isSendCode ? '전송 완료' : '이메일 인증'}
          buttonVariant="outline"
          buttonSize="lg"
          errorMessage="이메일(아이디)을 입력해주세요"
          onButtonClick={handleSendEmailCode}
          disabled={isVerifyCode}
        />
        {isSendCode && (
          <SignUpInputValidation
            name="certificationCode"
            label="인증번호"
            placeholder="인증번호를 입력해주세요"
            buttonTitle={`${isVerifyCode ? '인증완료' : '인증하기'}`}
            buttonVariant="outline"
            buttonSize="lg"
            errorMessage="인증코드를 입력해주세요"
            onButtonClick={handleConfirmEmailCode}
          />
        )}
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
          name="callNumber"
          label="대표번호"
          placeholder="대표 번호를 입력해주세요"
          numberOnly
        />
        <SignUpInputValidation name="companyName" label="회사명" placeholder="회사명을 입력해주세요" />
        <div className="flex flex-col gap-5">
          <SignUpInputValidation
            id="registrationInputId"
            type="file"
            name="registrationFile"
            label="사업자등록증"
            placeholder="10MB 이하의 pdf 파일만 등록할 수 있어요"
            buttonTitle="파일첨부"
            buttonVariant="outline"
            buttonType="button"
            buttonSize="lg"
            onFileChange={handlePdfFileChange}
            errorMessage={errors?.registrationFile && (errors?.registrationFile as any).message}
            disabled
          />
          {pdfName && <Tag label={pdfName} onClick={() => handleRemoveFile} />}
        </div>
        <div>
          <SignUpInputValidation
            name="address"
            label="주소"
            placeholder="주소를 입력해주세요"
            buttonTitle="우편번호 검색"
            buttonVariant="outline"
            buttonSize="lg"
            buttonType="button"
            onButtonClick={handlePostcodeClick}
            noValidation={true}
            disabled
          />
          <SignUpInputValidation name="addressDetail" placeholder="상세주소를 입력해주세요" />
        </div>
      </article>
    </>
  );
};

export default SignUpAdminStep2;
