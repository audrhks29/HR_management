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

import CustomConfirm from "@/shared/alert/CustomConfirm";
import { waitForUserConfirmation } from "@/shared/alert/function/waitForUserConfirmation";
import { getMemberData } from "@/server/fetchReadData";

const Contents = memo(() => {
  const { data, refetch }: { data: MemberDataTypes | undefined; refetch: () => void } = useSuspenseQuery({
    queryKey: [`memberData}`],
    queryFn: getMemberData,
  });

  const [confirmState, setConfirmState] = useState<{ popup: boolean; confirmResult: boolean | undefined }>({
    popup: false,
    confirmResult: undefined,
  });

  const navigate = useNavigate();

  const showPopup = () => {
    setConfirmState({ popup: true, confirmResult: undefined });
  };

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
    showPopup();
    const confirm = await waitForUserConfirmation(confirmState);
    if (confirm) {
      postMemberData(data);
      setConfirmState({ popup: false, confirmResult: undefined });
      refetch();
      navigate("/hr_record");
    }
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

      <CustomConfirm
        confirmState={confirmState}
        setConfirmState={setConfirmState}
        title="구성원 추가"
        text="구성원을 추가하시겠습니까?"
      />
    </form>
  );
});

export default Contents;
