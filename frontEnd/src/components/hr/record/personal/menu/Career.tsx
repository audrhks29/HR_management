import { memo } from 'react';

import { useParams } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { IoMdFemale, IoMdMale } from 'react-icons/io';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const Career = memo(({ data }: {
  data: MemberDataTypes[];
}) => {
  const { employee_number } = useParams();

  const personalData = data.find(member => member.employee_number === employee_number)

  return (
    <Card className='h-[800px] p-8'>
      <CardHeader className='border-b-2'>
        <CardTitle>
          <div className='flex items-center mb-3'>

            {/* 직책 */}
            {personalData?.position
              && <Badge
                className="h-8 text-[14px] items-center justify-center mr-2"
                variant="secondary">
                {personalData?.position}</Badge>}

            {/* 직급 */}
            <Badge
              className="w-16 h-8 text-[14px] items-center justify-center mr-2"
              variant="secondary">
              {personalData?.rank}</Badge>
          </div>

          <div className='flex items-center mt-5'>

            {/* 성별 */}
            {personalData?.sex === "남성"
              ? <IoMdMale className="text-[#0000ff] mr-3" />
              : <IoMdFemale className='text-[#ff0000] mr-3' />}

            {/* 이름 */}
            {personalData?.kor_name} ({personalData?.eng_name})
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="mt-5">
        <CardDescription className='text-[16px] mb-3'>학과</CardDescription>
        <Table className='text-center border-b mb-5'>
          <TableHeader className='bg-muted'>
            <TableRow>
              <TableHead>학교명</TableHead>
              <TableHead>학과</TableHead>
              <TableHead>졸업여부</TableHead>
              <TableHead>입학일</TableHead>
              <TableHead>졸업일</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow className='cursor-pointer'>
              <TableCell>00고등학교</TableCell>
              <TableCell>문과</TableCell>
              <TableCell>졸업</TableCell>
              <TableCell>2015년 03월 02일</TableCell>
              <TableCell>2018년 02월 17일</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <CardDescription className='text-[16px] mb-3'>경력</CardDescription>
        <Table className='text-center border-b'>
          <TableHeader className='bg-muted'>
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
            <TableRow className='cursor-pointer'>
              <TableCell>000컴퍼니</TableCell>
              <TableCell>2018년 05월 21일</TableCell>
              <TableCell>2021년 03월 8일</TableCell>
              <TableCell>경영</TableCell>
              <TableCell>경영지원부</TableCell>
              <TableCell>대리</TableCell>
            </TableRow>
          </TableBody>
        </Table>

      </CardContent>
    </Card>
  );
});

export default Career;