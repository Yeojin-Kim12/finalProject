import { ChangeEvent } from 'react';
import { CaretLeft, X, Info } from '@phosphor-icons/react';
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle } from '../ui/drawer';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Dialog, DialogClose, DialogContent, DialogTitle } from '../ui/dialog';
import { Calendar } from '../ui/calendar';
import SingleDatePicker from '../common/SingleDatePicker';

interface CounselForm {
  name: string;
  phoneNumber: string;
  preferredAt: string | undefined;
  counselingMessage: string;
}

interface CounselProps {
  isOpen: boolean;
  handleClose: (openState: boolean) => void;
  counselForm: CounselForm;
  setCounselForm: React.Dispatch<React.SetStateAction<CounselForm>>;
  handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isCounselFormValidation: boolean;
  handleCounselRegister: () => void;
  setIsInfoContent: (openState: boolean) => void;
  isInfoContent: boolean;
  isPhoneValidation: (phoneNumber: string) => boolean;
}

interface CounselDrawerProps extends CounselProps {
  Funnel: ({ children }: any) => JSX.Element;
  Step: ({ name, children }: { name: string; children: any }) => JSX.Element;
  setStep: (step: string) => void;
  steps: string[];
}

export const CounselDrawer = ({
  isOpen,
  handleClose,
  Funnel,
  Step,
  steps,
  setStep,
  counselForm,
  setCounselForm,
  handleInputChange,
  isCounselFormValidation,
  handleCounselRegister,
  setIsInfoContent,
  isInfoContent,
  isPhoneValidation,
}: CounselDrawerProps) => {
  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      const offsetDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
      const formattedDate = offsetDate.toISOString().split('T')[0];
      console.log(formattedDate);

      setCounselForm((prevForm) => ({
        ...prevForm,
        preferredAt: formattedDate,
      }));
    } else {
      setCounselForm((prevForm) => ({
        ...prevForm,
        preferredAt: undefined,
      }));
    }
  };

  return (
    <Drawer direction="right" open={isOpen} onOpenChange={handleClose}>
      <DrawerContent className="h-full fixed w-full left-0 top-0 z-50 mt-0 flex flex-col bg-static-white">
        <DrawerHeader className="relative flex justify-center border-b-[1px] border-assistive-divider">
          <DrawerClose className="absolute left-5 top-4">
            <CaretLeft size={32} weight="thin" />
          </DrawerClose>
          <DrawerTitle>상담신청</DrawerTitle>
        </DrawerHeader>
        <div className="pt-9 py-5">
          <Funnel>
            <Step name="희망 상담 일자">
              <div className="p-5">
                <div className="text-title-2xl-m font-bold mb-4">
                  <p>희망 상담 일자를</p>
                  <p>선택해주세요</p>
                </div>
                <div className="relative flex items-center mb-6">
                  <label className="text-detail-lg-m text-assistive-detail">희망 상담 일자*</label>
                  <Info
                    size={20}
                    weight="regular"
                    className="text-assistive-default"
                    onClick={() => setIsInfoContent(!isInfoContent)}
                  />
                  {isInfoContent && (
                    <div className="absolute">
                      <div className="absolute top-[10px] left-[90px] w-4 right-0 border-b-[12px] border-b-assistive-detail border-x-[12px] border-x-transparent" />
                      <div className="absolute top-[18px] w-[336px] h-[64px] px-6 py-4 bg-assistive-detail text-white text-label-base-m rounded-7">
                        <p>희망 상담 일자는 예약확정이 아니며,</p>
                        <p>예약이 필요하실 경우 대표 번호로 유선 문의 부탁드립니다.</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="w-max px-6 pt-3 pb-6 m-auto shadow-[0_0_20px_0_rgba(70,69,107,0.10)] rounded-5">
                  <Calendar
                    mode="single"
                    selectedDate={counselForm.preferredAt ? new Date(counselForm.preferredAt) : undefined}
                    setDate={handleDateChange}
                  />
                </div>
              </div>
              <div className="flex justify-center">
                <Button
                  variant={counselForm.preferredAt ? 'primary' : 'disabled'}
                  size="md"
                  disabled={counselForm.preferredAt ? false : true}
                  type="button"
                  className="w-[296px] m-8"
                  onClick={() => setStep(steps[1])}>
                  다음
                </Button>
              </div>
            </Step>
            <Step name="추가 사항">
              <div className="px-5">
                <div className="text-title-2xl-m font-bold mb-4">
                  <p>매물에 대해 궁금하신 점을</p>
                  <p>작성해주세요</p>
                </div>
                <div className="flex flex-col gap-9">
                  <div className="">
                    <div className="flex flex-col gap-6">
                      <div className="flex items-center">
                        <label className="min-w-[90px] text-detail-lg-m text-assistive-detail">이름*</label>
                        <Input
                          type="text"
                          name="name"
                          value={counselForm.name}
                          onChange={handleInputChange}
                          className="w-full px-5 py-4 text-label-lg-m border border-assistive-default rounded-5"
                        />
                      </div>
                      <div className="flex items-center">
                        <label className="min-w-[90px] text-detail-lg-m text-assistive-detail">연락처*</label>
                        <Input
                          type="text"
                          name="phoneNumber"
                          value={counselForm.phoneNumber}
                          onChange={handleInputChange}
                          placeholder="ex) 010-0000-0000"
                          className={`w-full px-5 py-4 text-label-lg-m border ${
                            isPhoneValidation(counselForm.phoneNumber) || counselForm.phoneNumber === ''
                              ? ''
                              : 'shadow-[inset_0_0_0_2px_rgba(241,19,75,1)] focus:shadow-[inset_0_0_0_2px_rgba(241,19,75,1)]'
                          } rounded-5`}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-[1px] bg-assistive-divider" />
                  <div>
                    <h1 className="py-3 text-title-base-m font-bold">상담 내용</h1>
                    <textarea
                      name="counselingMessage"
                      value={counselForm.counselingMessage}
                      onChange={handleInputChange}
                      className="input-base w-full h-[214px] p-6 text-label-lg-m border border-assistive-default rounded-6 resize-none"
                      placeholder="궁금하신 사항을 남겨주시면 빠른 시일 내에 연락드리겠습니다"
                    />
                  </div>
                </div>
                <div className="flex justify-center">
                  <Button
                    variant={isCounselFormValidation ? 'primary' : 'disabled'}
                    size="md"
                    disabled={isCounselFormValidation ? false : true}
                    onClick={handleCounselRegister}
                    className="w-[296px] my-8">
                    신청하기
                  </Button>
                </div>
              </div>
            </Step>
          </Funnel>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export const CounselDialog = ({
  isOpen,
  handleClose,
  counselForm,
  setCounselForm,
  handleInputChange,
  isCounselFormValidation,
  handleCounselRegister,
  setIsInfoContent,
  isInfoContent,
  isPhoneValidation,
}: CounselProps) => {
  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      const offsetDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
      const formattedDate = offsetDate.toISOString().split('T')[0];
      console.log(formattedDate);

      setCounselForm((prevForm) => ({
        ...prevForm,
        preferredAt: formattedDate,
      }));
    } else {
      setCounselForm((prevForm) => ({
        ...prevForm,
        preferredAt: undefined,
      }));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="block w-[520px] h-[830px] py-9 px-0">
        <DialogTitle className="hidden" />
        <DialogClose className="flex justify-end w-full px-8 py-2">
          <X size={32} weight="thin" />
        </DialogClose>
        <div className="flex flex-col m-auto gap-6 w-[424px]">
          <div className="">
            <h1 className="py-3 text-title-2xl font-bold mb-6">상담 신청</h1>
            <div className="flex flex-col gap-6">
              <div className="flex items-center">
                <label className="min-w-[145px] text-detail-lg text-assistive-detail">이름*</label>
                <Input
                  type="text"
                  name="name"
                  value={counselForm.name}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 text-label-lg border border-assistive-default rounded-5"
                />
              </div>
              <div className="flex items-center">
                <label className="min-w-[145px] text-detail-lg text-assistive-detail">연락처*</label>
                <Input
                  type="text"
                  name="phoneNumber"
                  value={counselForm.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="ex) 010-0000-0000"
                  className={`w-full px-5 py-4 text-label-lg border ${
                    isPhoneValidation(counselForm.phoneNumber) || counselForm.phoneNumber === ''
                      ? ''
                      : 'shadow-[inset_0_0_0_2px_rgba(241,19,75,1)] focus:shadow-[inset_0_0_0_2px_rgba(241,19,75,1)]'
                  } rounded-5`}
                />
              </div>
              <div className="flex items-center">
                <div className="relative min-w-[145px]">
                  <label className="min-w-[145px] text-detail-lg text-assistive-detail">
                    희망 상담 일자*
                  </label>
                  <Info
                    size={20}
                    weight="regular"
                    className="absolute top-[3px] right-6 text-assistive-default"
                    onClick={() => setIsInfoContent(!isInfoContent)}
                  />
                  {isInfoContent && (
                    <div className="absolute">
                      <div className="absolute left-[103px] w-4 right-0 border-b-[12px] border-b-assistive-detail border-x-[12px] border-x-transparent" />
                      <div className="absolute top-[11px] w-[427px] h-[92px] p-6 bg-assistive-detail text-white text-label-base rounded-7">
                        <p>희망 상담 일자는 예약확정이 아니며,</p>
                        <p>예약이 필요하실 경우 대표 번호로 유선 문의 부탁드립니다.</p>
                      </div>
                    </div>
                  )}
                </div>
                <SingleDatePicker defaultLabel="상담날짜 선택" onChange={handleDateChange} />
              </div>
            </div>
          </div>
          <div className="w-full h-[1px] bg-assistive-divider" />
          <div>
            <h1 className="py-3 text-title-base font-bold">상담 내용</h1>
            <textarea
              name="counselingMessage"
              value={counselForm.counselingMessage}
              onChange={handleInputChange}
              className="input-base w-full h-[214px] p-6 text-label-lg border border-assistive-default rounded-6 resize-none"
              placeholder="궁금하신 사항을 남겨주시면 빠른 시일 내에 연락드리겠습니다"
            />
          </div>
          <div className="flex justify-center gap-5">
            <Button variant="assistive" onClick={() => handleClose(false)} className="w-[157px]">
              돌아가기
            </Button>
            <Button
              variant={isCounselFormValidation ? 'primary' : 'disabled'}
              disabled={isCounselFormValidation ? false : true}
              onClick={handleCounselRegister}
              className="w-[157px]">
              신청하기
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
