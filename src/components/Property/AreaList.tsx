import { Label } from '../ui/label';
import { formatAmount } from '@/lib/utils';
import useResponsive from '@/hooks/useResponsive';
import { Area } from '@/types/types';

interface AreaListProps {
  area: Area;
  lowestPriceArea?: Area | null;
  isPrevIndex: boolean;
  isLastIndex: boolean;
  index: number;
}

const AreaList = ({ area, lowestPriceArea, isPrevIndex, isLastIndex, index }: AreaListProps) => {
  const { isDesktop } = useResponsive();
  return (
    <>
      {area.discountPrice === lowestPriceArea?.discountPrice ? (
        <div
          key={index}
          className={`flex ${isDesktop ? 'px-8 py-9' : 'px-5 py-6'} w-full border border-assistive-divider rounded-6`}>
          <div className="w-full">
            <p className="text-title-xl tablet:text-title-base mobile:text-title-base-m font-bold mb-3">
              {area.squareMeter}평
            </p>
            <p className="text-detail-xl tablet:text-detail-base mobile:text-detail-base-m text-assistive-default">
              {Math.round(area.squareMeter * 3.3)}㎡
            </p>
          </div>
          <div className="flex flex-col items-end w-full">
            <Label size={isDesktop ? 'm' : 's'} variant="accent">
              최저가
            </Label>
            {(area.discountPrice !== area.price || area.discountPercent !== 0) && (
              <p className="mt-5 line-through text-detail-xl tablet:text-detail-base mobile:text-detail-base-m text-assistive-default">
                {formatAmount(area.price)}
              </p>
            )}
            <div className="flex">
              {area.discountPercent !== 0 && (
                <span className="text-accent-strong text-title-xl tablet:text-title-base mobile:text-title-base-m font-bold mr-3">
                  {area.discountPercent}%
                </span>
              )}

              <span className="text-static-default text-title-xl tablet:text-title-base mobile:text-title-base-m  font-bold">
                {formatAmount(area.discountPrice !== null ? area.discountPrice : area.price)}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div key={index} className="px-5 desktop:px-8">
          <div
            className={`flex items-center py-5 desktop:py-8 w-full ${isPrevIndex || isLastIndex ? '' : 'border-b border-assistive-divider'}`}>
            <div className="w-full">
              <span className="mobile:block mr-5 text-title-xl tablet:text-title-base mobile:text-title-base-m font-bold">
                {area.squareMeter}평
              </span>
              <span className="mobile:block text-detail-xl tablet:text-detail-base mobile:text-detail-base-m text-assistive-default">
                {Math.round(area.squareMeter * 3.3)}㎡
              </span>
            </div>
            <div
              className={`${isDesktop ? 'flex items-center justify-end' : 'flex flex-col items-end'} w-full`}>
              {(area.discountPrice !== area.price || area.discountPercent !== 0) && (
                <span className="line-through text-detail-xl tablet:text-detail-base mobile:text-detail-base-m text-assistive-default mr-5">
                  {formatAmount(area.price)}
                </span>
              )}
              <div className="flex">
                {area.discountPercent !== 0 && (
                  <span className="text-accent-strong text-title-xl tablet:text-title-base mobile:text-title-base-m font-bold mr-3">
                    {area.discountPercent}%
                  </span>
                )}
                <span className="text-static-default text-title-xl tablet:text-title-base mobile:text-title-base-m font-bold">
                  {formatAmount(area.discountPrice)}~
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AreaList;
