import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Layout from '../components/Layout';
import Footer from '@/components/common/Footer';
import FAB from '@/components/common/FAB';
import ServiceOverview from '@/pages/ServiceOverview';
import ProtectedRoute from './ProtectedRoute';
const TestHY = lazy(() => import('@/pages/TestHY'));
const TestYJ = lazy(() => import('@/pages/TestYJ'));
const PropertyKeywords = lazy(() => import('@/components/PropertyAdd/PropertyKeywords'));
const CustomerService = lazy(() => import('@/pages/CustomerService/CustomerService'));
const PropertyManagement = lazy(() => import('@/pages/PropertyManagement'));
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

const ProgressBar = () => (
  <>
    <div className="fixed z-50 top-0 left-0 w-full h-3 bg-primary-strong">
      <div className="progress-bar w-full h-full bg-primary-strong animate-progress transition-all"></div>
      <style>
        {`
        @layer utilities {
          @keyframes progress {
            0% { width: 0%; }
            100% { width: 100%; }
            }
            .animate-progress {
              animation: progress 2s linear infinite;
              }
              }
              `}
      </style>
    </div>
    <div className="fixed top-0 left-0 size-full bg-effect-shadow"></div>
  </>
);
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
        path: '/test-hy',
        element: (
          <Suspense fallback={<ProgressBar />}>
            <TestHY />
            <Footer />
          </Suspense>
        ),
      },
      {
        path: '/test-yj',
        element: (
          <Suspense fallback={<ProgressBar />}>
            <TestYJ />
            <Footer />
          </Suspense>
        ),
      },
      {
        path: '/login',
        element: (
          <Suspense fallback={<ProgressBar />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: '/admin-signup',
        element: (
          <Suspense fallback={<ProgressBar />}>
            <SignUpAdmin />
          </Suspense>
        ),
      },
      {
        path: '/member-signup',
        element: (
          <Suspense fallback={<ProgressBar />}>
            <SignUpMember />
          </Suspense>
        ),
      },
      {
        path: '/signup-completed',
        element: (
          <Suspense fallback={<ProgressBar />}>
            <SignUpCompleted />
          </Suspense>
        ),
      },
      {
        path: '/service-overview',
        element: (
          <Suspense fallback={<ProgressBar />}>
            <ServiceOverview />
            <Footer />
          </Suspense>
        ),
      },
      {
        path: '/property-add',
        element: (
          <Suspense fallback={<ProgressBar />}>
            <ProtectedRoute allowedRoles={'ADMIN'}>
              <PropertyAdd />
            </ProtectedRoute>
          </Suspense>
        ),
      },
      {
        path: '/property/:id',
        element: (
          <Suspense fallback={<ProgressBar />}>
            <PropertyDetail />
            <Footer />
            <FAB />
          </Suspense>
        ),
      },
      {
        path: '/dashboard',
        element: (
          <Suspense fallback={<ProgressBar />}>
            <ProtectedRoute allowedRoles={'ADMIN'}>
              <DashBoard />
              <Footer />
            </ProtectedRoute>
          </Suspense>
        ),
      },
      {
        path: '/search',
        element: (
          <Suspense fallback={<ProgressBar />}>
            <Search />
            <Footer />
          </Suspense>
        ),
      },
      {
        path: '/property',
        element: (
          <Suspense fallback={<ProgressBar />}>
            <PropertySearch />
            <Footer />
          </Suspense>
        ),
      },

      {
        path: '/keywordTest',
        element: (
          <Suspense fallback={<ProgressBar />}>
            <PropertyKeywords />
            <Footer />
          </Suspense>
        ),
      },
      {
        path: '/customer-service',
        element: (
          <Suspense fallback={<ProgressBar />}>
            <ProtectedRoute allowedRoles={'ADMIN'}>
              <CustomerService />
              <Footer />
            </ProtectedRoute>
          </Suspense>
        ),
      },
      {
        path: '/property-management',
        element: (
          <Suspense fallback={<ProgressBar />}>
            <ProtectedRoute allowedRoles={'ADMIN'}>
              <PropertyManagement />
              <Footer />
            </ProtectedRoute>
          </Suspense>
        ),
      },
      {
        path: '/favorite',
        element: (
          <Suspense fallback={<ProgressBar />}>
            <ProtectedRoute allowedRoles={'MEMBER'}>
              <Favorite />
              <Footer />
            </ProtectedRoute>
          </Suspense>
        ),
      },
      {
        path: '/counsel-list',
        element: (
          <Suspense fallback={<ProgressBar />}>
            <ProtectedRoute allowedRoles={'MEMBER'}>
              <CounselList />
              <Footer />
            </ProtectedRoute>
          </Suspense>
        ),
      },
      {
        path: '*', // 잘못된 접근
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);
