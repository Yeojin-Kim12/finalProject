import { BASE_URL } from '@/lib/constants';
import axios from 'axios';
// import { getAuthHeaders } from './login';

export const fetchPropertyTable = async ({
  queryKey,
}: {
  queryKey: [string, { page: number; size: number }];
}) => {
  const [_key, { page, size }] = queryKey;
  const { data } = await axios.get(`${BASE_URL}/api/admin/my-properties/table?page=${page}&size=${size}`, {
    // headers: {
    //   'Content-Type': 'application/json',
    //   ...getAuthHeaders(),
    // },
    withCredentials: true,
  });
  return data.contents || [];
};

// export const fetchPropertyTable = async (page: number) => {
//   const res = await axios.get(`${BASE_URL}/api/admin/my-properties/table`, {
//     params: {
//       page: page,
//       size: 4,
//     },
//     withCredentials: true,
//   });
//   console.log(res);
//   return res.data;
// };
