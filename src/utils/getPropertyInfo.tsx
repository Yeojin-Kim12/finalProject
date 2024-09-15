import { formatPhoneNumber, getPropertyLabel } from '@/lib/utils';

export const getPropertyInfo = (data: any) => {
  return [
    [
      { label: '사업명', value: data?.buildingName },
      { label: '분양유형', value: getPropertyLabel(data?.propertyType) },
      { label: '분양형태', value: getPropertyLabel(data?.salesType) },
      { label: '대지위치', value: data?.areaAddr },
    ],
    [
      { label: '세대수', value: `총 ${data?.totalNumber}세대` },
      {
        label: '세대면적',
        value: data?.areas?.map((area: any) => `${Math.round(area.squareMeter * 3.3)}㎡`).join(', '),
      },
    ],
    [
      { label: '시공사', value: data?.constructor },
      { label: '시행사', value: data?.companyName },
      { label: '모델하우스', value: data?.modelhouseAddr },
    ],
    [
      {
        label: '모집기간',
        value: (
          <>
            <span>{data?.startDate} ~ </span>
            <span className="block tablet:inline">{data?.endDate}</span>
          </>
        ),
      },
      {
        label: '홈페이지',
        value: (
          <a href={data?.homepage} target="_blank" rel="noopener noreferrer" className="underline">
            {data?.homepage}
          </a>
        ),
      },
      { label: '분양문의', value: formatPhoneNumber(data?.phoneNumber) },
    ],
  ];
};
