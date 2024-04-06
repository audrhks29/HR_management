import { memo, useState } from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

import FilterCondition from '../../../shared/FilterCondition';
import Paging from '@/shared/Paging';
import MonthPicker from '@/shared/MonthPicker';
import { getMemberData } from '@/server/fetchReadData';
import { useSuspenseQuery } from '@tanstack/react-query';

const Index = memo(() => {
  const { data: memberData }: { data: MemberDataTypes[] } = useSuspenseQuery({
    queryKey: ["memberData"],
    queryFn: getMemberData,
  });

  const [data, setData] = useState<MemberDataTypes[]>(memberData)
  const [searchData, setSearchData] = useState<MemberDataTypes[]>([])

  const date = new Date()
  const year = date.getFullYear();
  const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;

  const [isMonthPicker, setIsMonthPicker] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState({
    year: year.toString(),
    month: month.toString()
  });

  return (
    <Card className='h-[850px] relative'>
      <CardContent className='py-8'>
        <FilterCondition
          data={memberData}
          setSearchData={setSearchData} />

        <MonthPicker
          isMonthPicker={isMonthPicker}
          setIsMonthPicker={setIsMonthPicker}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
        />
        <Table className='text-center'>
          <TableHeader className='bg-muted'>
            <TableRow>
              <TableHead className='w-[100px] p-2'>관할</TableHead>
              <TableHead className='w-[120px] p-2'>이름</TableHead>
              <TableHead className='w-[110px] p-2'>직급</TableHead>
              <TableHead className='w-[200px] p-2'>직책</TableHead>
              <TableHead className='p-2'>근무일</TableHead>
              <TableHead className='p-2'>휴가일</TableHead>
              <TableHead className='p-2'>결근일</TableHead>
              <TableHead className='p-2'>연장근로시간</TableHead>
              <TableHead className='p-2'>야간근로시간</TableHead>
              <TableHead className='p-2'>휴일근로시간</TableHead>
              <TableHead className='w-[130px] p-2'>금일 출근시간</TableHead>
              <TableHead className='w-[130px] p-2'>금일 퇴근시간</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map(member => {
              return (
                <TableRow
                  key={member.employee_number}
                  className='cursor-pointer h-[56px]'>
                  <TableCell className='p-2'>{member.quarter}</TableCell>
                  <TableCell className='p-2'>{member.kor_name}</TableCell>
                  <TableCell className='p-2'>
                    <Badge className="text-xs" variant="secondary">
                      {member.rank}
                    </Badge>
                  </TableCell>
                  <TableCell className='p-2'>{member.position}</TableCell>
                  <TableCell className='p-2'>30</TableCell>
                  <TableCell className='p-2'>1</TableCell>
                  <TableCell className='p-2'>0</TableCell>
                  <TableCell className='p-2'>0</TableCell>
                  <TableCell className='p-2'>0</TableCell>
                  <TableCell className='p-2'>0</TableCell>
                  <TableCell className='p-2'>00시 00분</TableCell>
                  <TableCell className='p-2'>00시 00분</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>

        <Paging
          beforePagingData={searchData}
          setData={setData}
          displayAmount={11}
        />
      </CardContent>
    </Card>
  );
});

export default Index;