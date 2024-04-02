import { memo } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { IoMdFemale, IoMdMale } from 'react-icons/io';

const Select = memo(({ personalData }: {
  personalData: MemberDataTypes;
}) => {
  return (
    <Card className='h-[850px] p-8'>
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
        <Table className='text-center'>

          <TableHeader>
            <TableRow className='cursor-pointer h-[53px]'>
              <TableHead>년도</TableHead>
              <TableHead>총 연봉</TableHead>
              <TableHead>총 연봉</TableHead>
              <TableHead>총 연봉</TableHead>
              <TableHead>총 연봉</TableHead>
              <TableHead>총 연봉</TableHead>

            </TableRow>
          </TableHeader>
          <TableBody>

            <TableRow className='cursor-pointer h-[53px]'>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>

        </Table>
      </CardContent>

    </Card>
  );
});

export default Select;