import { memo } from "react";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateSettingBusinessData } from "@/server/fetchUpdateData";
import { SubmitHandler, useForm } from "react-hook-form";

const Business = memo(({ data }: { data: BusinessSettingTypes }) => {
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

  const onSubmit: SubmitHandler<FormValues> = async updateData => {
    await updateSettingBusinessData(updateData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="p-8">
        <CardTitle className="pb-3">회사정보</CardTitle>
        <Separator />
        <CardContent className="py-3">
          <div className="grid grid-cols-[130px_1fr] my-2 items-center gap-3">
            <Button variant="outline">상호</Button>
            <Input
              id={"business_setting.name_of_company"}
              {...register("business_setting.name_of_company")}
              type="text"
            />
          </div>

          <div className="grid grid-cols-[130px_1fr] my-2 items-center gap-3">
            <Button variant="outline">사업장주소</Button>
            <Input
              id={"business_setting.business_address"}
              {...register("business_setting.business_address")}
              type="text"
            />
          </div>

          <div className="grid grid-cols-[130px_1fr] my-2 items-center gap-3">
            <Button variant="outline">사업자등록번호</Button>
            <Input
              id={"business_setting.business_registration_number"}
              {...register("business_setting.business_registration_number")}
              type="text"
            />
          </div>

          <div className="grid grid-cols-[130px_1fr] my-2 items-center gap-3">
            <Button variant="outline">법인등록번호</Button>
            <Input
              id={"business_setting.resident_registration_number"}
              {...register("business_setting.resident_registration_number")}
              type="text"
            />
          </div>

          <div className="grid grid-cols-[130px_1fr] my-2 items-center gap-3">
            <Button variant="outline">개업일</Button>
            <Input
              id={"business_setting.date_of_business_commencement"}
              {...register("business_setting.date_of_business_commencement")}
              type="text"
            />
          </div>

          <div className="grid grid-cols-[130px_1fr] my-2 items-center gap-3">
            <Button variant="outline">사업장 대표번호</Button>
            <Input id={"business_setting.main_number"} {...register("business_setting.main_number")} type="text" />
          </div>

          <div className="grid grid-cols-[130px_1fr] my-2 items-center gap-3">
            <Button variant="outline">사업자 대표</Button>
            <Input
              id={"business_setting.name_of_representative"}
              {...register("business_setting.name_of_representative")}
              type="text"
            />
          </div>

          <div className="grid grid-cols-[130px_1fr] my-2 items-center gap-3">
            <Button variant="outline">업종</Button>
            <Input
              id={"business_setting.type_of_business"}
              {...register("business_setting.type_of_business")}
              type="text"
              value={data.type_of_business}
            />
          </div>
          <Button type="submit">저장</Button>
        </CardContent>
      </Card>
    </form>
  );
});

export default Business;
