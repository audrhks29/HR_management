import { memo } from 'react';
import { IoMdFemale, IoMdMale } from 'react-icons/io';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@/components/ui/table';
import PersonalTitle from '@/shared/PersonalTitle';

const Privacy = memo(({ personalData }: {
  personalData: MemberDataTypes | undefined;
}) => {

  return (
    <Card className='h-[800px] p-8'>
      <PersonalTitle personalData={personalData} />

      <CardContent className="mt-5 grid grid-cols-2">
        <Table className='text-center w-80'>
          <TableBody>

            <TableRow className='cursor-pointer h-[53px]'>
              <TableHead className='w-32 text-left'>이름</TableHead>
              <TableCell>{personalData?.kor_name}</TableCell>
            </TableRow>

            <TableRow className='cursor-pointer h-[53px]'>
              <TableHead className='w-32 text-left'>성별</TableHead>
              <TableCell className='flex items-center justify-center'>
                {personalData?.sex === "남성"
                  ? <IoMdMale className="text-[#0000ff] mr-3" />
                  : <IoMdFemale className='text-[#ff0000] mr-3' />}
              </TableCell>
            </TableRow>

            <TableRow className='cursor-pointer h-[53px]'>
              <TableHead className='w-32 text-left'>핸드폰 번호</TableHead>
              <TableCell>{personalData?.phone_number}</TableCell>
            </TableRow>

            <TableRow className='cursor-pointer h-[53px]'>
              <TableHead className='w-32 text-left'>주민등록번호</TableHead>
              <TableCell>{personalData?.rrn_front}-{personalData?.rrn_back}</TableCell>
            </TableRow>

            <TableRow className='cursor-pointer h-[53px]'>
              <TableHead className='w-32 text-left'>주소</TableHead>
              <TableCell>
                {personalData?.address.address}&nbsp;
                {personalData?.address.detail_address}
              </TableCell>
            </TableRow>

            <TableRow className='cursor-pointer h-[53px]'>
              <TableHead className='w-32 text-left'>이메일</TableHead>
              <TableCell>{personalData?.email}</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Table className='text-center w-80'>
          <TableBody>

            <TableRow className='cursor-pointer h-[53px]'>
              <TableHead className='w-24 text-left'>사원번호</TableHead>
              <TableCell>{personalData?.employee_number}</TableCell>
            </TableRow>

            <TableRow className='cursor-pointer h-[53px]'>
              <TableHead className='w-24 text-left'>소속 관할</TableHead>
              <TableCell>{personalData?.quarter}</TableCell>
            </TableRow>

            <TableRow className='cursor-pointer h-[53px]'>
              <TableHead className='w-24 text-left'>소속 부서</TableHead>
              <TableCell>{personalData?.department}</TableCell>
            </TableRow>

            <TableRow className='cursor-pointer h-[53px]'>
              <TableHead className='w-24 text-left'>소속 팀</TableHead>
              <TableCell>{personalData?.team}</TableCell>
            </TableRow>

            <TableRow className='cursor-pointer h-[53px]'>
              <TableHead className='w-24 text-left'>직책</TableHead>
              <TableCell>{personalData?.position}</TableCell>
            </TableRow>

            <TableRow className='cursor-pointer h-[53px]'>
              <TableHead className='w-24 text-left'>직급</TableHead>
              <TableCell>
                <Badge
                  className="text-[14px] items-center justify-center"
                  variant="secondary">
                  {personalData?.rank}
                </Badge>
              </TableCell>
            </TableRow>

            <TableRow className='cursor-pointer h-[53px]'>
              <TableHead className='w-24 text-left'>입사일</TableHead>
              <TableCell>{personalData?.date_of_joining}</TableCell>
            </TableRow>

          </TableBody>
        </Table>
      </CardContent>

    </Card>

  );
});

export default Privacy;