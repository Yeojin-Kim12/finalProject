import { Heart } from '@phosphor-icons/react';
import { Label } from '../ui/label';
import { formatAmount, getPropertyLabel } from '@/lib/utils';
import { Link } from 'react-router-dom';
import useLike from '@/hooks/useLike';

export interface ItemListProps {
  size: 'l' | 'm'; // 사이즈
  id: number;
  title: string; // 제목
  imageUrl: string; // 이미지
  address: string; // 주소
  propertyType?: string; // 분양유형
  salesType?: string; // 분양형태
  totalNumber?: number; // 세대수
  keywords?: string[]; // 키워드
  price?: number; // 가격
  discountPrice?: number; // 할인가격
  like?: boolean; // 찜
  rank?: number; // 순위 -> 홈 화면에서만 사용
  onLikeToggle?: () => void;
}

const ItemList = ({
  size,
  id,
  title,
  imageUrl,
  address,
  propertyType = '',
  salesType = '',
  totalNumber,
  keywords,
  price = 0,
  discountPrice = 0,
  like,
  rank,
  onLikeToggle,
}: ItemListProps) => {
  const { liked, toggleLike } = useLike(like || false, id);
  const discountRate = Math.round(((price - discountPrice) / price) * 100); // 할인율 계산

  const handleLikeToggle = () => {
    if (onLikeToggle) {
      toggleLike();
      onLikeToggle();
    }
  };

  const listSizeClass = {
    l: 'w-[1200px] min-w-[1200px] h-[193px] px-7 py-6',
    m: 'w-full h-[148px] px-7 py-6',
  };
  const labelSize = size === 'm' ? 's' : 'm';

  return (
    <div className={`${listSizeClass[size]} flex bg-white border-b border-assistive-divider`}>
      <Link to={`/property/${id}`} className={`relative ${size === 'm' ? 'mr-6' : 'mr-7'} cursor-pointer`}>
        <img
          src={imageUrl}
          alt={title}
          className={`h-full ${size === 'm' ? 'min-w-[192px]' : 'min-w-[272px]'} rounded-5 object-cover`}
        />
        <div className={`${size === 'm' ? 'hidden' : 'block'} absolute inset-0 gradient-overlay rounded-5`} />
        {rank && (
          <div
            className={`absolute top-0 left-0 flex items-center justify-center ${size === 'm' ? 'w-[48px] h-8' : 'w-[66px] h-9'} px-2 bg-effect-elevated rounded-tl-5 rounded-br-5`}>
            <span className={`${size === 'm' ? 'text-label-base' : 'text-label-lg'} text-white font-bold`}>
              {rank}위
            </span>
          </div>
        )}
      </Link>

      <div className={`flex items-center w-full ${size === 'm' ? 'gap-5' : 'gap-10'}`}>
        <div className={`flex items-center w-full ${size === 'm' ? 'gap-5' : 'gap-10'}`}>
          <div className={`flex flex-col w-full ${size === 'm' ? 'min-w-[222px]' : 'w-[364px]'}`}>
            <Link
              to={`/property/${id}`}
              className={`w-full ${size === 'm' ? 'text-title-xl' : 'text-title-2xl'} text-static-default font-bold overflow-hidden text-ellipsis whitespace-nowrap mb-3 cursor-pointer`}>
              {title}
            </Link>
            <p
              className={`${size === 'm' ? 'text-detail-base' : 'text-detail-lg'} text-assistive-detail overflow-hidden text-ellipsis whitespace-nowrap mb-5`}>
              {address}
            </p>
            <div
              className={`flex items-center gap-2 ${size === 'm' ? 'text-detail-base' : 'text-detail-lg'} text-assistive-detail`}>
              <p>{getPropertyLabel(propertyType)}</p>
              <div className="w-[1px] h-[10px] bg-assistive-detail" />
              <p>{getPropertyLabel(salesType)}</p>
              <div className="w-[1px] h-[10px] bg-assistive-detail" />
              <p>총 {totalNumber}세대</p>
            </div>
          </div>
          <div className={`flex flex-col w-full gap-4 items-center ${size === 'm' ? '' : 'w-[364px]'}`}>
            <div className="flex gap-2">
              {keywords?.map((kw, index) => (
                <Label key={index} size={labelSize} variant="accent" keyword={getPropertyLabel(kw)}>
                  {getPropertyLabel(kw)}
                </Label>
              ))}
            </div>

            <span
              className={`line-through text-assistive-detail ${size === 'm' ? 'text-detail-lg' : 'text-detail-xl'}`}>
              {formatAmount(price)}
            </span>
            <div className="h-[30px]">
              <span
                className={`text-accent-strong ${size === 'm' ? 'text-title-lg' : 'text-title-xl'} font-bold mr-2`}>
                {discountRate}%
              </span>
              <span
                className={`text-static-default ${size === 'm' ? 'text-title-lg' : 'text-title-xl'} font-bold`}>
                {formatAmount(discountPrice)}
              </span>
            </div>
          </div>
        </div>
        <div
          onClick={(e) => {
            e.preventDefault();
            handleLikeToggle();
          }}>
          {liked ? (
            <span className="text-accent-strong cursor-pointer">
              <Heart size={32} weight="fill" />
            </span>
          ) : (
            <span className="text-assistive-strong cursor-pointer">
              <Heart size={32} weight="thin" />
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemList;
