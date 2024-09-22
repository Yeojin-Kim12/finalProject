import { Outlet } from 'react-router-dom';
import GNB from './GNB/GNB';
import { loginState } from '@/recoilstate/login/atoms';
import { useSetRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import { BASE_URL } from '@/lib/constants';
import axios from 'axios';

function Layout() {
  const setLoginData = useSetRecoilState(loginState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGnb = async () => {
      try {
        const adminRes = await axios.get(`${BASE_URL}/api/admin/my-information`, {
          withCredentials: true,
        });
        setLoginData({
          isLoggedIn: true,
          userInfo: {
            name: adminRes.data.name,
            role: adminRes.data.role,
          },
        });
        return adminRes.data;
      } catch (adminError) {
        try {
          const memberRes = await axios.get(`${BASE_URL}/api/member/my-information`, {
            withCredentials: true,
          });
          setLoginData({
            isLoggedIn: true,
            userInfo: {
              name: memberRes.data.name,
              role: memberRes.data.role,
            },
          });
          return memberRes.data;
        } catch (memberError) {
          setLoginData({
            isLoggedIn: false,
            userInfo: null,
          });
          return null;
        }
      } finally {
        setLoading(false);
      }
    };
    fetchGnb();
  }, [setLoginData]);

  if (loading) {
    // 새로고침 시 리코일보다 먼저 실행 방지
    return;
  }

  return (
    <>
      <GNB />
      <main className="relative">
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
