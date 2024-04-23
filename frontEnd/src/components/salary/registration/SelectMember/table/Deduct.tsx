import { memo } from "react";

import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";

const Deduct = memo(({ personalMemberSalaryData }: { personalMemberSalaryData: MemberSalaryDataTypes }) => {
  console.log(personalMemberSalaryData);
  return (
    <Table className="mt-3">
      <TableBody>
        <TableRow className="bg-muted/50">
          <TableHead rowSpan={2} className="w-[100px] bg-card border">
            공제내역
          </TableHead>
          <TableHead>근로소득세</TableHead>
          <TableHead>지방소득세</TableHead>
          <TableHead>건강보험</TableHead>
          <TableHead>요양보험</TableHead>
          <TableHead>성과금</TableHead>
          <TableHead>국민연금</TableHead>
          <TableHead>야간근로수당</TableHead>
        </TableRow>

        <TableRow className="text-center hover:bg-card">
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
});

export default Deduct;
