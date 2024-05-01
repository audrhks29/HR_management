import { memo, useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Minus, Plus } from "lucide-react";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

import { updateSettingPositionData } from "@/server/fetchUpdateData";
import { Button } from "@/components/ui/button";
import CustomConfirm from "@/shared/alert/CustomConfirm";
import { waitForUserConfirmation } from "@/shared/alert/function/waitForUserConfirmation";

type FormValues = {
  position_setting: PositionSettingTypes[];
};

const Position = memo(({ data, refetch }: { data: PositionSettingTypes[]; refetch: () => void }) => {
  const { register, handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      position_setting: data.map(position => ({
        id: position.id,
        name: position.name,
      })),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "position_setting",
  });

  const [confirmState, setConfirmState] = useState<{ popup: boolean; confirmResult: boolean | undefined }>({
    popup: false,
    confirmResult: undefined,
  });

  const navigate = useNavigate();

  const showPopup = () => {
    setConfirmState({ popup: true, confirmResult: undefined });
  };

  const onSubmit: SubmitHandler<FormValues> = async updateData => {
    showPopup();
    const confirm = await waitForUserConfirmation(confirmState);
    if (confirm) {
      await updateSettingPositionData(updateData);
      refetch();
      navigate("/setting");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="p-8 h-full">
        <CardTitle className="pb-3 flex items-center justify-between">
          <span>직책</span>
          <div className="flex gap-2">
            <Button
              type="button"
              onClick={() =>
                append({
                  id: fields.length + 1,
                  name: "",
                })
              }>
              <Plus className="w-3 h-3" />
            </Button>
            <Button type="submit">저장</Button>
          </div>
        </CardTitle>
        <Separator />

        <CardContent>
          {fields.map((position, index) => (
            <div key={position.id} className="grid grid-cols-[50px_200px_50px] my-2 items-center gap-3">
              <Input
                className="text-center"
                id={`position_setting.${index}.id`}
                {...register(`position_setting.${index}.id`)}
                type="text"
              />
              <Input
                id={`position_setting.${index}.name`}
                {...register(`position_setting.${index}.name`)}
                type="text"
              />
              <Button type="button" onClick={() => remove(index)}>
                <Minus className="w-3 h-3" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <CustomConfirm
        confirmState={confirmState}
        setConfirmState={setConfirmState}
        title="직책"
        text="직책을 저장하시겠습니까?"
      />
    </form>
  );
});

export default Position;
