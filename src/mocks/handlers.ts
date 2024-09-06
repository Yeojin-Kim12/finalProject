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
];
export default handlers;
