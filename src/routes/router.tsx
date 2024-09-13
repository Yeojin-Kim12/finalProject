import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import Login from '@/pages/LoginSignup/Login';
import SignupCompleted from '@/pages/LoginSignup/SignupCompleted';
import PropertyAdd from '@/pages/PropertyAdd';

import TestHY from '@/pages/TestHY';
import TestYJ from '@/pages/TestYJ';
import TestMS from '@/pages/TestMS';
import PropertyDetail from '@/pages/PropertyDetail';
import Main from '@/pages/Main';
import DashBoard from '@/pages/DashBoard';
import PropertyKeywords from '@/components/PropertyAdd/PropertyKeywords';
import Search from '@/pages/Search';
import PropertySearch from '@/pages/PropertySearch';
import CustomerService from '@/pages/CustomerService/CustomerService';
import PropertyManagement from '@/pages/PropertyManagement/PropertyManagement';
import Favorite from '@/pages/Favorite';
import CounselList from '@/pages/CounselList';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Main />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup-completed',
        element: <SignupCompleted />,
      },
      {
        path: '/test-ms',
        element: <TestMS />,
      },
      {
        path: '/test-hy',
        element: <TestHY />,
      },
      {
        path: '/test-yj',
        element: <TestYJ />,
      },
      {
        path: '/property-add',
        element: <PropertyAdd />,
      },
      {
        path: '/property/:id',
        element: <PropertyDetail />,
      },
      { path: '/dashboard', element: <DashBoard /> },
      { path: '/keywordTest', element: <PropertyKeywords /> },
      { path: '/search', element: <Search /> },
      { path: '/property', element: <PropertySearch /> },
      { path: '/customer-service', element: <CustomerService /> },
      {
        path: '/property-management',
        element: <PropertyManagement />,
      },
      { path: '/favorite', element: <Favorite /> },
      { path: '/counsel-list', element: <CounselList /> },
    ],
  },
]);
