import { memo, useEffect, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import PersonalTitle from "@/shared/PersonalTitle";
import { ArrowBigDownDash, ArrowBigUpDashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { ErrorMessage } from "@hookform/error-message";
import { postMemberSalaryPersonalData } from "@/server/fetchCreateData";
import { useParams } from "react-router-dom";

import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import CustomConfirm from "@/shared/alert/CustomConfirm";
import { waitForUserConfirmation } from "@/shared/alert/function/waitForUserConfirmation";
import { deleteMemberSalaryData } from "@/server/fetchDeleteData";
import CustomAlert from "@/shared/alert/CustomAlert";

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
  const [confirmState, setConfirmState] = useState<{ popup: boolean; confirmResult: boolean | undefined }>({
    popup: false,
    confirmResult: undefined,
  });

  const [alertState, setAlertState] = useState(false);

  const showPopup = () => {
    setConfirmState({ popup: true, confirmResult: undefined });
  };

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
    showPopup();
    const confirm = await waitForUserConfirmation(confirmState);
    if (confirm) {
      await postMemberSalaryPersonalData(data, employee_number);
      setConfirmState({ popup: false, confirmResult: undefined });
      setIsEditMode(false);
      await refetch();
      reset();
    }
  };

  const onDelete = async (year: string, month: string) => {
    await deleteMemberSalaryData(employee_number, year, month);
    setAlertState(true);
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
                        onClick={() => onDelete(item.year, item.month)}>
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
      <CustomAlert
        alertState={alertState}
        setAlertState={setAlertState}
        title="삭제 완료"
        text="데이터가 삭제되었습니다."
      />
      <CustomConfirm
        confirmState={confirmState}
        setConfirmState={setConfirmState}
        title="급여 현황 등록"
        text="급여 현황을 등록하시겠습니까?"
      />
    </form>
  );
};

export default Select;
