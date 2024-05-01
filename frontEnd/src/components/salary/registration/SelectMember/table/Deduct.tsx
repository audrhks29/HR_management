import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { UseFormGetValues, UseFormRegister, UseFormSetValue } from "react-hook-form";

const Deduct = ({ register }: { register: UseFormRegister<SalaryRegistrationFormTypes> }) => {
  return (
    <Table className="mt-3">
      <TableBody>
        <TableRow className="bg-muted/50">
          <TableHead rowSpan={2} className="w-[100px] bg-card border">
            공제내역
          </TableHead>
          <TableHead>국민연금</TableHead>
          <TableHead>근로소득세</TableHead>
          <TableHead>지방소득세</TableHead>
          <TableHead>건강보험</TableHead>
          <TableHead>요양보험</TableHead>
          <TableHead>고용보험</TableHead>
        </TableRow>

        <TableRow className="text-center hover:bg-card">
          <TableCell className="p-2">
            <Input
              className="text-right"
              type="number"
              id={`salary.salary.tax.national_pension`}
              {...register(`salary.salary.tax.national_pension`, { valueAsNumber: true })}
            />
          </TableCell>
          <TableCell className="p-2">
            <Input
              className="text-right"
              type="number"
              id={`salary.salary.tax.income_tax`}
              {...register(`salary.salary.tax.income_tax`, { valueAsNumber: true })}
            />
          </TableCell>
          <TableCell className="p-2">
            <Input
              className="text-right"
              type="number"
              id={`salary.salary.tax.resident_tax`}
              {...register(`salary.salary.tax.resident_tax`, { valueAsNumber: true })}
            />
          </TableCell>
          <TableCell className="p-2">
            <Input
              className="text-right"
              type="number"
              id={`salary.salary.tax.health_tax`}
              {...register(`salary.salary.tax.health_tax`, { valueAsNumber: true })}
            />
          </TableCell>
          <TableCell className="p-2">
            <Input
              className="text-right"
              type="number"
              id={`salary.salary.tax.long_term_care_insurance`}
              {...register(`salary.salary.tax.long_term_care_insurance`, { valueAsNumber: true })}
            />
          </TableCell>
          <TableCell className="p-2">
            <Input
              className="text-right"
              type="number"
              id={`salary.salary.tax.employment_insurance`}
              {...register(`salary.salary.tax.employment_insurance`, { valueAsNumber: true })}
            />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default Deduct;
