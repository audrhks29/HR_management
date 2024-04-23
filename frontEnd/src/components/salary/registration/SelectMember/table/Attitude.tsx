import { memo } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table";

const Attitude = memo(({ data }: { data: AttitudeDataTypes | undefined }) => {
  return (
    <Table className="mt-3 border">
      <TableBody>
        <TableRow className="bg-muted/50">
          <TableHead rowSpan={2} className="w-[100px] bg-card border-r">
            근태내역
          </TableHead>
          <TableHead>근무일수</TableHead>
          <TableHead>연차일수</TableHead>
          <TableHead>결근일수</TableHead>
          <TableHead>
            연장
            <br />
            근로시간
          </TableHead>
          <TableHead>
            야간
            <br />
            근로시간
          </TableHead>
          <TableHead>
            휴일
            <br />
            근로시간
          </TableHead>
        </TableRow>

        <TableRow className="text-center hover:bg-card">
          <TableCell>{data?.working_count}</TableCell>
          <TableCell>{data?.annual_leave_count}</TableCell>
          <TableCell>{data?.truancy_count}</TableCell>
          <TableCell>{data?.overtime_count}</TableCell>
          <TableCell>{data?.night_work_count}</TableCell>
          <TableCell>{data?.holiday_work_count}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
});

export default Attitude;
