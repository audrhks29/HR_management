import { memo } from "react";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { updateSettingCommuteData } from "@/server/fetchUpdateData";
import ButtonGroup from "../Button/ButtonGroup";

interface FormValues {
  commute_setting: CommuteSettingTypes[];
}

const CommuteTime = memo(({ data, refetch }: { data: CommuteSettingTypes[]; refetch: () => void }) => {
  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      commute_setting: data.map(commute => ({
        name: commute.name,
        setting: commute.setting.map(item => ({
          id: item?.id,
          value: item?.value,
        })),
      })),
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async updateData => {
    await updateSettingCommuteData(updateData);
    refetch();
  };

  const working_time_setting = data.find(item => item.name === "working_time_setting");
  const quitting_time_setting = data.find(item => item.name === "quitting_time_setting");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="p-8">
        <CardTitle className="pb-3">출퇴근시간</CardTitle>
        <Separator />
        <CardContent className="py-3 grid grid-cols-2 gap-6">
          <div>
            <h2 className="py-2 text-[20px] font-bold">출근</h2>
            <Separator />
            {working_time_setting?.setting.map((working, index) => (
              <div key={working.id} className="grid grid-cols-[80px_200px] my-2 items-center gap-3">
                <Button variant="outline">{working.id}</Button>
                <Input
                  id={`commute_setting.${Number(0)}.setting.${index}.value`}
                  {...register(`commute_setting.${Number(0)}.setting.${index}.value`)}
                  type="text"
                />
              </div>
            ))}
          </div>

          <div>
            <h2 className="py-2 text-[20px] font-bold">퇴근</h2>
            <Separator />
            {quitting_time_setting?.setting.map((quitting, index) => (
              <div key={quitting.id} className="grid grid-cols-[80px_200px] my-2 items-center gap-3">
                <Button variant="outline">{quitting.id}</Button>
                <Input
                  id={`commute_setting.${Number(1)}.setting.${index}.value`}
                  {...register(`commute_setting.${Number(1)}.setting.${index}.value`)}
                  type="text"
                />
              </div>
            ))}
          </div>
        </CardContent>

        <ButtonGroup />
      </Card>
    </form>
  );
});

export default CommuteTime;
