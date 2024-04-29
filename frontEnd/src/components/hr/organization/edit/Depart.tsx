import { memo } from "react";
import { Control, UseFormRegister, useFieldArray } from "react-hook-form";
import { Minus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import Team from "./Team";

const Depart = memo(
  ({
    quarterIndex,
    control,
    register,
  }: {
    quarterIndex: number;
    control: Control<OrganizationFormValues, any>;
    register: UseFormRegister<OrganizationFormValues>;
  }) => {
    const { fields, remove, append } = useFieldArray({
      control,
      name: `organizationData.${quarterIndex}.depart`,
    });

    return (
      <div className="flex flex-col gap-6 items-center ml-3">
        <Button
          type="button"
          className="w-24"
          onClick={() => {
            append({
              name: "",
              team: [],
            });
          }}>
          부서 추가
        </Button>

        {fields.map((item, index) => {
          return (
            <div key={item.id} className="flex items-center border p-3">
              <Input
                className="w-[200px]"
                {...register(`organizationData.${quarterIndex}.depart.${index}.name`, {
                  required: true,
                })}
              />

              <Button type="button" onClick={() => remove(index)}>
                <Minus className="w-3 h-3" />
              </Button>
              <Team quarterIndex={quarterIndex} departIndex={index} control={control} register={register} />
            </div>
          );
        })}
      </div>
    );
  },
);

export default Depart;
