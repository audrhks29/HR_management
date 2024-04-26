import { memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import PersonalTitle from "@/shared/PersonalTitle";
import MonthPicker from "@/shared/MonthPicker";

import Attitude from "./table/Attitude";
import Total from "./table/Total";
import Salary from "./table/Salary";
import Deduct from "./table/Deduct";

import { calculateDefaultFormValues } from "../function/calculateDefaultFormValues";
import useDateStore from "@/store/date-store";

const Select = memo(
  ({
    personalMemberData,
    personalSalaryData,
    personalAttitudeData,
    personalMemberSalaryData,
  }: {
    personalMemberData: MemberDataTypes;
    personalSalaryData: SalaryDataTypes;
    personalAttitudeData: ExceptCommute;
    personalMemberSalaryData: MemberSalaryDataTypes;
  }) => {
    const { year, month } = useDateStore();

    const { employee_number } = useParams();
    // console.log(employee_number);
    const [isMonthPicker, setIsMonthPicker] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState({
      year: year.toString(),
      month: month.toString(),
    });

    const employeeMonthAttitude = personalAttitudeData?.attitude.find(
      item => item.month === selectedMonth.year + selectedMonth.month,
    );

    // const personalYearSalaryData = personalSalaryData?.data.find(item => item.year === selectedMonth.year);

    // const personalMonthSalaryData = personalYearSalaryData?.salary.find(item => item.month);

    const hourSalary = Math.round(personalMemberSalaryData?.wage / 12 / 209);

    const defaultFormValues = calculateDefaultFormValues(
      selectedMonth,
      employeeMonthAttitude,
      hourSalary,
      personalMemberSalaryData,
    );

    useEffect(() => {
      reset({ ...defaultFormValues });
    }, [employee_number]);

    const { register, handleSubmit, setValue, getValues, reset } = useForm<SalaryRegistrationFormTypes>({
      defaultValues: defaultFormValues,
    });

    const onsubmit = (data: SalaryRegistrationFormTypes) => {
      console.log(data);
    };

    // console.log(defaultFormValues);
    return (
      <form onSubmit={handleSubmit(onsubmit)}>
        <Card className="h-[850px] p-8 overflow-y-auto relative ">
          <PersonalTitle personalData={personalMemberData} />
          <CardContent className="py-8">
            <MonthPicker
              isMonthPicker={isMonthPicker}
              setIsMonthPicker={setIsMonthPicker}
              selectedMonth={selectedMonth}
              setSelectedMonth={setSelectedMonth}
              className="mt-4"
            />

            <Total getValues={getValues} />

            <Attitude data={employeeMonthAttitude} />

            <Salary employeeMonthAttitude={employeeMonthAttitude} register={register} getValues={getValues} />

            <Deduct
              personalMemberSalaryData={personalMemberSalaryData}
              register={register}
              getValues={getValues}
              setValue={setValue}
            />

            <Button type="submit">전송</Button>
          </CardContent>
        </Card>
      </form>
    );
  },
);

export default Select;
