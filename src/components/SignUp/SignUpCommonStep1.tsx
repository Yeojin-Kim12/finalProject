import { Controller, useFormContext } from 'react-hook-form';
import TextAreaWithRadio from '../common/TextAreaWithRadio';

const SignUpCommonStep1 = () => {
  const { control, trigger } = useFormContext();

  return (
    <>
      <article className="flex flex-col gap-10 mobile:gap-6">
        <Controller
          name="agree1"
          control={control}
          rules={{ required: '동의해주세요' }}
          render={({ field, fieldState }) => (
            <TextAreaWithRadio
              id="agree1"
              label="이용약관"
              text="이용약관 작성"
              errorMessage={fieldState.error?.message}
              value={field.value}
              onChange={field.onChange}
              trigger={trigger} // trigger 함수 전달
            />
          )}
        />
        <Controller
          name="agree2"
          control={control}
          rules={{ required: '동의해주세요' }}
          render={({ field, fieldState }) => (
            <TextAreaWithRadio
              id="agree2"
              label="개인정보 처리방침"
              text="개인정보 처리방침 작성"
              errorMessage={fieldState.error?.message}
              value={field.value}
              onChange={field.onChange}
              trigger={trigger} // trigger 함수 전달
            />
          )}
        />
      </article>
    </>
  );
};

export default SignUpCommonStep1;
