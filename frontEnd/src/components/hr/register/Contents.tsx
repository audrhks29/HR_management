import { memo, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useFieldArray, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";

import Privacy from "./menu/info/Privacy";
import Department from "./menu/info/Department";
import Career from "./menu/career/Career";
import Education from "./menu/career/Education";

import { memberRegisterFormData } from "@/assets/memberRegisterFormData";

import { postMemberData } from "@/server/fetchCreateData";

import { waitForUserConfirmation } from "@/shared/alert/function/waitForUserConfirmation";
import { getMemberData } from "@/server/fetchReadData";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

const Contents = memo(() => {
  const { data, refetch }: { data: MemberDataTypes | undefined; refetch: () => void } = useSuspenseQuery({
    queryKey: [`memberData}`],
    queryFn: getMemberData,
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<MemberRegistrationFormTypes>({
    defaultValues: {
      employeeData: memberRegisterFormData,
    },
  });

  const {
    fields: eduFields,
    append: eduAppend,
    remove: eduRemove,
  } = useFieldArray({
    control,
    name: "employeeData.edu",
  });

  const {
    fields: careerFields,
    append: careerAppend,
    remove: careerRemove,
  } = useFieldArray({
    control,
    name: "employeeData.career",
  });

  const onSubmit = async (data: { employeeData: MemberDataTypes }) => {
    toast({
      title: "구성원 정보 등록",
      description: "구성원 정보를 등록하시겠습니까?",
      action: (
        <>
          <ToastAction
            className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            onClick={() => submitData(data)}
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

  const submitData = async (data: { employeeData: MemberDataTypes }) => {
    postMemberData(data);
    toast({
      description: "구성원 정보가 등록되었습니다",
    });
    refetch();
    navigate("/hr_record");
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
      <div className="grid gap-6">
        <div className="grid grid-cols-2 gap-6">
          <Privacy register={register} setValue={setValue} errors={errors} />
          <Department register={register} setValue={setValue} watch={watch} errors={errors} />
        </div>

        <Education
          register={register}
          setValue={setValue}
          fields={eduFields}
          append={eduAppend}
          remove={eduRemove}
          errors={errors}
        />
        <Career
          register={register}
          setValue={setValue}
          fields={careerFields}
          append={careerAppend}
          remove={careerRemove}
          errors={errors}
        />

        <div className="text-right">
          <Button type="submit">제출</Button>
        </div>
      </div>
    </form>
  );
});

export default Contents;
