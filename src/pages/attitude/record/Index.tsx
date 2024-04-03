import { memo, useState } from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

import salaryList from '@/assets/sampleData/memberSalaryData.json'

import FilterCondition from '../../../shared/FilterCondition';
import Paging from '@/shared/Paging';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';

const Index = memo(() => {
  const [data, setData] = useState<MemberDataTypes[]>([])
  const [searchData, setSearchData] = useState<MemberDataTypes[]>([])


  // const [isMonthPicker, setIsMonthPicker] = useState(new Date());
  // console.log(isMonthPicker);
  return (
    <Card className='h-[850px] relative'>
      {/* <Button variant="outline">
        <Calendar />
      </Button>
      <Card className='w-[500px]'>
        <CardContent className='grid grid-cols-3 gap-3'>
          <Button variant="secondary" value={1}>Jan.</Button>
          <Button variant="secondary" value={2}>Feb.</Button>
          <Button variant="secondary" value={3}>Mar.</Button>
          <Button variant="secondary" value={4}>Apr.</Button>
          <Button variant="secondary" value={5}>May.</Button>
          <Button variant="secondary" value={6}>Jun.</Button>
          <Button variant="secondary" value={7}>Jul.</Button>
          <Button variant="secondary" value={8}>Aug.</Button>
          <Button variant="secondary" value={9}>Sep.</Button>
          <Button variant="secondary" value={10}>Oct.</Button>
          <Button variant="secondary" value={11}>Nov.</Button>
          <Button variant="secondary" value={12}>Dec.</Button>
        </CardContent>
      </Card> */}
      <CardContent className='py-8'>
        <FilterCondition setSearchData={setSearchData} />

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