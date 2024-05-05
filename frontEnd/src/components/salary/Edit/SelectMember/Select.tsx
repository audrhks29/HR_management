import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import PersonalTitle from "@/shared/PersonalTitle";
import MonthPicker from "@/shared/MonthPicker";

import Attitude from "./table/Attitude";
import Total from "./table/Total";
import Salary from "./table/Salary";
import Deduct from "./table/Deduct";

import useDateStore from "@/store/date-store";

import { useNavigate, useParams } from "react-router-dom";
import { updateSalaryData } from "@/server/fetchUpdateData";
import { deleteSalaryData } from "@/server/fetchDeleteData";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

const Select = ({
  personalMemberData,
  personalSalaryData,
  personalAttitudeData,
  memberSalaryPersonalData,
  refetch,
}: {
  personalMemberData: MemberDataTypes;
  personalSalaryData: SalaryDataTypes;
  personalAttitudeData: ExceptCommute;
  memberSalaryPersonalData: MemberSalaryDataTypes;
  refetch: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<SalaryDataTypes, unknown>>;
}) => {
  const { year, month } = useDateStore();
  const { employee_number } = useParams();
  const navigate = useNavigate();

  const [isMonthPicker, setIsMonthPicker] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState({
    year: year.toString(),
    month: month.toString(),
  });

  const { toast } = useToast();

  const isData = personalSalaryData?.data
    .find(item => item.year === selectedMonth.year)
    ?.salary.find(item => item.month === selectedMonth.month);

  const { register, handleSubmit, setValue, getValues, reset, watch } = useForm<SalaryRegistrationFormTypes>({
    defaultValues: {
      salary: {
        year: selectedMonth.year,
        salary: {
          annual_leave_allowance: 0,
          bonus: 0,
          meals: 0,
          job_allowance: 0,
          month: selectedMonth.month,
          night_work_allowance: 0,
          overtime_pay: 0,
          salary: 0,
          saturday_work_allowance: 0,
          total_salary: 0,
          total_salary_except_tax: 0,
          tax: {
            employment_insurance: 0,
            health_tax: 0,
            income_tax: 0,
            long_term_care_insurance: 0,
            national_pension: 0,
            resident_tax: 0,
            year_end_tax_settlement: 0,
            total_tax: 0,
          },
        },
      },
    },
  });

  const employeeMonthAttitude = personalAttitudeData?.attitude.find(
    item => item.month === selectedMonth.year + selectedMonth.month,
  );

  useEffect(() => {
    reset();
    // 날짜 설정
    if (isData) {
      setValue(`salary`, {
        year: selectedMonth.year,
        salary: {
          annual_leave_allowance: isData?.annual_leave_allowance,
          bonus: isData?.bonus,
          meals: isData?.meals,
          job_allowance: isData?.job_allowance,
          month: selectedMonth.month,
          night_work_allowance: isData?.night_work_allowance,
          overtime_pay: isData?.overtime_pay,
          salary: isData.salary,
          saturday_work_allowance: isData?.saturday_work_allowance,
          total_salary: isData?.total_salary,
          total_salary_except_tax: isData?.total_salary_except_tax,
          tax: {
            employment_insurance: isData?.tax?.employment_insurance,
            health_tax: isData?.tax?.health_tax,
            income_tax: isData?.tax?.income_tax,
            long_term_care_insurance: isData?.tax?.long_term_care_insurance,
            national_pension: isData?.tax?.national_pension,
            resident_tax: isData?.tax?.resident_tax,
            year_end_tax_settlement: isData?.tax?.year_end_tax_settlement,
            total_tax: isData?.tax?.total_tax,
          },
        },
      });
    }
  }, [memberSalaryPersonalData, selectedMonth]);

  useEffect(() => {
    const salary_value = getValues(`salary.salary.salary`);
    const night_work_allowance_value = getValues(`salary.salary.night_work_allowance`);
    const overtime_pay_value = getValues(`salary.salary.overtime_pay`);
    const saturday_work_allowance_value = getValues(`salary.salary.saturday_work_allowance`);
    const bonus_value = getValues(`salary.salary.bonus`);
    const job_allowance_value = getValues(`salary.salary.job_allowance`);
    const annual_leave_allowance = getValues(`salary.salary.annual_leave_allowance`);
    const meals_value = getValues(`salary.salary.meals`);

    const total_salary_value =
      salary_value +
      night_work_allowance_value +
      overtime_pay_value +
      saturday_work_allowance_value +
      bonus_value +
      job_allowance_value +
      annual_leave_allowance +
      meals_value;
    setValue(`salary.salary.total_salary`, total_salary_value);

    const employment_insurance_value = getValues(`salary.salary.tax.employment_insurance`);
    const health_tax_value = getValues(`salary.salary.tax.health_tax`);
    const long_term_care_insurance_value = getValues(`salary.salary.tax.long_term_care_insurance`);
    const income_tax_value = getValues(`salary.salary.tax.income_tax`);
    const resident_tax_value = getValues(`salary.salary.tax.resident_tax`);
    const national_pension_value = getValues(`salary.salary.tax.national_pension`);

    const total_tax_value =
      employment_insurance_value +
      health_tax_value +
      long_term_care_insurance_value +
      income_tax_value +
      resident_tax_value +
      national_pension_value;
    setValue(`salary.salary.tax.total_tax`, total_tax_value);

    const total_salary_except_tax_value = total_salary_value - total_tax_value;
    setValue(`salary.salary.total_salary_except_tax`, total_salary_except_tax_value);
  }, [
    watch(`salary.salary.bonus`),
    watch(`salary.salary.annual_leave_allowance`),
    watch(`salary.salary.meals`),
    watch(`salary.salary.tax.employment_insurance`),
    watch(`salary.salary.tax.health_tax`),
    watch(`salary.salary.tax.long_term_care_insurance`),
    watch(`salary.salary.tax.income_tax`),
    watch(`salary.salary.tax.resident_tax`),
    watch(`salary.salary.tax.national_pension`),
  ]);

  const onsubmit = async (data: SalaryRegistrationFormTypes) => {
    toast({
      title: "급여대장 수정",
      description: "급여대장을 수정하시겠습니까?",
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

  const submitData = async (data: SalaryRegistrationFormTypes) => {
    await updateSalaryData(data, employee_number, selectedMonth.year, selectedMonth.month);
    toast({
      description: "완료되었습니다",
    });
    await refetch();
  };

  const onDelete = async () => {
    toast({
      variant: "destructive",
      title: "급여 대장 삭제",
      description: "급여 대장을 삭제하시겠습니까?",
      action: (
        <>
          <ToastAction
            className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            onClick={deleteData}
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

  const deleteData = async () => {
    await deleteSalaryData(employee_number, selectedMonth.year, selectedMonth.month);
    toast({
      description: "삭제되었습니다",
    });
    refetch();
  };

  return (
    <form onSubmit={handleSubmit(onsubmit)}>
      <Card>
        <ScrollArea className="h-[850px] p-8 overflow-y-auto relative ">
          <PersonalTitle personalData={personalMemberData} children={undefined} />
          <CardContent className="py-8">
            <MonthPicker
              isMonthPicker={isMonthPicker}
              setIsMonthPicker={setIsMonthPicker}
              selectedMonth={selectedMonth}
              setSelectedMonth={setSelectedMonth}
              className="mt-4"
            />
            {!isData ? (
              <div className="text-center">
                <div>
                  {selectedMonth.year}년 {selectedMonth.month}월의 데이터가 등록되어있지 않습니다
                </div>
                <Button
                  type="button"
                  className="mt-3"
                  onClick={() => navigate(`/salary_registration/${employee_number}`)}>
                  등록하기
                </Button>
              </div>
            ) : (
              <>
                <Total watch={watch} />
                <Attitude data={employeeMonthAttitude} />
                <Salary register={register} getValues={getValues} />
                <Deduct register={register} />
              </>
            )}

            {isData && (
              <div className="text-right mt-3">
                <Button type="submit" className="mr-3">
                  수정
                </Button>
                <Button type="button" onClick={onDelete}>
                  삭제
                </Button>
              </div>
            )}
          </CardContent>
        </ScrollArea>
      </Card>
    </form>
  );
};

export default Select;
