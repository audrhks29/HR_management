import { UseFormWatch } from "react-hook-form";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Total = ({ watch }: { watch: UseFormWatch<SalaryRegistrationFormTypes> }) => {
  const total_salary = watch(`salary.salary.total_salary`);
  const total_tax = watch(`salary.salary.tax.total_tax`);
  const total_tax_except_tax = watch(`salary.salary.total_salary_except_tax`);

  return (
    <Table className="border">
      <TableHeader>
        <TableRow className="bg-muted/50">
          <TableHead>지급합계</TableHead>
          <TableHead>공제합계</TableHead>
          <TableHead>실수령액</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <TableRow className="text-center hover:bg-card">
          <TableCell>{total_salary?.toLocaleString()}원</TableCell>
          <TableCell>{total_tax?.toLocaleString()}원</TableCell>
          <TableCell>{total_tax_except_tax?.toLocaleString()}원</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default Total;
