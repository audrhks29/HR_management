import { memo } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const EducationTable = memo(({ formData }: { formData: MemberDataTypes }) => {
  return (
    <Table className="mt-3 text-center">
      <TableHeader>
        <TableRow>
          <TableHead>회사명</TableHead>
          <TableHead>입사일</TableHead>
          <TableHead>퇴사일</TableHead>
          <TableHead>직무</TableHead>
          <TableHead>근무부서</TableHead>
          <TableHead>직급</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {formData.edu.map((item, index) => (
          <TableRow key={index}>
            <TableCell className="p-2">{item.school_classification}</TableCell>
            <TableCell className="p-2">{item.school_name}</TableCell>
            <TableCell className="p-2">{item.collage}</TableCell>
            <TableCell className="p-2">{item.graduation_status}</TableCell>
            <TableCell className="p-2">{item.admission_date}</TableCell>
            <TableCell className="p-2">{item.graduation_date}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
});

export default EducationTable;
