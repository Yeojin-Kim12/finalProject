// import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
// import { login as loginApi } from '../api/login';
// import { parseJwt } from '../utils/jwt';

// interface User {
//   name: string;
//   email: string;
// }

// interface AuthContextType {
//   user: User | null;
//   login: (email: string, password: string) => Promise<void>;
//   // signup: (name: string, email: string, password: string) => Promise<void>;
//   logout: () => void;
//   // confirmLogout: () => void;
//   // deleteAccount: () => Promise<void>;
// }

// interface AuthProviderProps {
//   children: ReactNode;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);

//   useEffect(() => {
//     const accessToken = sessionStorage.getItem('accessToken');
//     if (accessToken) {
//       const decodedToken: any = parseJwt(accessToken);
//       if (decodedToken && decodedToken.iss && decodedToken.sub) {
//         setUser({ name: decodedToken.iss, email: decodedToken.sub });
//       }
//     }
//   }, []);

//   const login = async (email: string, password: string) => {
//     try {
//       const data = await loginApi(email, password);
//       const token = data.access_token;
//       const decodedToken: any = parseJwt(token);

//       if (decodedToken && decodedToken.iss && decodedToken.sub) {
//         setUser({ name: decodedToken.iss, email: decodedToken.sub });
//         sessionStorage.setItem('accessToken', token);
//       } else {
//         throw new Error('Invalid token format');
//       }
//     } catch (error: any) {
//       throw new Error(error.response?.data?.message || '로그인 실패했습니다. 다시 시도해주세요.');
//     }
//   };

//   // const signup = async (name: string, email: string, password: string) => {
//   //   try {
//   //     await signupApi(name, email, password);
//   //   } catch (error) {
//   //     console.error('Signup failed:', error);
//   //   }
//   // };

//   const logout = () => {
//     alert('성공적으로 로그아웃하셨습니다.');
//   };

//   // const confirmLogout = () => {
//   //   logoutApi();
//   //   setUser(null);
//   //   sessionStorage.removeItem('accessToken');
//   //   closeLogoutConfirmModal();
//   // };

//   // const deleteAccount = async () => {
//   //   try {
//   //     await deleteAccountApi();
//   //     setUser(null);
//   //     sessionStorage.removeItem('accessToken');
//   //     console.log('회원탈퇴 성공');
//   //   } catch (error) {
//   //     console.log('회원탈퇴 실패:', error);
//   //   }
//   // };

//   return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
// };

// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };
