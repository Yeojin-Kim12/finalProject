import { http, HttpResponse } from 'msw';

const handlers = [
  http.get('/api/properties/:id', (req) => {
    const { id } = req.params;
    id;

    return HttpResponse.json({
      buildingName: '잠실 푸르지오 ',
      imageUrl: 'https://delivery183.org/MARKETING/4ca28725-c17e-43c9-84a6-314e328b3b0b%3Abyebyebyebyebye',
      salesType: 'LEASE_SALE',
      areas: [
        {
          squareMeter: 18,
          price: 42500,
          discountPrice: 34000,
          discountPercent: 20,
        },
        {
          squareMeter: 24,
          price: 37500,
          discountPrice: 29800,
          discountPercent: 20,
        },
        {
          squareMeter: 30,
          price: 52500,
          discountPrice: 39375,
          discountPercent: 25,
        },
        {
          squareMeter: 40,
          price: 64500,
          discountPrice: 45150,
          discountPercent: 30,
        },
      ],
      areaAddr: '인천시 계양구 용종로 123',
      totalNumber: 507,
      modelhouseAddr: '부산시 기장구 장안읍 어쩌고 저쩌고',
      startDate: '2024-08-08',
      endDate: '2024-08-31',
      companyName: '(주)선우',
      constructor: '시행사1',
      contactChannel: 'https://pf.kakao.com/_abcdefg',
      homepage: 'https://www.example.com',
      phoneNumber: '01000001234',
      likes: true,
      propertyType: 'OFFICETEL',
      files: [
        {
          name: 'property_image.jpg',
          url: 'https://via.placeholder.com/300',
          type: 'property_image',
        },
        {
          name: 'supply_information.pdf',
          url: '/pdf/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
          type: 'supply_information',
        },
        {
          name: 'marketing.pdf',
          url: '/pdfFile/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf',
          type: 'marketing',
        },
      ],
      infra: [
        {
          name: 'SUBWAY',
          type: 'infra',
          input: [
            {
              input1: '2호선 강남역',
              input2: '차량',
              input3: '15m',
            },
            {
              input1: '잠실역',
              input2: '도보',
              input3: '20m',
            },
          ],
          searchEnabled: false,
        },
        {
          name: 'HOSPITAL',
          type: 'infra',
          input: [
            {
              input1: '강남 성심 병원',
              input2: '차량',
              input3: '20m',
            },
          ],
          searchEnabled: true,
        },
      ],
      benefit: [
        {
          name: 'CASH_PAYMENT',
          type: 'benefit',
          input: 100,
          searchEnabled: true,
        },
        {
          name: 'OPTION_PAYMENT',
          type: 'benefit',
          input: [
            {
              input1: '무상제공',
              input2: '냉장고',
            },
            {
              input1: '사은품',
              input2: '냄비',
            },
          ],
          searchEnabled: true,
        },
        {
          name: 'CASH_PAYMENT',
          type: 'benefit',
          input: 100,
          searchEnabled: false,
        },
      ],
    });
  }),
  http.get('/api/common/home?page={page}', () => {
    return HttpResponse.json({
      HomeImagesUrl: [
        'https://delivery183.org/MARKETING/4ca28725-c17e-43c9-84a6-314e328b3b0b%3Abyebyebyebyebye',
        'https://delivery183.org/MARKETING/4ca28725-c17e-43c9-84a6-314e328b3b0b%3Abyebyebyebyebye',
        'https://delivery183.org/MARKETING/4ca28725-c17e-43c9-84a6-314e328b3b0b%3Abyebyebyebyebye',
      ],
      content: {
        properties: [
          {
            id: 13,
            image_url: 'https://delivery183.org/%EC%A0%84%EA%B3%B5%20%EC%B1%85.png',
            property_name: '계양 어떤서원',
            area_addr: '인천시 계양구 용종로',
            property_type: 'APARTMENT',
            sales_type: 'PRIVATE_SALE',
            total_number: 100,
            keywords: ['DISCOUNT_SALE', 'SUBWAY', 'SHOPPING'],
            price: 29800,
            discount_price: 29800,
            like: true,
          },
          {
            id: 14,
            image_url: 'https://delivery183.org/%EC%A0%84%EA%B3%B5%20%EC%B1%85.png',
            property_name: '송도 해오름마을',
            area_addr: '인천시 연수구 해돋이로',
            property_type: 'APARTMENT',
            sales_type: 'PUBLIC_SALE',
            total_number: 200,
            keywords: ['DISCOUNT_SALE', 'SUBWAY', 'LIBRARY'],
            price: 38500,
            discount_price: 37000,
            like: false,
          },
          {
            id: 15,
            image_url: 'https://delivery183.org/%EC%A0%84%EA%B3%B5%20%EC%B1%85.png',
            property_name: '부평 e편한세상',
            area_addr: '인천시 부평구 부평대로',
            property_type: 'OFFICETEL',
            sales_type: 'LEASE_SALE',
            total_number: 150,
            keywords: ['BALANCE_DEFERRAL', 'HOSPITAL', 'PUBLIC_FACILITIES'],
            price: 32000,
            discount_price: 31000,
            like: true,
          },
          {
            id: 16,
            image_url: 'https://delivery183.org/%EC%A0%84%EA%B3%B5%20%EC%B1%85.png',
            property_name: '청라 더샵 레이크파크',
            area_addr: '인천시 서구 청라대로',
            property_type: 'OFFICETEL',
            sales_type: 'PRIVATE_SALE',
            total_number: 250,
            keywords: ['PARK', 'BALANCE_DEFERRAL', 'GOVERNMENT'],
            price: 45000,
            discount_price: 43000,
            like: true,
          },
          {
            id: 17,
            image_url: 'https://delivery183.org/dir1/0fdb98d7-9e0b-4a6d-b258-91282d038614:마이크 세팅.png',
            property_name: '인천시티빌',
            area_addr: '인천시 미추홀구 경원대로',
            property_type: 'VILLA',
            sales_type: 'PRIVATE_SALE',
            total_number: 120,
            keywords: ['SUPPORT_PAYMENT', 'SCHOOL', 'OPTION_PAYMENT'],
            price: 22000,
            discount_price: 21000,
            like: false,
          },
        ],
      },
      totalPages: 6, // 전체 페이지수
      pageSize: 5, // 한 페이지에 표시할 개수
      currentPage: 0, // 현재 페이지 번호
    });
  }),
];
export default handlers;
