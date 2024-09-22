import axios from 'axios';
import { loginSchema } from '@/types/types';
import { BASE_URL } from '@/lib/constants';
import Cookies from 'js-cookie';

const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
  return null;
};

export const getAuthHeaders = () => {
  const token = getCookie('accessToken');
  return token ? { accessToken: token } : {};
};

const setCookie = (name: string, value: string, days: number) => {
  Cookies.set(name, value, {
    expires: days,
    path: '/',
    secure: true,
    sameSite: 'None',
  });
  // console.log(`Cookie saved: ${name} = ${value}`);
};

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/auth/login`, { email, password });

    const result = loginSchema.safeParse(response.data);
    let zodErrors = {};
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
      });
    }

    const { accessToken, refreshToken } = response.data;

    // Store tokens in cookies
    setCookie('accessToken', accessToken, 2);
    setCookie('refreshToken', refreshToken, 2);

    return response.data;

    // const accessToken = response.data.accessToken;
    // if (accessToken) {
    //   document.cookie = `accessToken=${accessToken}; path=/; secure; samesite=none`;
    //   console.log('Access token saved to cookie:', accessToken);
    // } else {
    //   throw new Error('No access token in response data');
    // }

    return Object.keys(zodErrors).length > 0
      ? { errors: zodErrors }
      : { success: true, access_token: accessToken };
  } catch (error) {
    console.error('Login API error:', error);
    throw error;
  }
};

export const logout = () => {
  document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
};
