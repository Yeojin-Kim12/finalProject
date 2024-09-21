import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import buildingImg from '../../assets/buildings.svg';
import { Button } from '@/components/ui/button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { loginSchema, FormFields } from '@/types/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { EyeClosed, Eye } from '@phosphor-icons/react';
import PageHeader from '@/components/common/PageHeader';
import { BASE_URL } from '@/lib/constants';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function Login() {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const isValid = await trigger(['email', 'password']);
    console.log(isValid);
    if (isValid) {
      const { email, password } = data;
      const res = await axios.post(
        `${BASE_URL}/api/auth/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      console.log(res);
      if (res.data.body !== null) {
        const { accessToken, refreshToken } = res.data;
        const setCookie = (name: string, value: string, days: number) => {
          Cookies.set(name, value, {
            expires: days,
            path: '/',
            secure: true,
            sameSite: 'None',
          });
        };
        setCookie('accessToken', accessToken, 2);
        setCookie('refreshToken', refreshToken, 2);
        navigate('/');
      } else {
        setError('root', {
          type: 'manual',
          message: res.data.result.resultMessage || '로그인에 실패했습니다. 다시 시도해주세요.',
        });
        console.error(res.data.result.resultMessage);
      }
    }
  };

  return (
    <main className="flex w-full items-center justify-center px-8">
      <section className="flex w-full max-w-[1536px] py-[80px] justify-center items-center gap-[64px]">
        <div className="hidden desktop:block w-1/2">
          <article className="flex-col w-full">
            <h1 className="mb-10 text-static-default font-bold text-heading-base">
              미분양 플랫폼 <br />
              클리어 분양에 오신 것을 환영합니다
            </h1>
            <p className="mb-20  text-static-default text-body-lg">
              고객과 분양 대행사 /건설사와의 보다 쉬운 연결을 추구합니다 <br />
              담당자에게 미분양 매물의 상세한 안내를 받아보세요 <br />
              미분양 매물을 고객에게 홍보해보세요 <br />
              성공적인 분양을 이끌어 낼 수 있습니다
            </p>
            <img className="mx-auto place-content-center" src={buildingImg} alt="buildings"></img>
          </article>
        </div>
        <div className="flex justify-center w-full desktop:w-1/2 mobile:text-heading-sm">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col p-16 mobile:p-5 w-[576px] mobile:w-full rounded-[32px] shadow-[0_4px_40px_0_rgba(70,69,107,0.15)] mobile:shadow-none">
            <article className="relative w-full flex flex-col gap-6">
              <div className="w-full flex justify-center">
                <PageHeader title="로그인" />
              </div>
              <div className="flex flex-col text-title-base mobile:text-title-base-m">
                <label className="font-bold py-5 inline-block text-static-default">이메일(아이디)</label>
                <input
                  className="input-base w-full h-[53px] mobile:h-[47px] px-5 py-4 border rounded-5 text-label-lg"
                  {...register('email', { required: '아이디를 입력해주세요' })}
                  type="text"
                  placeholder="이메일(아이디)을 입력해주세요"
                  onFocus={() => clearErrors('root')}
                />
              </div>

              <div className="flex flex-col text-title-base mobile:text-title-base-m">
                <label className=" font-bold py-5 inline-block text-static-default">비밀번호</label>
                <div className="relative">
                  <input
                    className="input-base w-full h-[53px] mobile:h-[47px] px-5 py-4 pr-10 border rounded-5 text-label-lg"
                    {...register('password', { required: '비밀번호를 입력해주세요' })}
                    type={isPasswordVisible ? 'text' : 'password'}
                    placeholder="비밀번호를 입력해주세요"
                    onFocus={() => clearErrors('root')}
                  />
                  <div
                    className="absolute inset-y-0 my-auto right-2 flex items-center pr-5 cursor-pointer"
                    onClick={togglePasswordVisibility}>
                    {isPasswordVisible ? (
                      <Eye size={24} className="text-assistive-default" />
                    ) : (
                      <EyeClosed size={24} className="text-assistive-default" />
                    )}
                  </div>
                </div>
              </div>
            </article>
            <div className="relative h-[100px] mobile:h-11 flex flex-col justify-center">
              <div className="absolute text-accent-error text-label-lg mobile:text-label-lg-m">
                {errors.root ? (
                  <pre className="h-[29px]">{errors.root.message}</pre>
                ) : errors.email ? (
                  <div>{errors.email.message}</div>
                ) : errors.password ? (
                  <div>{errors.password.message}</div>
                ) : null}
              </div>
            </div>
            <div className="flex flex-col gap-[60px] mobile:gap-9">
              <Button disabled={isSubmitting} type="submit">
                로그인
              </Button>
              <div className="flex gap-4">
                <Link to="/member-signup" className="w-1/2">
                  <Button variant="assistive" className="w-full">
                    고객으로 가입하기
                  </Button>
                </Link>
                <Link to="/admin-signup" className="w-1/2">
                  <Button variant="assistive" className="w-full">
                    담당자로 가입하기
                  </Button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
