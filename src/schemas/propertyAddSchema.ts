import { z } from 'zod';

const today = new Date();
today.setHours(0, 0, 0, 0);

export const propertyAddSchema = z.object({
  name: z.string().min(1, '매물명을 입력해주세요').max(20, '최대 20자까지 입력 가능합니다'),
  constructorName: z.string().min(1, '시공사를 입력해주세요').max(20, '최대 20자까지 입력 가능합니다'),
  companyName: z.string().min(1, '시행사를 입력해주세요').max(20, '최대 20자까지 입력 가능합니다'),
  totalNumber: z.preprocess(
    (val) => {
      const parsed = parseFloat(val as string);
      return isNaN(parsed) ? 0 : parsed;
    },
    z.number().min(1, '세대수를 입력해주세요').max(10000, '세대수는 10000이하이어야 합니다'),
  ),
  areaAddr: z.string().min(1, '대지위치를 입력해주세요'),
  modelhouseAddr: z.string().min(1, '모델하우스 주소를 입력해주세요'),
  areas: z
    .array(
      z.object({
        squareMeter: z.preprocess((val) => parseFloat(val as string), z.number().min(0).optional()),
        price: z.preprocess(
          (val) => (val === '' ? 0 : parseFloat(val as string)),
          z.number().min(1, '가격은 0 이상이어야 합니다'),
        ),
        discountPercent: z.preprocess(
          (val) => (val === '' || val === null ? 0 : parseFloat(val as string)),
          z.number().min(0).max(100, '100% 이하이어야 합니다').nullable(),
        ),
        discountPrice: z.preprocess(
          (val) => (val === '' || val === null ? undefined : parseFloat(val as string)),
          z.number().min(0).optional().nullable(),
        ),
      }),
      // .refine(
      //   (area) => {
      //     // discountPrice가 빈 값이면 price 값 설정
      //     if (area.discountPrice === undefined || isNaN(area.discountPrice)) {
      //       area.discountPrice = area.price;
      //       return true;
      //     }
      //     // 가격 유효성 검사
      //     return area.discountPrice <= area.price;
      //   },
      //   {
      //     message: '할인가는 평형별 가격보다 높을 수 없습니다',
      //     path: ['discountPrice'],
      //   },
      // ),
    )
    .min(1, '세대면적을 입력해주세요'),
  files: z
    .array(
      z.object({
        name: z.string().optional(),
        url: z.string().optional(),
        type: z.string().optional(),
      }),
    )
    .superRefine((files, ctx) => {
      const hasPropertyImage = files.some((file) => file.type === 'PROPERTY_IMAGE');
      const hasSupplyInformation = files.some((file) => file.type === 'SUPPLY_INFORMATION');

      if (!hasPropertyImage) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: '이미지를 첨부해주세요',
          path: [0],
        });
      }
      if (!hasSupplyInformation) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: '파일을 첨부해주세요',
          path: [1],
        });
      }
    }),
  addrDo: z.string().optional(),
  addrGu: z.string().optional(),
  addrDong: z.string().optional(),
  buildingName: z.string().optional(),
  propertyType: z.string().optional(),
  salesType: z.string().optional(),
  dateRange: z.object({
    startDate: z
      .string()
      .min(1, '시작 날짜를 입력해주세요')
      .refine(
        (date) => {
          const parsedDate = Date.parse(date);
          return !isNaN(parsedDate) && parsedDate >= today.getTime();
        },
        {
          message: '시작 날짜는 오늘 이후여야 합니다',
        },
      ),
    endDate: z
      .string()
      .min(1, '종료 날짜를 입력해주세요')
      .refine(
        (date) => {
          const parsedDate = Date.parse(date);
          return !isNaN(parsedDate) && parsedDate >= today.getTime();
        },
        {
          message: '종료 날짜는 오늘 이후여야 합니다',
        },
      ),
  }),

  phoneNumber: z
    .string()
    .min(0, '분양 문의 번호를 입력해주세요')
    .regex(
      /^(\d{3}-\d{4}-\d{4}|\d{4}-\d{4})$/,
      '분양 문의 번호는 010-0000-0000 또는 0000-0000 형식이어야 합니다',
    ),
  homepage: z.string().optional(),
  contactChannel: z.string().optional(),
  keywords: z
    .array(
      z.object({
        searchEnabled: z.boolean(),
        name: z.string(),
        type: z.string(),
        input: z.union([
          z.string().nonempty('입력해주세요'),
          z.object({
            input1: z.union([z.string(), z.number()]),
            input2: z.union([z.string(), z.number()]),
            input3: z.union([z.string(), z.number()]).optional(),
          }),
          z
            .array(
              z.object({
                input1: z.union([z.string(), z.number()]),
                input2: z.union([z.string(), z.number()]),
                input3: z.union([z.string(), z.number()]).optional(),
              }),
            )
            .optional(),
        ]),
      }),
    )
    .min(3, { message: '최소 3개의 키워드를 입력해주세요' }),
});
