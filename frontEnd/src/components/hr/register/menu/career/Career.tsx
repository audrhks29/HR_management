import {
  FieldArrayWithId,
  FieldErrors,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const Career = ({
  register,
  fields,
  append,
  remove,
  errors,
}: {
  register: UseFormRegister<MemberRegistrationFormTypes>;
  setValue: UseFormSetValue<MemberRegistrationFormTypes>;
  fields: FieldArrayWithId<MemberRegistrationFormTypes, "employeeData.career", "id">[];
  append: UseFieldArrayAppend<MemberRegistrationFormTypes, "employeeData.career">;
  remove: UseFieldArrayRemove;
  errors: FieldErrors<MemberRegistrationFormTypes>;
}) => {
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
            }}>
            추가
          </Button>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-2">
        {fields.map((_, index) => (
          <div key={index} className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_44px] gap-6">
            {/* 회사명 */}
            <div className="space-y-1">
              <Label htmlFor="company_name">회사명</Label>
              <Input
                id={`employeeData.career.${index}.company_name`}
                {...register(`employeeData.career.${index}.company_name`)}
              />
            </div>

            {/* 입사일 */}
            <div className="space-y-1">
              <Label>입사일자</Label>
              <Input
                id={`employeeData.career.${index}.join_date`}
                type="text"
                placeholder="2020년 01월 01일"
                {...register(`employeeData.career.${index}.join_date`, {
                  pattern: {
                    value: /(\d{4})년 (\d{2})월 (\d{2})일$/,
                    message: "알맞은 형식을 입력해주세요. 예) 2020년 01월 01일",
                  },
                })}
              />

              <ErrorMessage
                errors={errors}
                name={`employeeData.career.${index}.join_date`}
                render={({ message }) => <p className="text-destructive font-bold text-[12px]">{message}</p>}
              />
            </div>

            {/* 퇴사일 */}
            <div className="space-y-1">
              <Label>퇴사일자</Label>
              <Input
                id={`employeeData.career.${index}.leave_date`}
                type="text"
                placeholder="2020년 01월 01일"
                {...register(`employeeData.career.${index}.leave_date`, {
                  pattern: {
                    value: /(\d{4})년 (\d{2})월 (\d{2})일$/,
                    message: "알맞은 형식을 입력해주세요. 예) 2020년 01월 01일",
                  },
                })}
              />

              <ErrorMessage
                errors={errors}
                name={`employeeData.career.${index}.leave_date`}
                render={({ message }) => <p className="text-destructive font-bold text-[12px]">{message}</p>}
              />
            </div>

            {/* 직무 */}
            <div className="space-y-1">
              <Label htmlFor="job">직무</Label>
              <Input id={`employeeData.career.${index}.job`} {...register(`employeeData.career.${index}.job`)} />
            </div>

            {/* 근무부서 */}
            <div className="space-y-1">
              <Label htmlFor="depart">근무부서</Label>
              <Input id={`employeeData.career.${index}.depart`} {...register(`employeeData.career.${index}.depart`)} />
            </div>

            {/* 직급 */}
            <div className="space-y-1">
              <Label htmlFor="rank">직급</Label>
              <Input id={`employeeData.career.${index}.rank`} {...register(`employeeData.career.${index}.rank`)} />
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

export default Career;
