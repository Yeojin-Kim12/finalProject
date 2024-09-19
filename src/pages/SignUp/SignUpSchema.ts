import { z } from 'zod';

// name
const NAME_REGEX = /^[A-Za-z가-힣]+$/;
const NAME_REGEX_ERROR = '한글과 영어만 가능합니다.';

// password
const MIN_PASSWORD_LEGNTH = 8;
const MIN_PASSWORD_LEGNTH_ERROR = '최소 8자 이상이어야 합니다.';
const MAX_PASSWORD_LEGNTH = 30;
const MAX_PASSWORD_LEGNTH_ERROR = '최대 30자입니다.';
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*?[#?!@$%^&*-]).+$/;
const PASSWORD_REGEX_ERROR = '비밀번호는 대문자,소문자, 특수기호를 포함해야 합니다.';
const PASSWORD_REQUIRED_ERROR = '비밀번호를 입력해주세요.';

const PHONE_NUMBER_LENGTH = 11;
const PHONE_NUMBER_ERROR = '11자를 입력하세요.';

const VERIFICATION_CODE_LENGTH = 6;
const VERIFICATION_CODE_LENGTH_ERROR = '인증코드는 6자리입니다.';

const PHONE_NUMBER_REGEX = /^\d+$/;
const PHONE_NUMBER_REGEX_ERROR = '숫자만 가능합니다.';

const SignUpSchema = z
  .object({
    name: z.string().regex(NAME_REGEX, NAME_REGEX_ERROR),
    phoneNumber: z
      .string()
      .regex(PHONE_NUMBER_REGEX, PHONE_NUMBER_REGEX_ERROR)
      .length(PHONE_NUMBER_LENGTH, PHONE_NUMBER_ERROR),
    email: z.string().email({ message: '유효한 메일이 아닙니다.' }).toLowerCase(),
    password: z
      .string({
        required_error: PASSWORD_REQUIRED_ERROR,
      })
      .min(MIN_PASSWORD_LEGNTH, MIN_PASSWORD_LEGNTH_ERROR)
      .max(MAX_PASSWORD_LEGNTH, MAX_PASSWORD_LEGNTH_ERROR)
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirmPassword: z.string(),
    accessKey: z
      .string({ message: '코드를 입력해주세요.' })
      .length(VERIFICATION_CODE_LENGTH, VERIFICATION_CODE_LENGTH_ERROR),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: '비밀번호와 비밀번호 확인이 같아야 합니다.',
      path: ['confirmPassword'],
    },
  );

export default SignUpSchema;
