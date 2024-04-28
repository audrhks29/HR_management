import { memo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { updateSettingBusinessData } from "@/server/fetchUpdateData";

const Business = memo(({ data, refetch }: { data: BusinessSettingTypes; refetch: () => void }) => {
  interface FormValues {
    business_setting: BusinessSettingTypes;
  }

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

  const [confirmState, setConfirmState] = useState<{ popup: boolean; confirmResult: boolean | undefined }>({
    popup: false,
    confirmResult: undefined,
  });

  const navigate = useNavigate();

  const showPopup = () => {
    setConfirmState({ popup: true, confirmResult: undefined });
  };

  const waitForUserConfirmation = () => {
    return new Promise<boolean>((resolve, reject) => {
      if (confirmState.confirmResult) resolve(true);
      else resolve(false);
    });
  };

  const onSubmit: SubmitHandler<FormValues> = async updateData => {
    showPopup();
    const confirm = await waitForUserConfirmation();
    if (confirm) {
      await updateSettingBusinessData(updateData);
      refetch();
      navigate("/setting");
    }
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
            <Button variant="outline">상호</Button>
            <Input
              id={"business_setting.name_of_company"}
              {...register("business_setting.name_of_company")}
              type="text"
              placeholder="상호"
            />
          </div>

          <div className="grid grid-cols-[130px_1fr] my-2 items-center gap-3">
            <Button variant="outline">사업장주소</Button>
            <Input
              id={"business_setting.business_address"}
              {...register("business_setting.business_address")}
              type="text"
              placeholder="사업장주소"
            />
          </div>

          <div className="grid grid-cols-[130px_1fr] my-2 items-center gap-3">
            <Button variant="outline">사업자등록번호</Button>
            <Input
              id={"business_setting.business_registration_number"}
              {...register("business_setting.business_registration_number")}
              type="text"
              placeholder="예) 000-00-0000"
            />
          </div>

          <div className="grid grid-cols-[130px_1fr] my-2 items-center gap-3">
            <Button variant="outline">법인등록번호</Button>
            <Input
              id={"business_setting.resident_registration_number"}
              {...register("business_setting.resident_registration_number")}
              type="text"
              placeholder="예) 000000-0000000"
            />
          </div>

          <div className="grid grid-cols-[130px_1fr] my-2 items-center gap-3">
            <Button variant="outline">개업일</Button>
            <Input
              id={"business_setting.date_of_business_commencement"}
              {...register("business_setting.date_of_business_commencement")}
              type="text"
              placeholder="0000년 00월 00일"
            />
          </div>

          <div className="grid grid-cols-[130px_1fr] my-2 items-center gap-3">
            <Button variant="outline">사업장 대표번호</Button>
            <Input
              id={"business_setting.main_number"}
              {...register("business_setting.main_number")}
              type="text"
              placeholder="000-000-0000"
            />
          </div>

          <div className="grid grid-cols-[130px_1fr] my-2 items-center gap-3">
            <Button variant="outline">사업자 대표</Button>
            <Input
              id={"business_setting.name_of_representative"}
              {...register("business_setting.name_of_representative")}
              type="text"
              placeholder="사업자 대표"
            />
          </div>

          <div className="grid grid-cols-[130px_1fr] my-2 items-center gap-3">
            <Button variant="outline">업종</Button>
            <Input
              id={"business_setting.type_of_business"}
              {...register("business_setting.type_of_business")}
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
