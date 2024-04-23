import { memo } from "react";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Total = memo(() => {
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
          <TableCell>INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
});

export default Total;
