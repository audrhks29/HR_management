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
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

const Education = memo(
  ({
    register,
    setValue,
    fields,
    append,
    remove,
  }: {
    register: UseFormRegister<MemberRegistrationFormValues>;
    setValue: UseFormSetValue<MemberRegistrationFormValues>;
    fields: FieldArrayWithId<MemberRegistrationFormValues, "employeeData.edu", "id">[];
    append: UseFieldArrayAppend<MemberRegistrationFormValues, "employeeData.edu">;
    remove: UseFieldArrayRemove;
  }) => {
    const [admissionDates, setAdmissionDates] = useState<(Date | undefined)[]>(fields.map(() => new Date()));
    const [graduationDates, setGraduationDates] = useState<(Date | undefined)[]>(fields.map(() => new Date()));

    const formatDate = (value: Date | undefined) => {
      if (value) {
        const year = String(value?.getFullYear());
        const month = String(value?.getMonth() + 1).padStart(2, "0");
        const date = String(value?.getDate()).padStart(2, "0");
        return `${year}${month}${date}`;
      }
    };

    const handleAdmissionDate = (index: number, value: Date | undefined) => {
      const valueDate = formatDate(value);
      const newAdmissionDates = [...admissionDates];
      newAdmissionDates[index] = value;

      setAdmissionDates(newAdmissionDates);
      if (valueDate) {
        setValue(`employeeData.edu.${index}.admission_date`, valueDate);
      }
    };

    const handleGraduationDate = (index: number, value: Date | undefined) => {
      const valueDate = formatDate(value);
      const newGraduationDates = [...graduationDates];
      newGraduationDates[index] = value;

      setGraduationDates(newGraduationDates);
      if (valueDate) {
        setValue(`employeeData.edu.${index}.graduation_date`, valueDate);
      }
    };

    return (
      <Card className="w-full p-8">
        <CardHeader>
          <CardTitle className="flex justify-between">
            <span>학력</span>
            <Button
              type="button"
              onClick={() => {
                append({
                  admission_date: "",
                  collage: "",
                  graduation_date: "",
                  graduation_status: "",
                  school_classification: "",
                  school_name: "",
                });
                setAdmissionDates([...admissionDates, new Date()]);
                setGraduationDates([...graduationDates, new Date()]);
              }}>
              <Plus className="w-3 h-3" />
            </Button>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-2">
          {fields.map((_, index) => (
            <div key={index} className="grid grid-cols-[1fr_2fr_1fr_1fr_1fr_44px] gap-6">
              {/* 졸업구분 */}
              <div className="space-y-1">
                <Select onValueChange={value => setValue(`employeeData.edu.${index}.school_classification`, value)}>
                  <Label>졸업 구분</Label>
                  <SelectTrigger>
                    <SelectValue placeholder="졸업 구분" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="초등학교">초등학교</SelectItem>
                      <SelectItem value="중학교">중학교</SelectItem>
                      <SelectItem value="고등학교">고등학교</SelectItem>
                      <SelectItem value="대학교">대학교</SelectItem>
                      <SelectItem value="대학원">대학원</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* 학교명 */}
              <div className="space-y-1">
                <Label htmlFor="school_name">학교명</Label>
                <Input
                  id={`employeeData.edu.${index}.school_name`}
                  {...register(`employeeData.edu.${index}.school_name`)}
                />
              </div>

              {/* 학과 */}
              <div className="space-y-1">
                <Label htmlFor="collage">학과</Label>
                <Input id={`employeeData.edu.${index}.collage`} {...register(`employeeData.edu.${index}.collage`)} />
              </div>

              {/* 졸업 여부 */}
              <div className="space-y-1">
                <Select onValueChange={value => setValue(`employeeData.edu.${index}.graduation_status`, value)}>
                  <Label>졸업 여부</Label>
                  <SelectTrigger>
                    <SelectValue placeholder="졸업 여부" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="졸업">졸업</SelectItem>
                      <SelectItem value="재학중">재학중</SelectItem>
                      <SelectItem value="휴학중">휴학중</SelectItem>
                      <SelectItem value="중퇴">중퇴</SelectItem>
                      <SelectItem value="자퇴">자퇴</SelectItem>
                      <SelectItem value="졸업예정">졸업예정</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* 입학일 */}
              <div className="grid grid-cols-[1fr_1fr] gap-6">
                <div className="space-y-1">
                  <Label>입학일</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        type="button"
                        variant={"outline"}
                        className={cn(
                          "w-[200px] justify-start text-left font-normal",
                          !admissionDates && "text-muted-foreground",
                        )}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {admissionDates[index] ? (
                          format(String(admissionDates[index]), "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={admissionDates[index]}
                        onSelect={value => handleAdmissionDate(index, value)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* 졸업일 */}
                <div className="space-y-1">
                  <Label>졸업일</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        type="button"
                        variant={"outline"}
                        className={cn(
                          "w-[200px] justify-start text-left font-normal",
                          !graduationDates && "text-muted-foreground",
                        )}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {graduationDates[index] ? (
                          format(String(admissionDates[index]), "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={graduationDates[index]}
                        onSelect={value => handleGraduationDate(index, value)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
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

export default Education;
