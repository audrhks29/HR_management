import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { UseFormGetValues, UseFormRegister, UseFormSetValue } from "react-hook-form";

const Deduct = ({
  register,
}: {
  personalMemberSalaryData: MemberSalaryDataTypes;
  setValue: UseFormSetValue<SalaryRegistrationFormTypes>;
  getValues: UseFormGetValues<SalaryRegistrationFormTypes>;
  register: UseFormRegister<SalaryRegistrationFormTypes>;
}) => {
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
          <TableCell>
            <Input id={"salary.tax.national_pension"} {...register("salary.tax.national_pension")} />
          </TableCell>
          <TableCell>
            <Input id={"salary.tax.income_tax"} {...register("salary.tax.income_tax")} />
          </TableCell>
          <TableCell>
            <Input id={"salary.tax.resident_tax"} {...register("salary.tax.resident_tax")} />
          </TableCell>
          <TableCell>
            <Input id={"salary.tax.health_tax"} {...register("salary.tax.health_tax")} />
          </TableCell>
          <TableCell>
            <Input id={"salary.tax.long_term_care_insurance"} {...register("salary.tax.long_term_care_insurance")} />
          </TableCell>
          <TableCell>
            <Input id={"salary.tax.employment_insurance"} {...register("salary.tax.employment_insurance")} />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default Deduct;
