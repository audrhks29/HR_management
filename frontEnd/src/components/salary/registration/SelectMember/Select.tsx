import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import PersonalTitle from "@/shared/PersonalTitle";
import MonthPicker from "@/shared/MonthPicker";

import Attitude from "./table/Attitude";
import Total from "./table/Total";
import Salary from "./table/Salary";
import Deduct from "./table/Deduct";

import useDateStore from "@/store/date-store";
import { ScrollArea } from "@/components/ui/scroll-area";
import { postSalaryData } from "@/server/fetchCreateData";
import { useNavigate, useParams } from "react-router-dom";
import CustomConfirm from "@/shared/alert/CustomConfirm";
import { waitForUserConfirmation } from "@/shared/alert/function/waitForUserConfirmation";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";

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
  const [isMonthPicker, setIsMonthPicker] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState({
    year: year.toString(),
    month: month.toString(),
  });
  const [confirmState, setConfirmState] = useState<{ popup: boolean; confirmResult: boolean | undefined }>({
    popup: false,
    confirmResult: undefined,
  });

  const showPopup = () => {
    setConfirmState({ popup: true, confirmResult: undefined });
  };

  const navigate = useNavigate();

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

  // 근태기록
  const employeeMonthAttitude = personalAttitudeData?.attitude.find(
    item => item.month === selectedMonth.year + selectedMonth.month,
  );

  const selectedDate = new Date(`${selectedMonth.year}-${selectedMonth.month}`).getTime();

  const selectedSalary = memberSalaryPersonalData?.data
    .map(item => {
      const dataDate = new Date(`${item.year}-${item.month}`).getTime();
      if (selectedDate >= dataDate) {
        return item;
      }
    })
    .filter(item => item !== undefined);

  useEffect(() => {
    reset();
  }, [memberSalaryPersonalData, selectedMonth]);

  useEffect(() => {
    // 날짜 설정
    setValue(`salary.year`, selectedMonth.year);
    setValue(`salary.salary.month`, selectedMonth.month);

    // 시간 당 급여
    const hourSalary = selectedSalary && selectedSalary[0] ? Math.round(selectedSalary[0]?.wage / 12 / 209) : 0;

    // ------ 수당 ------
    // 야간 근로 수당
    const night_work_allowance_value = employeeMonthAttitude
      ? Math.round(employeeMonthAttitude?.night_work_count * 0.5 * hourSalary)
      : 0;
    setValue(`salary.salary.night_work_allowance`, night_work_allowance_value);

    // 추가 근무 수당
    const overtime_pay_value = employeeMonthAttitude
      ? Math.ceil(employeeMonthAttitude.overtime_count * 0.5 * hourSalary)
      : 0;
    setValue(`salary.salary.overtime_pay`, overtime_pay_value);

    // 기본급
    const salary_value = selectedSalary && selectedSalary[0] ? selectedSalary[0]?.wage / 12 : 0;
    setValue(`salary.salary.salary`, salary_value);

    // 휴일 근로 수당
    const saturday_work_allowance_value = employeeMonthAttitude
      ? Math.ceil(employeeMonthAttitude.holiday_work_count * 0.5 * hourSalary)
      : 0;
    setValue(`salary.salary.saturday_work_allowance`, saturday_work_allowance_value);

    // 성과금
    const bonus_value = getValues(`salary.salary.bonus`);
    // 직무 수당
    const job_allowance_value = getValues(`salary.salary.job_allowance`);
    // 연차 수당
    const annual_leave_allowance = getValues(`salary.salary.annual_leave_allowance`);
    // 식대
    const meals_value = getValues(`salary.salary.meals`);
    // 총 급여
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

    // 식대 제외 총 급여
    const total_salary_except_meals = total_salary_value - meals_value;

    // ------ 공제액 ------
    // 고용보험
    const employment_insurance_input = getValues("salary.salary.tax.employment_insurance");
    const employment_insurance_value =
      employment_insurance_input !== 0 ? employment_insurance_input : Math.round(total_salary_except_meals * 0.09);
    setValue("salary.salary.tax.employment_insurance", employment_insurance_value);

    // 건강보험
    const health_tax_input = getValues("salary.salary.tax.health_tax");
    const health_tax_value =
      health_tax_input !== 0 ? health_tax_input : Math.round(total_salary_except_meals * 0.03545);
    setValue("salary.salary.tax.health_tax", health_tax_value);

    // 요양보험
    const long_term_care_insurance_input = getValues("salary.salary.tax.long_term_care_insurance");
    const long_term_care_insurance_value =
      long_term_care_insurance_input !== 0 ? long_term_care_insurance_input : Math.round(health_tax_value * 0.1295);
    setValue("salary.salary.tax.long_term_care_insurance", long_term_care_insurance_value);

    // 소득세
    const income_tax_input = getValues("salary.salary.tax.income_tax");
    const income_tax_value = income_tax_input !== 0 ? income_tax_input : Math.round(total_salary_except_meals * 0.1);
    setValue("salary.salary.tax.income_tax", income_tax_value);

    // 지방소득세
    const resident_tax_input = getValues("salary.salary.tax.resident_tax");
    const resident_tax_value = resident_tax_input !== 0 ? resident_tax_input : Math.round(income_tax_value * 0.1);
    setValue("salary.salary.tax.resident_tax", resident_tax_value);

    // 국민연금
    const national_pension_input = getValues("salary.salary.tax.national_pension");
    const national_pension_value =
      national_pension_input !== 0 ? national_pension_input : Math.round(total_salary_except_meals * 0.045);
    setValue("salary.salary.tax.national_pension", national_pension_value);

    // 세금합계
    const total_tax_value =
      employment_insurance_value +
      health_tax_value +
      long_term_care_insurance_value +
      income_tax_value +
      resident_tax_value +
      national_pension_value;
    setValue(`salary.salary.tax.total_tax`, total_tax_value);

    // 실수령액
    const total_salary_except_tax_value = total_salary_value - total_tax_value;
    setValue(`salary.salary.total_salary_except_tax`, total_salary_except_tax_value);
  }, [
    memberSalaryPersonalData,
    selectedMonth,
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
    showPopup();
    const confirm = await waitForUserConfirmation(confirmState);
    if (confirm) {
      await postSalaryData(data, employee_number, selectedMonth.year, selectedMonth.month);
      setConfirmState({ popup: false, confirmResult: undefined });
      await refetch();
      reset();
    }
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
              <>
                <Total watch={watch} />
                <Attitude data={employeeMonthAttitude} />
                <Salary register={register} getValues={getValues} />
                <Deduct register={register} />
              </>
            ) : (
              <div className="text-center">
                <div>
                  {selectedMonth.year}년 {selectedMonth.month}월의 데이터가 이미 등록되어있습니다.
                </div>
                <Button type="button" className="mt-3" onClick={() => navigate(`/salary_edit/${employee_number}`)}>
                  수정하기
                </Button>
              </div>
            )}

            <div className="text-right mt-3">{!isData && <Button type="submit">등록</Button>}</div>
          </CardContent>
        </ScrollArea>
      </Card>
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
