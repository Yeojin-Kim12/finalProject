import axios from 'axios';
import { BASE_URL } from '@/lib/constants';
import { getAuthHeaders } from '@/utils/auth';
import { formatDashDate } from '@/lib/utils';

// const getStoredCookie = () => {
//   return document.cookie
//     .split('; ')
//     .find((row) => row.startsWith('accessToken='))
//     ?.split('=')[1];
// };

export const fetchSidebarData = async () => {
  const response = await axios.get(`${BASE_URL}/api/admin/properties/sidebar`, {
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
  });
  return response.data;
};
export const fetchSidebarDetailData = async (selectedProperty: number) => {
  const response = await axios.get(
    `${BASE_URL}/api/admin/properties/${selectedProperty}/consultations/sidebar`,
    {
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
    },
  );
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
  const [_key, { propertyId, search, consultant, preferredAt, page }] = queryKey;
  const formatDate = preferredAt ? formatDashDate(preferredAt) : undefined;

  const response = await axios.get(`${BASE_URL}/api/admin/properties/${propertyId}/consultations/pending`, {
    params: {
      ...(search !== '' && { search }),
      page: page - 1,
      size: 5,
      ...(consultant !== '' && { consultant }),
      preferredAt: formatDate,
    },
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
  });

  return response.data;
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
  const [_key, { propertyId, search, tier, consultant, preferredAt, page }] = queryKey;
  const response = await axios.get(`${BASE_URL}/api/admin/properties/${propertyId}/consultations/completed`, {
    params: {
      ...(search !== '' && { search }),
      ...(tier !== '' && { tier }),
      size: 5,
      ...(consultant !== '' && { consultant }),
      preferredAt,
      page: page - 1,
    },
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
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
        ...getAuthHeaders(),
      },
    },
  );
  return response.data;
};
