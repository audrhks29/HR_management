import { memo } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Minus, Plus } from "lucide-react";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

import { updateSettingPositionData } from "@/server/fetchUpdateData";

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
  const { toast } = useToast();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "position_setting",
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormValues> = async updateData => {
    toast({
      title: "직책 수정",
      description: "직책 수정을 완료하시겠습니까?",
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
  const submitData = async (updateData: { position_setting: PositionSettingTypes[] }) => {
    await updateSettingPositionData(updateData);
    toast({
      description: "완료되었습니다",
    });
    refetch();
    navigate("/setting");
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
    </form>
  );
});

export default Position;
