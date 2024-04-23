import { memo, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";

import { useParams } from "react-router-dom";
import PersonalTitle from "@/shared/PersonalTitle";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import MonthPicker from "@/shared/MonthPicker";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Attitude from "./table/Attitude";
import Total from "./table/Total";
import Salary from "./table/Salary";
import Deduct from "./table/Deduct";

interface FormValues {
  year: string;
  salary: SalaryPersonalDataTypes;
}

const Select = memo(
  ({
    personalMemberData,
    personalSalaryData,
    personalAttitudeData,
    personalMemberSalaryData,
  }: {
    personalMemberData: MemberDataTypes;
    personalSalaryData: SalaryDataTypes[];
    personalAttitudeData: ExceptCommute;
    personalMemberSalaryData: MemberSalaryDataTypes;
  }) => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const todayDate = `${year}${month}${day}`;

    const { employee_number } = useParams();

    const [isMonthPicker, setIsMonthPicker] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState({
      year: year.toString(),
      month: month.toString(),
    });

    // console.log(personalSalaryData);
    // console.log(personalAttitudeData);
    const { register, handleSubmit, setValue } = useForm<FormValues>({
      defaultValues: {
        year: "2024",
        salary: {
          annual_leave_allowance: 0,
          bonus: 0,
          meals: 0,
          month: "03",
          night_work_allowance: 0,
          overtime_pay: 0,
          salary: 0,
          saturday_work_allowance: 0,
          tax: {
            employment_insurance: 0,
            health_tax: 0,
            income_tax: 0,
            long_term_care_insurance: 0,
            national_pension: 0,
            resident_tax: 0,
            year_end_tax_settlement: 0,
          },
        },
      },
    });

    const [totalSalary, setTotalSalary] = useState();

    const employeeMonthAttitude = personalAttitudeData.attitude.find(
      item => item.month === selectedMonth.year + selectedMonth.month,
    );

    return (
      <form>
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

            <Total />
            <Attitude data={employeeMonthAttitude} />
            <Salary personalMemberSalaryData={personalMemberSalaryData} employeeMonthAttitude={employeeMonthAttitude} />
            <Deduct personalMemberSalaryData={personalMemberSalaryData} />
            {/* <div className="space-y-2 flex items-center">
              <Label className="w-[100px]">기본급</Label>
              <Input type="text" id={`salary.bonus`} {...register(`salary.bonus`)} />
            </div>
            근무일	휴가일	결근일	연장근로시간	야간근로시간	휴일근로시간
            연장근로수당	배당금	토요근로수당	야간근로수당	연차수당	식대	급여
            <div className="space-y-2 flex items-center">
              <Label className="w-[100px]">dd</Label>
              <Input type="text" />
            </div> */}
          </CardContent>
        </Card>
      </form>
    );
  },
);

export default Select;
