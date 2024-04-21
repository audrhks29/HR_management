import { memo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import { updateSettingRankData } from "@/server/fetchUpdateData";

interface FormValues {
  rank_setting: RankSettingTypes[];
  RankSettingTypes: RankSettingTypes[];
}

const Rank = memo(({ data }: { data: RankSettingTypes[] }) => {
  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      rank_setting: data.map(rank => ({
        order: rank.order,
        value: rank.value,
      })),
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async updateData => {
    await updateSettingRankData(updateData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="p-8">
        <CardTitle className="pb-3">직급</CardTitle>
        <Separator />
        <CardContent className="py-3">
          {data.map((rank, index) => (
            <div key={rank.order} className="grid grid-cols-[80px_200px] my-2 items-center gap-3">
              <Input id={`rank_setting.${index}.order`} {...register(`rank_setting.${index}.order`)} type="text" />
              <Input id={`rank_setting.${index}.value`} {...register(`rank_setting.${index}.value`)} type="text" />
            </div>
          ))}
          <Button type="submit">저장</Button>
        </CardContent>
      </Card>
    </form>
  );
});

export default Rank;