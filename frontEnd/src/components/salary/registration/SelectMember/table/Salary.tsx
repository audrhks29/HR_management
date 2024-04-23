import { memo } from "react";

import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";

const Salary = memo(
  ({
    personalMemberSalaryData,
    employeeMonthAttitude,
  }: {
    personalMemberSalaryData: MemberSalaryDataTypes;
    employeeMonthAttitude: AttitudeDataTypes | undefined;
  }) => {
    return (
      <Table className="mt-3 border">
        <TableBody className="text-center">
          <TableRow className="bg-muted/50">
            <TableHead rowSpan={4} className="w-[100px] bg-card border-r">
              급여내역
            </TableHead>
            <TableHead className="p-2">기본급</TableHead>
            <TableHead className="p-2">직무수당</TableHead>
            <TableHead className="p-2">연장근로수당</TableHead>
            <TableHead className="p-2">성과금</TableHead>
          </TableRow>

          <TableRow className="text-center hover:bg-card">
            <TableCell className="p-2">{(personalMemberSalaryData.wage / 12).toLocaleString()}</TableCell>
            {/* !직무수당 - 설정해야함! */}
            <TableCell className="p-2">0</TableCell>
            <TableCell className="p-2">{employeeMonthAttitude?.overtime_count}</TableCell>
            <TableCell className="p-2">
              <Input className="h-9" />
            </TableCell>
          </TableRow>

          <TableRow className="bg-muted/50">
            <TableHead className="p-2">휴일근로시간</TableHead>
            <TableHead className="p-2">야간근로수당</TableHead>
            <TableHead className="p-2">연차수당</TableHead>
            <TableHead className="p-2">식대</TableHead>
          </TableRow>

          <TableRow className="text-center hover:bg-card">
            <TableCell className="p-2">{employeeMonthAttitude?.holiday_work_count}</TableCell>
            <TableCell className="p-2">{employeeMonthAttitude?.night_work_count}</TableCell>
            <TableCell className="p-2">
              <Input className="h-9" />
            </TableCell>
            <TableCell className="p-2">
              <Input className="h-9" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  },
);

export default Salary;
