import { memo } from "react";
import { Control, UseFormRegister, useFieldArray } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Team = memo(
  ({
    quarterIndex,
    departIndex,
    control,
    register,
  }: {
    quarterIndex: number;
    departIndex: number;
    control: Control<OrganizationFormValues, any>;
    register: UseFormRegister<OrganizationFormValues>;
  }) => {
    const { fields, remove, append } = useFieldArray({
      control,
      name: `organizationData.${quarterIndex}.depart.${departIndex}.team`,
    });

    return (
      <div className="border flex flex-col gap-6 items-center p-3 ml-3">
        <Button
          className="w-24"
          type="button"
          onClick={() => {
            append({
              name: "",
            });
          }}>
          팀 추가
        </Button>

        {fields.map((item, index) => {
          return (
            <div key={item.id} className="flex">
              <Input
                id={`organizationData.${quarterIndex}.depart.${departIndex}.team.${index}.name`}
                className="w-[200px]"
                {...register(`organizationData.${quarterIndex}.depart.${departIndex}.team.${index}.name`, {
                  required: true,
                })}
              />

              <Button type="button" onClick={() => remove(index)}>
                삭제
              </Button>
            </div>
          );
        })}
      </div>
    );
  },
);

export default Team;
