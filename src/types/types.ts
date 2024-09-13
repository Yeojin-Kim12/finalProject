import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().min(1, { message: '아이디를 입력해주세요' }).email({ message: '아이디를 입력해주세요' }),
  password: z.string().min(1, { message: '비밀번호를 입력해주세요' }),
  // .regex(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{6,}$/, '비밀번호를 입력해주세요'),
});

export type FormFields = z.infer<typeof loginSchema>;

export type Area = {
  squareMeter: number;
  price: number;
  discountPercent: number;
  discountPrice: number;
};

export type FileData = {
  name: string;
  url: string;
  type: string;
};
export type KeywordData = {
  searchEnabled: boolean;
  name: string;
  type: 'BENEFIT' | 'INFRA';
  input: { input1: string; input2: string; input3?: string }[] | string;
  id?: string;
};
export type FormValues = {
  propertyHouseholdArea: string;
  areas: Area[];
  files: FileData[];
  keywords: KeywordData[];
  dateRange: {};
  discountSale: boolean;
  discountSystem: boolean;
  propertyAreaAddr: string;
  addrDo: string;
  addrGu: string;
  addrDong: string;
  buildingName: string;
  propertyModelhouseAddr: string;
  propertyType: string;
  salesType: string;
  propertySupplyInformation: string; // 보내지 않음
  marketting: string; // 보내지 않음
};

export type SalesInformation = {
  buildingName: string; // 매물명
  imageUrl: string; // 이미지 url
  salesType: string; //할인 분양 (DISCOUNT_SALE)
  propertyType: string;
  areas: {
    squareMeter: number; // 면적
    price: number; // 가격
    discountPrice: number; // 할인된 가격
    discountPercent: number; // 퍼센트
  }[];
  areaAddr: string; // 대지 위치
  totalNumber: number; // 세대수
  modelhouseAddr: string; //모델하우스
  startDate: string; // 모집 날짜
  endDate: string; // 모집 날짜
  companyName: string; // 시행사
  constructor: string; // 시공사
  contactChannel: string; // 채널 링크
  homepage: string; // 홈페이지 링크
  phoneNumber: string; // 문의 번호
  likes: boolean; // 좋아요
  files: {
    name: string;
    url: string;
    type: string; // property_image(이미지), supply_information(공급안내표), marketing(마케팅)
  }[];
  infra: {
    name: string; // ex) SUBWAY
    type: string; // infra 고정
    input: {
      input1: string; // ex) 2호선 강남역
      input2: string; // ex) 차량
      input3: string; // ex) 15m
    }[];
    searchEnabled: boolean; // 검색 가능 여부 -> 1순위, 2순위, 3순위
  }[];
  benefit: {
    name: string; // ex) CASH2_PAYMENT
    type: string; // benefit 고정
    input:
      | number
      | {
          input1: string; // ex) 무상제공
          input2: string; // ex) 냉장고
        }[];
    searchEnabled: boolean;
  }[];
};

export interface CustomerData {
  id?: number;
  name: string;
  phoneNumber: string;
  status: string;
  consultant: string;
  consultingMessage: string;
  preferredAt?: string;
  completedAt?: string;
  createdAt?: string;
  addConsultation?: boolean;
  tier: string;
  medium: string;
  contents?: string;
}
export interface ConsultingData {
  id?: number;
  name: string;
  phoneNumber: string;
  status: string;
  consultant?: string;
  consultingMessage: string;
  preferredAt?: string;
  createdAt?: string;
  addConsultation?: boolean;
  tier: string;
  medium: string;
}

export interface ConsultPendingSummary {
  preferredAt: string;
  createdAt: string;
  consultant: string;
  name: string;
  phoneNumber: string;
  addConsultation: string; // Or boolean, depending on your actual data
}
