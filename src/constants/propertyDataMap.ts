// 데이터 타입 정의
type DataKey =
  // 혜택
  | 'DISCOUNT_SALE'
  | 'BALANCE_DEFERRAL'
  | 'CASH_PAYMENT'
  | 'GUARANTEED_PAYMENT'
  | 'SUPPORT_PAYMENT'
  | 'OPTION_PAYMENT'
  // 인프라
  | 'SUBWAY'
  | 'HOSPITAL'
  | 'PARK'
  | 'SHOPPING'
  | 'SCHOOL'
  | 'LIBRARY'
  | 'PUBLIC_FACILITIES'
  | 'GOVERNMENT'
  // 분양 형태
  | 'APARTMENT'
  | 'OFFICETEL'
  | 'VILLA'
  | 'URBAN_HOUSING'
  | 'LIVING_ACCOMMODATION'
  | 'DOWNTOWN'
  // 분양 유형
  | 'PRIVATE_SALE'
  | 'PUBLIC_SALE'
  | 'LEASE_SALE';

// 데이터 값 정의
type PropertyDataMap = {
  [key in DataKey]: string;
};

// 데이터 객체
const propertyDataMap: PropertyDataMap = {
  // 혜택
  DISCOUNT_SALE: '할인분양',
  BALANCE_DEFERRAL: '잔금유예',
  CASH_PAYMENT: '현금지급',
  GUARANTEED_PAYMENT: '계약금 안심보장',
  SUPPORT_PAYMENT: '중도금 지원',
  OPTION_PAYMENT: '옵션제공',
  // 인프라
  SUBWAY: '지하철역',
  SCHOOL: '학교',
  PARK: '숲 · 공원',
  SHOPPING: '쇼핑복합시설',
  HOSPITAL: '병원',
  LIBRARY: '도서관',
  PUBLIC_FACILITIES: '공공시설',
  GOVERNMENT: '관공서',
  // 분양 형태
  APARTMENT: '아파트',
  OFFICETEL: '오피스텔',
  VILLA: '빌라',
  URBAN_HOUSING: '도시형 생활주택',
  LIVING_ACCOMMODATION: '생활 숙박시설',
  DOWNTOWN: '상가·업무',
  // 분양 유형
  PRIVATE_SALE: '민간분양',
  PUBLIC_SALE: '공공분양',
  LEASE_SALE: '임대분양',
};
const benefitKeywords = [
  { name: '할인분양', value: 'DISCOUNT_SALE' },
  { name: '잔금유예', value: 'BALANCE_DEFERRAL' },
  { name: '현금지급', value: 'CASH_PAYMENT' },
  { name: '계약금 안심보장', value: 'GUARANTEED_PAYMENT' },
  { name: '중도금 지원', value: 'SUPPORT_PAYMENT' },
  { name: '옵션제공', value: 'OPTION_PAYMENT', placeholder: 'ex) 비스포크, 현관 중문 20자 이내' },
];

const infraKeywords = [
  { name: '지하철역', value: 'SUBWAY', placeholder: 'ex) 5호선 우장산역 등' },
  { name: '학교', value: 'SCHOOL', placeholder: 'ex) 서울 강서초등학교 등' },
  { name: '숲 · 공원', value: 'PARK', placeholder: 'ex) 신트리 공원 등' },
  { name: '쇼핑복합시설', value: 'SHOPPING', placeholder: 'ex) 더현대서울 등' },
  { name: '병원', value: 'HOSPITAL', placeholder: 'ex) 부평세림 병원 등' },
  { name: '도서관', value: 'LIBRARY', placeholder: 'ex) 서울 남산도서관 등' },
  { name: '공공시설', value: 'PUBLIC_FACILITIES', placeholder: 'ex) 세종문화회관 등' },
  { name: '관공서', value: 'GOVERNMENT', placeholder: 'ex) 부천시청 등' },
];

export { propertyDataMap, benefitKeywords, infraKeywords };
