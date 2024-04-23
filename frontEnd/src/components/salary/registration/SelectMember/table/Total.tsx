import { memo } from "react";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UseFormGetValues } from "react-hook-form";

const Total = ({ getValues }: { getValues: UseFormGetValues<SalaryRegistrationFormTypes> }) => {
  const total_salary = getValues("salary.total_salary");
  const total_tax = getValues("salary.tax.total_tax");

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
          <TableCell>{(total_salary - total_tax)?.toLocaleString()}원</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default Total;
