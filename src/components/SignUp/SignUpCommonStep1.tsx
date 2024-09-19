import { useFormContext } from 'react-hook-form';
import TextAreaWithRadio from '../common/TextAreaWithRadio';
// import { useEffect } from 'react';

const SignUpCommonStep1 = () => {
  const {
    register,
    formState: { errors },
    getValues,
  } = useFormContext();

  return (
    <>
      <article className="flex flex-col gap-10 mobile:gap-6">
        <TextAreaWithRadio
          id="agree1"
          label="이용약관"
          register={register}
          text="이용약관 작성"
          errorMessage={(errors.agree1 as any)?.message}
          getValues={getValues}
          required
        />
        <TextAreaWithRadio
          id="agree2"
          label="개인정보 처리방침"
          register={register}
          text="개인정보 처리방치 작성"
          errorMessage={(errors.agree2 as any)?.message}
          getValues={getValues}
          required
        />
      </article>
    </>
  );
};

export default SignUpCommonStep1;
