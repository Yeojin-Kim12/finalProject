import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchConsultPendingSummaries = async () => {
  const { data } = await axios.get(
    '/api/admin/properties/{propertyId}/consultations/pending?search={}&consultant={}&preferred_at={}&page={}&size=5',
  );
  return data;
};

export const useConsultPendingSummaries = () => {
  return useQuery({
    queryKey: ['consultPendingSummaries'],
    queryFn: fetchConsultPendingSummaries,
  });
};
