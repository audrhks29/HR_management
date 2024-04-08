import { memo } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const CareerTable = memo(({ formData }: {
  formData: MemberDataTypes;
}) => {
  return (
    <Table className='mt-3 text-center'>
      <TableHeader>
        <TableRow >
          <TableHead>회사명</TableHead>
          <TableHead>입사일</TableHead>
          <TableHead>퇴사일</TableHead>
          <TableHead>직무</TableHead>
          <TableHead>근무부서</TableHead>
          <TableHead>직급</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {formData.career.map((item, index) => (
          <TableRow key={index}>
            <TableCell className='p-2'>{item.company_name}</TableCell>
            <TableCell className='p-2'>{item.join_date}</TableCell>
            <TableCell className='p-2'>{item.leave_date}</TableCell>
            <TableCell className='p-2'>{item.job}</TableCell>
            <TableCell className='p-2'>{item.depart}</TableCell>
            <TableCell className='p-2'>{item.rank}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
});

export default CareerTable;