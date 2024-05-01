import { memo, useState } from "react";
import { CalendarIcon, Minus, Plus } from "lucide-react";
import { format } from "date-fns";
import {
  FieldArrayWithId,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";

import { cn } from "@/lib/utils";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

const Career = memo(
  ({
    register,
    setValue,
    fields,
    append,
    remove,
  }: {
    register: UseFormRegister<MemberRegistrationFormTypes>;
    setValue: UseFormSetValue<MemberRegistrationFormTypes>;
    fields: FieldArrayWithId<MemberRegistrationFormTypes, "employeeData.career", "id">[];
    append: UseFieldArrayAppend<MemberRegistrationFormTypes, "employeeData.career">;
    remove: UseFieldArrayRemove;
  }) => {
    const [joinDates, setJoinDates] = useState<(Date | undefined)[]>(fields.map(() => new Date()));
    const [leaveDates, setLeaveDates] = useState<(Date | undefined)[]>(fields.map(() => new Date()));

    const formatDate = (value: Date | undefined) => {
      if (value) {
        const year = String(value?.getFullYear());
        const month = String(value?.getMonth() + 1).padStart(2, "0");
        const date = String(value?.getDate()).padStart(2, "0");
        return `${year}${month}${date}`;
      }
    };

    const handleJoinDate = (index: number, value: Date | undefined) => {
      const valueDate = formatDate(value);
      const newJoinDates = [...joinDates];
      newJoinDates[index] = value;

      setJoinDates(newJoinDates);
      if (valueDate) {
        setValue(`employeeData.career.${index}.join_date`, valueDate);
      }
    };

    const handleLeaveDate = (index: number, value: Date | undefined) => {
      const valueDate = formatDate(value);
      const newLeaveDates = [...leaveDates];
      newLeaveDates[index] = value;

      setLeaveDates(newLeaveDates);
      if (valueDate) {
        setValue(`employeeData.career.${index}.leave_date`, valueDate);
      }
    };

    return (
      <Card className="w-full p-8">
        <CardHeader>
          <CardTitle className="flex justify-between">
            <span>경력</span>
            <Button
              type="button"
              onClick={() => {
                append({
                  company_name: "",
                  depart: "",
                  job: "",
                  join_date: "",
                  leave_date: "",
                  rank: "",
                });
                setJoinDates([...joinDates, new Date()]);
                setLeaveDates([...leaveDates, new Date()]);
              }}>
              <Plus className="w-3 h-3" />
            </Button>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-2">
          {fields.map((_, index) => (
            <div key={index} className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_44px] gap-6">
              {/* 회사명 */}
              <div className="space-y-1">
                <Label htmlFor="company_name">회사명</Label>
                <Input
                  id={`employeeData.career.${index}.company_name`}
                  {...register(`employeeData.career.${index}.company_name`)}
                />
              </div>

              {/* 입사일 */}
              <div className="grid grid-cols-[1fr_1fr] gap-6">
                <div className="flex flex-col justify-between">
                  <Label className="mt-1">입사일</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        type="button"
                        variant={"outline"}
                        className={cn(
                          "w-[200px] justify-start text-left font-normal",
                          !joinDates && "text-muted-foreground",
                        )}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {joinDates[index] ? format(String(joinDates[index]), "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={joinDates[index]}
                        onSelect={value => handleJoinDate(index, value)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* 퇴사일 */}
                <div className="flex flex-col justify-between">
                  <Label className="mt-1">퇴사일</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        type="button"
                        variant={"outline"}
                        className={cn(
                          "w-[200px] justify-start text-left font-normal",
                          !leaveDates[index] && "text-muted-foreground",
                        )}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {leaveDates[index] ? format(String(leaveDates[index]), "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={joinDates[index]}
                        onSelect={value => handleLeaveDate(index, value)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              {/* 직무 */}
              <div className="space-y-1">
                <Label htmlFor="job">직무</Label>
                <Input id={`employeeData.career.${index}.job`} {...register(`employeeData.career.${index}.job`)} />
              </div>
              {/* 근무부서 */}
              <div className="space-y-1">
                <Label htmlFor="depart">근무부서</Label>
                <Input
                  id={`employeeData.career.${index}.depart`}
                  {...register(`employeeData.career.${index}.depart`)}
                />
              </div>
              {/* 직급 */}
              <div className="space-y-1">
                <Label htmlFor="rank">직급</Label>
                <Input id={`employeeData.career.${index}.rank`} {...register(`employeeData.career.${index}.rank`)} />
              </div>
              {/* 삭제 버튼 */}
              <div className="mt-auto ml-auto">
                <Button type="button" onClick={() => remove(index)}>
                  <Minus className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  },
);

export default Career;
