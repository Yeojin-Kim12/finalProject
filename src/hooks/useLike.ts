import { useState } from 'react';
import axios from 'axios';

const useLike = (initialLikeStatus: boolean, propertyId: number) => {
  const [liked, setLiked] = useState(initialLikeStatus);

  const toggleLike = async () => {
    try {
      await axios.post(`/api/member/properties/${propertyId}/like`);
      setLiked(!liked);
    } catch (err) {
      console.error('좋아요 API 에러: ', err);
    }
  };

  return {
    liked,
    toggleLike,
  };
};

export default useLike;
