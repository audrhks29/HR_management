import { memo, useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Minus, Plus } from "lucide-react";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import { updateSettingRankData } from "@/server/fetchUpdateData";
import CustomConfirm from "@/shared/alert/CustomConfirm";
import { waitForUserConfirmation } from "@/shared/alert/function/waitForUserConfirmation";

type FormValues = {
  rank_setting: RankSettingTypes[];
};

const Rank = memo(({ data, refetch }: { data: RankSettingTypes[]; refetch: () => void }) => {
  const { register, handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      rank_setting: data.map(rank => ({
        order: rank.order,
        value: rank.value,
      })),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "rank_setting",
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
      await updateSettingRankData(updateData);
      refetch();
      navigate("/setting");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="p-8 h-full">
        <CardTitle className="pb-3 flex items-center justify-between">
          <span>직급</span>
          <div className="flex gap-2">
            <Button
              type="button"
              onClick={() =>
                append({
                  order: fields.length + 1,
                  value: "",
                })
              }>
              <Plus className="w-3 h-3" />
            </Button>
            <Button type="submit">저장</Button>
          </div>
        </CardTitle>
        <Separator />
        <CardContent className="py-3">
          {fields.map((rank, index) => (
            <div key={rank.order} className="grid grid-cols-[50px_200px_50px] my-2 items-center gap-3">
              <Input
                className="text-center"
                id={`rank_setting.${index}.order`}
                {...register(`rank_setting.${index}.order`)}
                type="text"
              />
              <Input id={`rank_setting.${index}.value`} {...register(`rank_setting.${index}.value`)} type="text" />
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
        title="직급"
        text="직급을 저장하시겠습니까?"
      />
    </form>
  );
});

export default Rank;
