import { z } from 'zod';

// name
const NAME_REGEX = /^[A-Za-z가-힣]+$/;
const NAME_REGEX_ERROR = '한글과 영어만 가능합니다.';

// password
const MIN_PASSWORD_LENGTH = 10;
const MIN_PASSWORD_LENGTH_ERROR = '최소 10자 이상이어야 합니다.';
const MAX_PASSWORD_LENGTH = 20;
const MAX_PASSWORD_LENGTH_ERROR = '최대 20자입니다.';
const PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*?[#?!@$%^&*-]).+$/;
const PASSWORD_REGEX_ERROR = '비밀번호는 영문+숫자+특수문자를 조합하여 10자 이상으로 입력해주세요.';
const PASSWORD_REQUIRED_ERROR = '비밀번호를 입력해주세요.';

const PHONE_NUMBER_LENGTH = 11;
const PHONE_NUMBER_ERROR = '11자를 입력하세요.';
const PHONE_NUMBER_REGEX = /^\d+$/;
const PHONE_NUMBER_REGEX_ERROR = '숫자만 가능합니다.';

const VERIFICATION_CODE_LENGTH = 4;
const VERIFICATION_CODE_LENGTH_ERROR = '인증코드는 4자리입니다.';

const SignUpMemberSchema = z
  .object({
    name: z.string().regex(NAME_REGEX, NAME_REGEX_ERROR),
    email: z.string().email({ message: '유효한 이메일 주소가 아닙니다.' }).toLowerCase(),
    isVerifyEmail: z.boolean().refine((val) => val === true, {
      message: '이메일 인증이 필요합니다.',
    }),
    password: z
      .string({
        required_error: PASSWORD_REQUIRED_ERROR,
      })
      .min(MIN_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH_ERROR)
      .max(MAX_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH_ERROR)
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirmPassword: z.string(),
    phoneNumber: z
      .string()
      .regex(PHONE_NUMBER_REGEX, PHONE_NUMBER_REGEX_ERROR)
      .length(PHONE_NUMBER_LENGTH, PHONE_NUMBER_ERROR),
    certificationCode: z
      .string({ message: '코드를 입력해주세요.' })
      .length(VERIFICATION_CODE_LENGTH, VERIFICATION_CODE_LENGTH_ERROR),
    isSendCode: z.boolean().optional(),
    isVerifyCode: z.boolean().refine((val) => val === true, {
      message: '인증 코드가 필요합니다.',
    }),
    agree1: z.string().refine((val) => val === 'true', {
      message: '동의해주세요',
    }),
    agree2: z.string().refine((val) => val === 'true', {
      message: '동의해주세요',
    }),
  })
  .superRefine((values, ctx) => {
    if (values.password !== values.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '비밀번호가 일치하지 않습니다.',
        path: ['confirmPassword'],
      });
    }
  });

export default SignUpMemberSchema;
