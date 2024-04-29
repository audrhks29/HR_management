import { memo } from "react";
import { Control, UseFormRegister, useFieldArray } from "react-hook-form";
import { Minus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import Depart from "./Depart";

const Quarter = memo(
  ({
    control,
    register,
  }: {
    control: Control<OrganizationFormValues, any>;
    register: UseFormRegister<OrganizationFormValues>;
  }) => {
    const { fields, append, remove } = useFieldArray({
      control,
      name: "organizationData",
    });
    // console.log(fields);
    return (
      <div>
        <Button
          type="button"
          className="mb-3"
          onClick={() =>
            append({
              quarter: "",
              depart: [],
            })
          }>
          지사 추가
        </Button>

        {fields.map((item, index) => {
          return (
            <div key={item.id} className="flex items-center p-8 border">
              <Input
                className="w-[200px]"
                id={`organizationData.${index}.quarter`}
                {...register(`organizationData.${index}.quarter`)}
              />

              <Button type="button" onClick={() => remove(index)}>
                <Minus className="w-3 h-3" />
              </Button>
              <Depart quarterIndex={index} control={control} register={register} />
            </div>
          );
        })}
      </div>
    );
  },
);

export default Quarter;
