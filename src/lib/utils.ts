import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { propertyDataMap } from '../constants/propertyDataMap';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
// 날짜 YYYY. MM. DD. 변환
export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}. ${month}. ${day}.`;
}
// 날짜 YYYY. MM 변환
export function getCurrentMonth() {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  return `${year}. ${month}`;
}
// 주차 구하기
export function getWeekOfMonth(date: Date): number {
  const currentDate = date.getDate();
  const firstDay = new Date(date.setDate(1)).getDay();

  return Math.ceil((currentDate + firstDay) / 7);
}

// 금액 단위 변환
export function formatAmount(amount: number | null | undefined): string {
  if (amount === null || amount === undefined) {
    return 'N/A';
  }

  if (amount < 10000) {
    return `${amount.toLocaleString()}만`;
  }

  const billion = Math.floor(amount / 10000);
  const thousand = amount % 10000;

  if (thousand > 0) {
    return `${billion}억 ${thousand.toLocaleString()}만`;
  } else {
    return `${billion}억`;
  }
}

// 매물 데이터 변환
export function getPropertyLabel(key: string): string {
  return propertyDataMap[key as keyof typeof propertyDataMap] || 'Unknown';
}

// 인프라 input 변환
type InfraInput = { input1: string; input2: string; input3: string };

export interface InfraItemProps {
  name: string;
  input: InfraInput[];
}
export function formatInfraText(item: InfraItemProps): string {
  if (Array.isArray(item.input)) {
    return item.input
      .map((inputItem) => {
        const timeInMinutes = `${parseInt(inputItem.input3.replace('m', ''), 10)}분`;
        return `${inputItem.input1} ${inputItem.input2} ${timeInMinutes}`;
      })
      .join(', ');
  } else {
    return '';
  }
}

// 혜택 input 변환
type BenefitInputItem = { input1: string; input2: string };
export interface BenefitItemProps {
  name: string;
  input: number | BenefitInputItem[];
}
export function formatBenefitText(item: BenefitItemProps): string {
  switch (item.name) {
    case 'DISCOUNT_SALE':
      if (Array.isArray(item.input)) {
        const i = item.input[0];
        return `분양가 대비 ${i.input1}~${i.input2}% 할인`;
      }
      return `${item.input}`;
    case 'BALANCE_DEFERRAL':
      if (Array.isArray(item.input)) {
        const i = item.input[0];
        return `잔금 ${i.input1}% ${i.input2}개월동안 유예`;
      }
      return `${item.input}`;
    case 'CASH_PAYMENT':
      return `현금 ${item.input}만원 지급`;
    case 'GUARANTEED_PAYMENT':
      return `계약금 ${item.input}% 안심보장`;
    case 'SUPPORT_PAYMENT':
      if (Array.isArray(item.input)) {
        const i = item.input[0];
        return `중도금 ${i.input2}% ${i.input1} 지원`;
      }
      return `${item.input}`;

    case 'OPTION_PAYMENT':
      if (Array.isArray(item.input)) {
        return item.input.map((i) => `${i.input1} ${i.input2}`).join(', ');
      }
      return `${item.input}`;

    default:
      return `${item.name.replace('_', ' ')}: ${item.input}`;
  }
}

// 전화번호 하이픈 입력
export function formatPhoneNumber(phoneNumber: string | undefined): string | undefined {
  if (phoneNumber === undefined) {
    return '';
  }
  if (phoneNumber.length === 11) {
    return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  } else if (phoneNumber.length === 8) {
    return phoneNumber.replace(/(\d{4})(\d{4})/, '$1-$2');
  } else {
    return phoneNumber;
  }
}

// 전화번호 하이픈 제거
export function removePhoneNumberHyphens(phoneNumber: string | undefined): string {
  if (!phoneNumber) {
    return '';
  }
  return phoneNumber.replace(/\D/g, '');
}

// preview URL 변환 함수
export function getUsableImageUrl(url: string): string {
  const regex = /(PROPERTY_IMAGE\/[^]+)/;
  const imagePath = url.match(regex);
  return imagePath ? `https://delivery183.org/${imagePath[0]}` : '';
}
export function getUsableFileUrl(url: string, type: string, name: string): string {
  const regex = new RegExp(`(${type}/[^%]+)`);
  const filePath = url.match(regex);
  return filePath ? `https://delivery183.org/${filePath[0]}${name}` : '';
}
