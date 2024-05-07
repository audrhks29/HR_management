import { memo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { updateSettingBusinessData } from "@/server/fetchUpdateData";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

const Business = memo(({ data, refetch }: { data: BusinessSettingTypes; refetch: () => void }) => {
  interface FormValues {
    business_setting: BusinessSettingTypes;
  }
  const { toast } = useToast();
  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      business_setting: {
        name_of_company: data.name_of_company,
        business_address: data.business_address,
        business_registration_number: data.business_registration_number,
        resident_registration_number: data.resident_registration_number,
        date_of_business_commencement: data.date_of_business_commencement,
        main_number: data.main_number,
        name_of_representative: data.name_of_representative,
        type_of_business: data.type_of_business,
      },
    },
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormValues> = async updateData => {
    toast({
      title: "회사정보 수정",
      description: "회사정보 수정을 완료하시겠습니까?",
      action: (
        <>
          <ToastAction
            className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            onClick={() => submitData(updateData)}
            altText="확인">
            확인
          </ToastAction>
          <ToastAction className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2" altText="취소">
            취소
          </ToastAction>
        </>
      ),
    });
  };

  const submitData = async (updateData: FormValues) => {
    await updateSettingBusinessData(updateData);
    toast({
      description: "완료되었습니다",
    });
    refetch();
    navigate("/setting");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="p-8">
        <CardTitle className="pb-3 flex items-center justify-between">
          <span>회사정보</span>
          <div className="flex gap-2">
            <Button type="submit">저장</Button>
          </div>
        </CardTitle>
        <Separator />
        <CardContent className="py-3">
          <div className="grid grid-cols-[130px_1fr] my-2 items-center gap-3">
            <Button variant="outline" type="button">
              상호
            </Button>
            <Input
              id={"business_setting.name_of_company"}
              {...register("business_setting.name_of_company", {
                required: "상호를 입력해주세요",
                maxLength: {
                  value: 20,
                  message: "20글자 내로 입력해주세요",
                },
              })}
              type="text"
            />
          </div>

          <div className="grid grid-cols-[130px_1fr] my-2 items-center gap-3">
            <Button variant="outline" type="button">
              사업장주소
            </Button>
            <Input
              id={"business_setting.business_address"}
              {...register("business_setting.business_address", {
                required: "사업장 주소를 입력해주세요",
              })}
              type="text"
            />
          </div>

          <div className="grid grid-cols-[130px_1fr] my-2 items-center gap-3">
            <Button variant="outline" type="button">
              사업자등록번호
            </Button>
            <Input
              id={"business_setting.business_registration_number"}
              {...register("business_setting.business_registration_number", {
                pattern: {
                  value: /\d{3}-\d{2}-\d{5}/,
                  message: "사업자등록번호 형식이 맞지 않습니다. 예)000-00-00000",
                },
              })}
              type="text"
            />
          </div>

          <div className="grid grid-cols-[130px_1fr] my-2 items-center gap-3">
            <Button variant="outline" type="button">
              법인등록번호
            </Button>
            <Input
              id={"business_setting.resident_registration_number"}
              {...register("business_setting.resident_registration_number", {
                pattern: { value: /\d{6}-\d{7}/, message: "법인등록번호 형식이 맞지 않습니다. 예)000000-0000000" },
              })}
              type="text"
              placeholder="000000-0000000"
            />
          </div>

          <div className="grid grid-cols-[130px_1fr] my-2 items-center gap-3">
            <Button variant="outline" type="button">
              개업일
            </Button>
            <Input
              id={"business_setting.date_of_business_commencement"}
              {...register("business_setting.date_of_business_commencement", {
                pattern: {
                  value: /(\d{4})년 (\d{2})월 (\d{2})일$/,
                  message: "입사일에 알맞은 형식을 입력해주세요. 예) 2020년 01월 01일",
                },
              })}
              type="text"
              placeholder="0000년 00월 00일"
            />
          </div>

          <div className="grid grid-cols-[130px_1fr] my-2 items-center gap-3">
            <Button variant="outline" type="button">
              사업장 대표번호
            </Button>
            <Input
              id={"business_setting.main_number"}
              {...register("business_setting.main_number", {
                maxLength: { value: 11, message: "11글자 내로 입력해주세요." },
              })}
              type="text"
              placeholder="000-000-0000"
            />
          </div>

          <div className="grid grid-cols-[130px_1fr] my-2 items-center gap-3">
            <Button variant="outline" type="button">
              사업자 대표
            </Button>
            <Input
              id={"business_setting.name_of_representative"}
              {...register("business_setting.name_of_representative", {
                maxLength: { value: 20, message: "20글자 내로 입력해주세요." },
              })}
              type="text"
            />
          </div>

          <div className="grid grid-cols-[130px_1fr] my-2 items-center gap-3">
            <Button variant="outline" type="button">
              업종
            </Button>
            <Input
              id={"business_setting.type_of_business"}
              {...register("business_setting.type_of_business", {
                maxLength: { value: 30, message: "30글자 이내로 입력해주세요." },
              })}
              type="text"
              placeholder="업종"
            />
          </div>
        </CardContent>
      </Card>
    </form>
  );
});

export default Business;
