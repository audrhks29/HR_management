import React, { memo, useEffect, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { useParams } from "react-router-dom";
import PersonalTitle from "@/shared/PersonalTitle";

const Select = memo(
  ({ personalData, salaryData }: { personalData: MemberDataTypes; salaryData: SalaryDataTypes[] }) => {
    const [data, setData] = useState<SalaryDataTypes | null>(null);
    const [isOpenDetailYear, setIsOpenDetailYear] = useState<number[]>([]);

    const { employee_number } = useParams();

    const handleClickRow = (year: number) => {
      isOpenDetailYear.includes(year)
        ? setIsOpenDetailYear(isOpenDetailYear.filter(item => item !== year))
        : setIsOpenDetailYear([...isOpenDetailYear, year]);
    };

    const handleClickMonthRow = (employeeNumber: string, year: number, month: number) => {
      window.electronAPI.openSalaryPersonalWindow(`${employeeNumber}/${year}/${month}`);
    };

    useEffect(() => {
      const foundData = salaryData.find(item => item.employee_number === employee_number);
      foundData ? setData(foundData) : setData(null);
    }, [employee_number, salaryData]);

    return (
      <Card className="h-[850px] p-8 overflow-y-auto">
        <PersonalTitle personalData={personalData} />
        <CardContent className="mt-5">
          <Table className="text-right text-[12px]">
            <TableHeader className="text-[14px] text-center">
              <TableRow className="h-[53px] hover:bg-muted cursor-default">
                <TableHead className="p-2 w-[72px]">년도</TableHead>
                <TableHead className="p-2 w-[100px]">연장근로수당</TableHead>
                <TableHead className="p-2 w-[100px]">배당금</TableHead>
                <TableHead className="p-2 w-[100px]">토요근로수당</TableHead>
                <TableHead className="p-2 w-[100px]">야간근로수당</TableHead>
                <TableHead className="p-2 w-[100px]">연차수당</TableHead>
                <TableHead className="p-2 w-[80px]">식대</TableHead>
                <TableHead className="p-2">급여</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data?.data.map((salaryData, index) => {
                const overTimePaySum = salaryData.salary.reduce((acc, cur) => {
                  return acc + cur.overtime_pay;
                }, 0);

                const bonusSum = salaryData.salary.reduce((acc, cur) => {
                  return acc + cur.bonus;
                }, 0);

                const saturdaySum = salaryData.salary.reduce((acc, cur) => {
                  return acc + cur.saturday_work_allowance;
                }, 0);

                const nightSum = salaryData.salary.reduce((acc, cur) => {
                  return acc + cur.night_work_allowance;
                }, 0);

                const AnnualLeaveSum = salaryData.salary.reduce((acc, cur) => {
                  return acc + cur.annual_leave_allowance;
                }, 0);

                const mealsSum = salaryData.salary.reduce((acc, cur) => {
                  return acc + cur.meals;
                }, 0);

                const salarySum = salaryData.salary.reduce((acc, cur) => {
                  return acc + cur.salary;
                }, 0);

                const isOpen = isOpenDetailYear.includes(salaryData.year);

                return (
                  <React.Fragment key={index}>
                    <TableRow
                      className="cursor-pointer h-[53px] bg-primary-foreground"
                      onClick={() => handleClickRow(salaryData.year)}>
                      <TableCell className="p-2 text-center">{salaryData.year}년</TableCell>
                      <TableCell className="p-2">{overTimePaySum.toLocaleString()}원</TableCell>
                      <TableCell className="p-2">{bonusSum.toLocaleString()}원</TableCell>
                      <TableCell className="p-2">{saturdaySum.toLocaleString()}원</TableCell>
                      <TableCell className="p-2">{nightSum.toLocaleString()}원</TableCell>
                      <TableCell className="p-2">{AnnualLeaveSum.toLocaleString()}원</TableCell>
                      <TableCell className="p-2">{mealsSum.toLocaleString()}원</TableCell>
                      <TableCell className="p-2">{salarySum.toLocaleString()}원</TableCell>
                    </TableRow>

                    {isOpen &&
                      salaryData.salary.map(salary => (
                        <TableRow
                          className="cursor-pointer h-[53px]"
                          key={salary.month}
                          onClick={() => handleClickMonthRow(data.employee_number, salaryData.year, salary.month)}>
                          <TableCell className="p-2 text-center">{salary.month}월</TableCell>
                          <TableCell className="p-2">{salary.overtime_pay.toLocaleString()}원</TableCell>
                          <TableCell className="p-2">{salary.bonus.toLocaleString()}원</TableCell>
                          <TableCell className="p-2">{salary.saturday_work_allowance.toLocaleString()}원</TableCell>
                          <TableCell className="p-2">{salary.night_work_allowance.toLocaleString()}원</TableCell>
                          <TableCell className="p-2">{salary.annual_leave_allowance.toLocaleString()}원</TableCell>
                          <TableCell className="p-2">{salary.meals.toLocaleString()}원</TableCell>
                          <TableCell className="p-2">{salary.salary.toLocaleString()}원</TableCell>
                        </TableRow>
                      ))}
                  </React.Fragment>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  },
);

export default Select;
