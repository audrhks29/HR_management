import {
  FieldArrayWithId,
  FieldErrors,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ErrorMessage } from "@hookform/error-message";

const Education = ({
  register,
  setValue,
  fields,
  append,
  remove,
  errors,
}: {
  register: UseFormRegister<MemberRegistrationFormTypes>;
  setValue: UseFormSetValue<MemberRegistrationFormTypes>;
  fields: FieldArrayWithId<MemberRegistrationFormTypes, "employeeData.edu", "id">[];
  append: UseFieldArrayAppend<MemberRegistrationFormTypes, "employeeData.edu">;
  remove: UseFieldArrayRemove;
  errors: FieldErrors<MemberRegistrationFormTypes>;
}) => {
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
            }}>
            추가
          </Button>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-2">
        {fields.map((_, index) => (
          <div key={index} className="grid grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr_44px] gap-6">
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

            <div className="space-y-1">
              <Label>입학일</Label>
              <Input
                id={`employeeData.edu.${index}.admission_date`}
                type="text"
                placeholder="2020년 01월 01일"
                {...register(`employeeData.edu.${index}.admission_date`, {
                  pattern: {
                    value: /(\d{4})년 (\d{2})월 (\d{2})일$/,
                    message: "알맞은 형식을 입력해주세요. 예) 2020년 01월 01일",
                  },
                })}
              />
              <ErrorMessage
                errors={errors}
                name={`employeeData.edu.${index}.admission_date`}
                render={({ message }) => <p className="text-destructive font-bold text-[12px]">{message}</p>}
              />
            </div>

            {/* 졸업일 */}
            <div className="space-y-1">
              <Label>졸업일</Label>
              <Input
                id={`employeeData.edu.${index}.graduation_date`}
                type="text"
                placeholder="2020년 01월 01일"
                {...register(`employeeData.edu.${index}.graduation_date`, {
                  pattern: {
                    value: /(\d{4})년 (\d{2})월 (\d{2})일$/,
                    message: "알맞은 형식을 입력해주세요. 예) 2020년 01월 01일",
                  },
                })}
              />

              <ErrorMessage
                errors={errors}
                name={`employeeData.edu.${index}.graduation_date`}
                render={({ message }) => <p className="text-destructive font-bold text-[12px]">{message}</p>}
              />
            </div>

            {/* 삭제 버튼 */}
            <div className="mt-auto ml-auto">
              <Button type="button" onClick={() => remove(index)}>
                삭제
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default Education;
