import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { UseFormGetValues, UseFormRegister } from "react-hook-form";

const Salary = ({
  register,
  getValues,
}: {
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
          <TableCell className="p-2">{getValues(`salary.salary.salary`)?.toLocaleString()}원</TableCell>

          <TableCell className="p-2">{getValues(`salary.salary.job_allowance`)?.toLocaleString()}원</TableCell>

          <TableCell className="p-2">{getValues(`salary.salary.overtime_pay`)?.toLocaleString()}원</TableCell>

          <TableCell className="p-2">
            <Input
              className="text-right"
              type="number"
              id="salary.bonus"
              {...register(`salary.salary.bonus`, { valueAsNumber: true })}
            />
          </TableCell>
        </TableRow>

        <TableRow className="bg-muted/50">
          <TableHead className="p-2">휴일근로수당</TableHead>
          <TableHead className="p-2">야간근로수당</TableHead>
          <TableHead className="p-2">연차수당</TableHead>
          <TableHead className="p-2">식대</TableHead>
        </TableRow>

        <TableRow className="text-center hover:bg-card">
          <TableCell className="p-2">
            {getValues(`salary.salary.saturday_work_allowance`)?.toLocaleString()}원
          </TableCell>
          <TableCell className="p-2">{getValues(`salary.salary.night_work_allowance`)?.toLocaleString()}원</TableCell>
          <TableCell className="p-2">
            <Input
              type="number"
              className="h-9 text-right"
              id="salary.annual_leave_allowance"
              {...register(`salary.salary.annual_leave_allowance`, { valueAsNumber: true })}
            />
          </TableCell>
          <TableCell className="p-2">
            <Input
              type="number"
              className="h-9 text-right"
              id="salary.meals"
              {...register(`salary.salary.meals`, { valueAsNumber: true })}
            />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default Salary;
