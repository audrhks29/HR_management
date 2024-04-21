import { memo } from "react";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { updateSettingCommuteData } from "@/server/fetchUpdateData";

const CommuteTime = memo(({ data }: { data: CommuteSettingTypes[] }) => {
  console.log(data);
  const { register, handleSubmit, formState } = useForm<CommuteSettingTypes[]>({
    defaultValues: data.map(commute => ({
      name: commute.name,
      setting: commute.setting.map(item => ({
        id: item?.id,
        value: item?.value,
      })),
    })),
  });
  console.log(formState.defaultValues);

  const onSubmit: SubmitHandler<CommuteSettingTypes[]> = async updateData => {
    console.log(updateData);
    await updateSettingCommuteData(updateData);
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
                  id={`${index}.setting.${working.id - 1}.value`}
                  {...register(`${index}.setting.${working.id - 1}.value`)}
                  type="text"
                />
              </div>
            ))}
          </div>

          <div>
            <h2 className="py-2 text-[20px] font-bold">퇴근</h2>
            <Separator />
            {quitting_time_setting?.setting.map((qutting, index) => (
              <div key={qutting.id} className="grid grid-cols-[80px_200px] my-2 items-center gap-3">
                <Button variant="outline">{qutting.id}</Button>
                <Input
                  id={`setting.${qutting.id - 1}.value`}
                  {...register(`commute_setting.${index}.setting.${qutting.id - 1}.value`)}
                  type="text"
                />
              </div>
            ))}
          </div>
          <Button type="submit">저장</Button>
        </CardContent>
      </Card>
    </form>
  );
});

export default CommuteTime;