import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";

import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

import { ArrowBigDownDash, ArrowBigUpDashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import PersonalTitle from "@/shared/PersonalTitle";

import { postMemberSalaryPersonalData } from "@/server/fetchCreateData";
import { deleteMemberSalaryData } from "@/server/fetchDeleteData";

const Select = ({
  personalData,
  memberSalaryPersonalData,
  refetch,
}: {
  personalData: MemberDataTypes;
  memberSalaryPersonalData: MemberSalaryDataTypes;
  refetch: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<MemberSalaryDataTypes, unknown>>;
}) => {
  const { employee_number } = useParams();
  const [isEditMode, setIsEditMode] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<MemberSalaryFormTypes>({
    defaultValues: {
      memberSalary: {
        employee_number: employee_number,
        data: {
          year: "",
          month: "",
          wage: 0,
          salary: 0,
        },
      },
    },
  });

  useEffect(() => {
    reset();
    const id = employee_number ? employee_number : "";
    setValue(`memberSalary.employee_number`, id);
  }, [employee_number]);

  const onSubmit = async (data: MemberSalaryFormTypes) => {
    toast({
      title: "급여 현황 등록",
      description: "급여 현황을 등록하시겠습니까?",
      action: (
        <>
          <ToastAction
            className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            onClick={() => submitData(data)}
            altText="확인">
            확인
          </ToastAction>
          <ToastAction className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2" altText="취소">
            취소
          </ToastAction>
        </>
      ),
    });
  };

  const submitData = async (data: MemberSalaryFormTypes) => {
    await postMemberSalaryPersonalData(data, employee_number);
    toast({
      description: "완료되었습니다",
    });
    setIsEditMode(false);
    await refetch();
    reset();
  };

  const deleteData = async (year: string, month: string) => {
    toast({
      title: "급여 현황",
      description: "선택된 급여 현황을 삭제하시겠습니까?",
      action: (
        <>
          <ToastAction
            className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            onClick={() => onDelete(year, month)}
            altText="확인">
            확인
          </ToastAction>
          <ToastAction className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2" altText="취소">
            취소
          </ToastAction>
        </>
      ),
    });
  };

  const onDelete = async (year: string, month: string) => {
    await deleteMemberSalaryData(employee_number, year, month);
    toast({
      description: "완료되었습니다",
    });
    await refetch();
    reset();
  };

  const wageWatch = watch(`memberSalary.data.wage`);

  useEffect(() => {
    const salary = wageWatch / 12;
    setValue(`memberSalary.data.salary`, salary);
  }, [wageWatch]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="h-[850px] p-8 overflow-y-auto">
        <PersonalTitle personalData={personalData}>
          <div>
            <Button type="button" onClick={() => setIsEditMode(!isEditMode)}>
              {isEditMode ? "취소" : "추가"}
            </Button>
          </div>
        </PersonalTitle>

        <CardContent className="mt-5">
          <Table className="text-right text-[12px]">
            <TableHeader className="text-[14px] text-center">
              <TableRow className="h-[53px] bg-primary-foreground cursor-default">
                <TableHead className="p-2 w-[185px]">협상적용 년월</TableHead>
                <TableHead className="p-2 w-[210px]">기본연봉</TableHead>
                <TableHead className="p-2 w-[150px]">기본급여</TableHead>
                <TableHead className="p-2 w-[150px]">인상율</TableHead>
                <TableHead className="p-2">삭제</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isEditMode && (
                <TableRow className="cursor-pointer h-[53px] border-none">
                  <TableCell className="text-center flex items-center gap-1">
                    <Input
                      type="text"
                      {...register(`memberSalary.data.year`, {
                        required: "년도를 입력해주세요",
                        pattern: { value: /^\d{4}$/, message: "네자리 숫자의 년도를 입력해주세요. 예) 2024년" },
                      })}
                    />
                    년
                    <Input
                      type="text"
                      {...register(`memberSalary.data.month`, {
                        required: "월을 입력해주세요",
                        pattern: { value: /^\d{2}$/, message: "두자리 숫자의 월을 입력해주세요. 예) 01월" },
                      })}
                    />
                    월
                  </TableCell>

                  <TableCell>
                    <Input
                      type="number"
                      {...register(`memberSalary.data.wage`, { valueAsNumber: true })}
                      className="text-right"
                    />
                  </TableCell>
                  <TableCell>
                    <span>{wageWatch / 12}</span>
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell className="flex items-center justify-center">
                    <Button type="submit">등록</Button>
                  </TableCell>
                </TableRow>
              )}

              {isEditMode && (
                <TableRow className="text-left">
                  <TableCell colSpan={5} className="py-0">
                    <ErrorMessage
                      errors={errors}
                      name="memberSalary.data.year"
                      render={({ message }) => <p className="text-destructive font-bold">{message}</p>}
                    />

                    <ErrorMessage
                      errors={errors}
                      name="memberSalary.data.month"
                      render={({ message }) => <p className="text-destructive font-bold">{message}</p>}
                    />
                  </TableCell>
                </TableRow>
              )}

              {memberSalaryPersonalData?.data.map((item, index) => {
                const raiseRate =
                  index < memberSalaryPersonalData.data.length - 1
                    ? item.salary - memberSalaryPersonalData.data[index + 1]?.salary
                    : "";

                return (
                  <TableRow key={index} className="cursor-pointer h-[53px]">
                    <TableCell className="text-center">
                      {item.year}년 {item.month}월
                    </TableCell>
                    <TableCell>{item.wage.toLocaleString()}원</TableCell>
                    <TableCell>{item.salary.toLocaleString()}원</TableCell>

                    <TableCell className="flex items-center justify-center h-[73px]">
                      {raiseRate !== "" && raiseRate > 0 && (
                        <>
                          <ArrowBigUpDashIcon className="text-[#ff0000]" />
                          {raiseRate.toLocaleString()}원
                        </>
                      )}
                      {raiseRate !== "" && raiseRate < 0 && (
                        <>
                          <ArrowBigDownDash className="text-[#0000ff]" />
                          {raiseRate.toLocaleString()}원
                        </>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        type="button"
                        className="button text-center"
                        onClick={() => deleteData(item.year, item.month)}>
                        삭제
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </form>
  );
};

export default Select;
