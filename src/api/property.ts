import { BASE_URL } from '@/lib/constants';
import axios from 'axios';
import { getAuthHeaders } from '@/utils/auth';

export const fetchPropertyTable = async ({
  queryKey,
}: {
  queryKey: [string, { page: number; size: number }];
}) => {
  const [_key, { page, size }] = queryKey;
  const { data } = await axios.get(`${BASE_URL}/api/admin/my-properties/table?page=${page}&size=${size}`, {
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
  });
  return data.contents || [];
};
