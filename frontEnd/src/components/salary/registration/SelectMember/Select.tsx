import { useEffect, useLayoutEffect, useState } from "react";
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

const Select = ({
  personalMemberData,
  personalAttitudeData,
  memberSalaryPersonalData,
}: {
  personalMemberData: MemberDataTypes;
  personalSalaryData: SalaryDataTypes;
  personalAttitudeData: ExceptCommute;
  memberSalaryPersonalData: MemberSalaryDataTypes;
}) => {
  const { year, month } = useDateStore();

  const [isMonthPicker, setIsMonthPicker] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState({
    year: year.toString(),
    month: month.toString(),
  });

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
  }, [memberSalaryPersonalData]);

  useEffect(() => {
    // 시간 당 급여
    const hourSalary = Math.round(memberSalaryPersonalData?.data[0].wage / 12 / 209);

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
    const salary_value = memberSalaryPersonalData?.data[0] ? memberSalaryPersonalData.data[0].wage / 12 : 0;
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

    // console.log(getValues(`salary.salary.total_salary`));
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

  const onsubmit = (data: SalaryRegistrationFormTypes) => {
    console.log(data);
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

            <Total watch={watch} />

            <Attitude data={employeeMonthAttitude} />

            <Salary register={register} getValues={getValues} />

            <Deduct register={register} />

            <Button type="submit">전송</Button>
          </CardContent>
        </ScrollArea>
      </Card>
    </form>
  );
};

export default Select;
