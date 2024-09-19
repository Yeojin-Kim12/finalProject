import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Heart } from '@phosphor-icons/react';
import { Area } from '@/types/types';
import { formatAmount, getPropertyLabel } from '@/lib/utils';

interface PropertyTopContentProps {
  isMobile: boolean;
  isDesktop: boolean;
  data: any;
  toggleLike: () => void;
  liked: boolean;
  lowestPriceArea: Area | null;
  setIsPhoneDialog: (value: boolean) => void;
  isPhoneDialog: boolean;
  setIsCounselRegister: (value: boolean) => void;
  isCounselRegister: boolean;
}

const PropertyTopContent = ({
  isMobile,
  isDesktop,
  data,
  toggleLike,
  liked,
  lowestPriceArea,
  setIsPhoneDialog,
  isPhoneDialog,
  setIsCounselRegister,
  isCounselRegister,
}: PropertyTopContentProps) => {
  return (
    <div
      className={`flex ${isMobile ? 'flex-col mb-9' : 'items-center mb-11'} w-full h-[576px] tablet:h-[384px] mobile:h-[723px] gap-6`}>
      {/* 이미지 섹션 */}
      <div className="w-[576px] tablet:w-[352px] mobile:min-w-[328px]">
        <img
          className="w-[576px] h-[576px] tablet:w-[352px] tablet:h-[352px] mobile:w-[328px] mobile:h-[328px] object-cover rounded-7"
          src={data?.propertyImage.url}
          alt={data?.propertyImage.name}
        />
      </div>

      {/* 정보 섹션 */}
      <div className="flex flex-col gap-7 tablet:gap-2 mobile:gap-4 grow justify-center">
        <div className="flex gap-4 tablet:mb-2 mobile:gap-3">
          {data?.benefit?.slice(0, 3).map((benefit: any, index: number) => (
            <Label
              key={index}
              keyword={getPropertyLabel(benefit.name)}
              size={isDesktop ? 'l' : 'm'}
              className="mobile:text-label-base-m">
              {getPropertyLabel(benefit.name)}
            </Label>
          ))}
        </div>

        <div className="flex flex-col gap-0 desktop:gap-4">
          <div className="flex items-center gap-2 text-detail-xl tablet:text-detail-base mobile:text-detail-base-m text-assistive-detail">
            <p>{getPropertyLabel(data?.propertyType || '')}</p>
            <div className="w-[1px] h-[10px] bg-assistive-detail" />
            <p>{getPropertyLabel(data?.salesType || '')}</p>
            <div className="w-[1px] h-[10px] bg-assistive-detail" />
            <p>총 {data?.totalNumber}세대</p>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-heading-base tablet:text-title-2xl mobile:text-title-2xl-m font-bold">
              {data?.name}
            </div>
            <div
              className="p-3 border border-assistive-default rounded-10 cursor-pointer"
              onClick={toggleLike}>
              {liked ? (
                <Heart size={isDesktop ? 32 : 24} weight="fill" className="text-accent-strong" />
              ) : (
                <Heart size={isDesktop ? 32 : 24} weight="thin" className="text-assistive-strong" />
              )}
            </div>
          </div>
          <div className="text-assistive-detail text-detail-xl tablet:text-detail-base mobile:text-detail-base-m">
            {data?.areaAddr}
          </div>
        </div>

        {/* 최저가 섹션 */}
        <div>
          {lowestPriceArea && (
            <div>
              {(lowestPriceArea.discountPrice !== lowestPriceArea.price ||
                lowestPriceArea.discountPercent !== 0) && (
                <span className="line-through text-detail-xl tablet:text-detail-base mobile:text-detail-base-m text-assistive-default">
                  {formatAmount(lowestPriceArea.price)}
                </span>
              )}
              <div className="flex mt-1">
                {(lowestPriceArea.discountPrice !== lowestPriceArea.price ||
                  lowestPriceArea.discountPercent !== 0) && (
                  <span className="text-accent-strong text-title-2xl tablet:text-title-xl mobile:text-title-xl-m font-bold mr-3">
                    {lowestPriceArea.discountPercent}%
                  </span>
                )}
                <span className="text-static-default text-title-2xl tablet:text-title-xl mobile:text-title-xl-m font-bold">
                  {formatAmount(
                    lowestPriceArea.discountPrice !== null
                      ? lowestPriceArea.discountPrice
                      : lowestPriceArea.price,
                  )}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* 편의시설 섹션 */}
        <div>
          <span className="text-assistive-strong text-detail-xl tablet:text-detail-base mobile:text-detail-base-m">
            편의시설
          </span>
          <div className="flex gap-4 mt-4 tablet:my-2">
            {data?.infra?.slice(0, 3).map((infra: any, index: number) => (
              <Label
                key={index}
                keyword={getPropertyLabel(infra.name)}
                size={isDesktop ? 'l' : 'm'}
                className="mobile:text-label-base-m">
                {getPropertyLabel(infra.name)}
              </Label>
            ))}
          </div>
        </div>

        {/* 전화 문의 및 상담 버튼 */}
        <div>
          <div className="flex gap-3">
            <Button
              variant="assistive"
              size={isDesktop ? 'xl' : 'sm'}
              className="w-full"
              onClick={() => setIsPhoneDialog(!isPhoneDialog)}>
              전화문의
            </Button>
            <Button
              variant="assistive"
              size={isDesktop ? 'xl' : 'sm'}
              className="w-full"
              onClick={() => data?.contactChannel && window.open(data?.contactChannel)}>
              카카오톡 채널문의
            </Button>
          </div>
          <Button
            className="w-full mt-3"
            size={isDesktop ? 'xl' : 'sm'}
            onClick={() => setIsCounselRegister(!isCounselRegister)}>
            상담신청
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PropertyTopContent;
