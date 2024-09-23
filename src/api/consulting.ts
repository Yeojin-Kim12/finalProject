import axios from 'axios';
// import { getAuthHeaders } from './login';
import { BASE_URL } from '@/lib/constants';

const getStoredCookie = () => {
  return document.cookie
    .split('; ')
    .find((row) => row.startsWith('accessToken='))
    ?.split('=')[1];
};

export const fetchSidebarData = async ({ queryKey }: { queryKey: [string, { propertyId: number }] }) => {
  const [_key, { propertyId }] = queryKey;
  const response = await axios.get(`${BASE_URL}/api/admin/properties/${propertyId}/consultations/sidebar`, {
    // headers: {
    //   'Content-Type': 'application/json',
    //   ...getAuthHeaders(),
    // },
    headers: {
      'Content-Type': 'application/json',
      Cookie: `accessToken=${getStoredCookie()}`,
    },
    withCredentials: true,
  });
  console.log('Fetched sidebar data:', response); // Debug log
  return response.data;
};

export const fetchPendingConsultations = async ({
  queryKey,
}: {
  queryKey: [
    string,
    { propertyId: number; search: string; consultant: string; preferredAt: Date | undefined; page: number },
  ];
}) => {
  const [_key, { propertyId, search, page }] = queryKey;
  const response = await axios.get(`${BASE_URL}/api/admin/properties/${propertyId}/consultations/pending`, {
    params: {
      search,
      page,
      size: 5,
    },
    withCredentials: true,
  });
  const { contents } = response.data;
  const consultPendingSummaries = contents[0]?.consultPendingSummaries || [];

  return {
    ...response.data,
    consultPendingSummaries,
  };
};

export const fetchCompletedConsultations = async ({
  queryKey,
}: {
  queryKey: [
    string,
    {
      propertyId: number;
      search: string;
      tier: string;
      consultant: string;
      preferredAt: Date | undefined;
      page: number;
    },
  ];
}) => {
  const [_key, { propertyId, search, page }] = queryKey;
  const response = await axios.get(`${BASE_URL}/api/admin/properties/${propertyId}/consultations/completed`, {
    params: {
      search,
      page,
      size: 5,
    },
    // headers: {
    //   'Content-Type': 'application/json',
    //   ...getAuthHeaders(),
    // },
    withCredentials: true,
  });
  const { contents } = response.data;
  const consultCompletedSummaries = contents[0]?.consultCompletedSummaries || [];

  return {
    ...response.data,
    consultCompletedSummaries,
  };
};

export const addNewCustomer = async (propertyId: number, customerData: any) => {
  const response = await axios.post(
    `${BASE_URL}/api/admin/properties/${propertyId}/consultations`,
    customerData,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    },
  );
  return response.data;
};
