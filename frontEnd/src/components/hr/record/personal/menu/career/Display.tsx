import { memo } from "react";
import { CardContent, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
const Display = memo(({ personalData }: { personalData: MemberDataTypes | undefined }) => {
  return (
    <CardContent className="mt-5">
      <CardDescription className="text-[16px] mb-3">학력</CardDescription>
      <Table className="text-center border-b mb-5">
        <TableHeader className="bg-muted">
          <TableRow>
            <TableHead>구분</TableHead>
            <TableHead>학교명</TableHead>
            <TableHead>학과</TableHead>
            <TableHead>졸업여부</TableHead>
            <TableHead>입학일</TableHead>
            <TableHead>졸업일</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {personalData && personalData.edu.length > 0 ? (
            personalData?.edu.map((edu, index) => (
              <TableRow key={index} className="cursor-pointer">
                <TableCell>{edu.school_classification}</TableCell>
                <TableCell>{edu.school_name}</TableCell>
                <TableCell>{edu.collage}</TableCell>
                <TableCell>{edu.graduation_status}</TableCell>
                <TableCell>{edu.admission_date}</TableCell>
                <TableCell>{edu.graduation_date}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableCell colSpan={6}>데이터가 없습니다.</TableCell>
          )}
        </TableBody>
      </Table>

      <CardDescription className="text-[16px] mb-3">경력</CardDescription>
      <Table className="text-center border-b">
        <TableHeader className="bg-muted">
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
          {personalData && personalData.career.length > 0 ? (
            personalData?.career.map((career, index) => (
              <TableRow key={index} className="cursor-pointer">
                <TableCell>{career.company_name}</TableCell>
                <TableCell>{career.join_date}</TableCell>
                <TableCell>{career.leave_date}</TableCell>
                <TableCell>{career.job}</TableCell>
                <TableCell>{career.depart}</TableCell>
                <TableCell>{career.rank}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableCell colSpan={6}>데이터가 없습니다.</TableCell>
          )}
        </TableBody>
      </Table>
    </CardContent>
  );
});

export default Display;
