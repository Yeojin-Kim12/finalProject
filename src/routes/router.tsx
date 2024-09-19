import { createBrowserRouter } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Layout from '../components/Layout';
import Footer from '@/components/common/Footer';
import FAB from '@/components/common/FAB';
const TestMS = lazy(() => import('@/pages/TestMS'));
const TestHY = lazy(() => import('@/pages/TestHY'));
const TestYJ = lazy(() => import('@/pages/TestYJ'));
const PropertyKeywords = lazy(() => import('@/components/PropertyAdd/PropertyKeywords'));
const CustomerService = lazy(() => import('@/pages/CustomerService/CustomerService'));
const PropertyManagement = lazy(() => import('@/pages/PropertyManagement/PropertyManagement'));
const Favorite = lazy(() => import('@/pages/Favorite'));
const CounselList = lazy(() => import('@/pages/CounselList'));
const Login = lazy(() => import('@/pages/LoginSignup/Login'));
const PropertyAdd = lazy(() => import('@/pages/PropertyAdd'));
const PropertyDetail = lazy(() => import('@/pages/PropertyDetail'));
const Main = lazy(() => import('@/pages/Main'));
const DashBoard = lazy(() => import('@/pages/DashBoard'));
const Search = lazy(() => import('@/pages/Search'));
const PropertySearch = lazy(() => import('@/pages/PropertySearch'));
const SignUpAdmin = lazy(() => import('@/pages/SignUp/SignUpAdmin'));
const SignUpCompleted = lazy(() => import('@/components/SignUp/SignUpCompleted'));
const SignUpMember = lazy(() => import('@/pages/SignUp/SignUpMember'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={''}>
            <Main />
            <Footer />
          </Suspense>
        ),
      },
      {
        path: '/test-ms',
        element: (
          <Suspense fallback={<div>로딩 중...</div>}>
            <TestMS />
            <Footer />
          </Suspense>
        ),
      },
      {
        path: '/test-hy',
        element: (
          <Suspense fallback={<div>로딩 중...</div>}>
            <TestHY />
            <Footer />
          </Suspense>
        ),
      },
      {
        path: '/test-yj',
        element: (
          <Suspense fallback={<div>로딩 중...</div>}>
            <TestYJ />
            <Footer />
          </Suspense>
        ),
      },
      {
        path: '/login',
        element: (
          <Suspense fallback={<div>로딩 중...</div>}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: '/admin-signup',
        element: (
          <Suspense fallback={<div>로딩 중...</div>}>
            <SignUpAdmin />
          </Suspense>
        ),
      },
      {
        path: '/member-signup',
        element: (
          <Suspense fallback={<div>로딩 중...</div>}>
            <SignUpMember />
          </Suspense>
        ),
      },
      {
        path: '/signup-completed',
        element: (
          <Suspense fallback={<div>로딩 중...</div>}>
            <SignUpCompleted />
          </Suspense>
        ),
      },
      {
        path: '/property-add',
        element: (
          <Suspense fallback={<div>로딩 중...</div>}>
            <PropertyAdd />
          </Suspense>
        ),
      },
      {
        path: '/property/:id',
        element: (
          <Suspense fallback={<div>로딩 중...</div>}>
            <PropertyDetail />
            <Footer />
            <FAB />
          </Suspense>
        ),
      },
      {
        path: '/dashboard',
        element: (
          <Suspense fallback={<div>로딩 중...</div>}>
            <DashBoard />
            <Footer />
          </Suspense>
        ),
      },
      {
        path: '/search',
        element: (
          <Suspense fallback={<div>로딩 중...</div>}>
            <Search />
            <Footer />
          </Suspense>
        ),
      },
      {
        path: '/property',
        element: (
          <Suspense fallback={<div>로딩 중...</div>}>
            <PropertySearch />
            <Footer />
          </Suspense>
        ),
      },

      {
        path: '/keywordTest',
        element: (
          <Suspense fallback={<div>로딩 중...</div>}>
            <PropertyKeywords />
          </Suspense>
        ),
      },
      {
        path: '/search',
        element: (
          <Suspense fallback={<div>로딩 중...</div>}>
            <Search />
          </Suspense>
        ),
      },
      {
        path: '/property',
        element: (
          <Suspense fallback={<div>로딩 중...</div>}>
            <PropertySearch />
          </Suspense>
        ),
      },
      {
        path: '/customer-service',
        element: (
          <Suspense fallback={<div>로딩 중...</div>}>
            <CustomerService />
          </Suspense>
        ),
      },
      {
        path: '/property-management',
        element: (
          <Suspense fallback={<div>로딩 중...</div>}>
            <PropertyManagement />
          </Suspense>
        ),
      },
      {
        path: '/favorite',
        element: (
          <Suspense fallback={<div>로딩 중...</div>}>
            <Favorite />
          </Suspense>
        ),
      },
      {
        path: '/counsel-list',
        element: (
          <Suspense fallback={<div>로딩 중...</div>}>
            <CounselList />
          </Suspense>
        ),
      },
    ],
  },
]);
