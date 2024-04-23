import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { UseFormGetValues, UseFormRegister } from "react-hook-form";

const Salary = ({
  employeeMonthAttitude,
  register,
  getValues,
}: {
  employeeMonthAttitude: AttitudeDataTypes | undefined;
  register: UseFormRegister<SalaryRegistrationFormTypes>;
  getValues: UseFormGetValues<SalaryRegistrationFormTypes>;
}) => {
  return (
    <Table className="mt-3 border">
      <TableBody className="text-center">
        <TableRow className="bg-muted/50">
          <TableHead rowSpan={4} className="w-[100px] bg-card border-r">
            급여내역
          </TableHead>
          <TableHead className="p-2">기본급</TableHead>
          <TableHead className="p-2 w-[160px]">직무수당</TableHead>
          <TableHead className="p-2 w-[160px]">연장근로수당</TableHead>
          <TableHead className="p-2 w-[160px]">성과금</TableHead>
        </TableRow>

        <TableRow className="text-center hover:bg-card">
          <TableCell className="p-2">{getValues("salary.salary")?.toLocaleString()}원</TableCell>

          {/* !직무수당 - 설정해야함! */}
          <TableCell className="p-2">0</TableCell>

          <TableCell className="p-2">{getValues("salary.overtime_pay")?.toLocaleString()}원</TableCell>

          <TableCell className="p-2">
            <Input id="salary.bonus" {...register("salary.bonus")} />
          </TableCell>
        </TableRow>

        <TableRow className="bg-muted/50">
          <TableHead className="p-2">휴일근로수당</TableHead>
          <TableHead className="p-2">야간근로수당</TableHead>
          <TableHead className="p-2">연차수당</TableHead>
          <TableHead className="p-2">식대</TableHead>
        </TableRow>

        <TableRow className="text-center hover:bg-card">
          <TableCell className="p-2">{getValues("salary.saturday_work_allowance")?.toLocaleString()}원</TableCell>
          <TableCell className="p-2">{getValues("salary.night_work_allowance")?.toLocaleString()}원</TableCell>
          <TableCell className="p-2">
            <Input
              type="text"
              className="h-9"
              id="salary.annual_leave_allowance"
              {...register("salary.annual_leave_allowance")}
            />
          </TableCell>
          <TableCell className="p-2">
            <Input type="text" className="h-9" id="salary.meals" {...register("salary.meals")} />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default Salary;
