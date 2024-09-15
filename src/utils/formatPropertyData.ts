import { removePhoneNumberHyphens } from '@/lib/utils';

export const formatPropertyData = (data: any) => {
  return {
    name: data.name, // 매물명
    constructor: data.constructorName, // 시공사
    companyName: data.companyName, // 시행사
    totalNumber: data.totalNumber, // 세대 수
    startDate: data.dateRange.startDate, // 시작날짜
    endDate: data.dateRange.endDate, // 종료날짜
    areas: data.areas.map((area: any) => ({
      squareMeter: area.squareMeter, // 면적
      price: area.price, // 가격
      discountPrice: area.discountPrice, // 할인된 가격
      discountPercent: area.discountPercent, // 할인 퍼센트
    })),
    files: data.files.map((file: any) => ({
      name: file.name,
      url: file.url,
      type: file.type,
    })),
    propertyType: data.propertyType, // 분양 유형
    salesType: data.salesType, // 분양 형태
    areaAddr: data.areaAddr, // 대지 주소
    addrDo: data.addrDo, // 도/시
    addrGu: data.addrGu, // 시/군/구
    addrDong: data.addrDong, // 동
    buildingName: data.buildingName, // 건물 이름
    modelhouseAddr: data.modelhouseAddr, // 모델하우스 주소
    phoneNumber: removePhoneNumberHyphens(data.phoneNumber), // 분양 문의 번호
    homepage: data.homepage, // 홈페이지 링크
    contactChannel: data.contactChannel, // 채널 링크
    keywords: data.keywords.map((keyword: any) => ({
      searchEnabled: keyword.searchEnabled,
      name: keyword.name,
      type: keyword.type,
      input: keyword.input,
    })),
  };
};
