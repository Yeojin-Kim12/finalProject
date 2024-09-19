import { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '@/lib/constants';

const useLike = (initialLikeStatus: boolean, propertyId: number) => {
  const [liked, setLiked] = useState(initialLikeStatus);

  const toggleLike = async () => {
    try {
      await axios.post(
        `${BASE_URL}/api/member/properties/${propertyId}/like`,
        {},
        {
          withCredentials: true,
        },
      );
      setLiked(!liked);
    } catch (err) {
      console.error('좋아요 API 에러: ', err);
    }
  };

  return {
    liked,
    toggleLike,
    setLiked,
  };
};

export default useLike;
