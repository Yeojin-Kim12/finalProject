import { useRecoilValue } from 'recoil';
import { Navigate } from 'react-router-dom';
import { loginState } from '@/recoilstate/login/atoms';

interface ProtectedRouteProps {
  allowedRoles: string;
  children: JSX.Element | JSX.Element[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles, children }) => {
  const { isLoggedIn, userInfo } = useRecoilValue(loginState);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (userInfo && allowedRoles.includes(userInfo.role)) {
    return <>{children}</>;
  }

  return <Navigate to="/" replace />;
};

export default ProtectedRoute;
