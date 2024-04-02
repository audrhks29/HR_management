import { memo, useState } from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

import salaryList from '@/assets/sampleData/memberSalaryData.json'

import FilterCondition from '../../../shared/FilterCondition';
import Paging from '@/shared/Paging';

const Index = memo(() => {
  const [data, setData] = useState<MemberDataTypes[]>([])
  const [searchData, setSearchData] = useState<MemberDataTypes[]>([])

  return (
    <Card className='h-[850px] relative'>
      <CardContent className='py-8'>
        <FilterCondition setSearchData={setSearchData} />

        <Table className='text-center'>
          <TableHeader className='bg-muted'>
            <TableRow>
              <TableHead className='w-[140px]'>관할</TableHead>
              <TableHead className='w-[160px]'>이름</TableHead>
              <TableHead className='w-[140px]'>직급</TableHead>
              <TableHead className='w-[240px]'>직책</TableHead>
              <TableHead>최근 연봉 협상일</TableHead>
              <TableHead className='w-[200px]'>기본연봉</TableHead>
              <TableHead className='w-[200px]'>기본급여</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map(member => {
              const salary = salaryList.find(salary => salary.employee_number === member.employee_number)

              return (
                <TableRow
                  key={member.employee_number}
                  className='cursor-pointer'>
                  <TableCell>{member.quarter}</TableCell>
                  <TableCell>{member.kor_name}</TableCell>
                  <TableCell>
                    <Badge className="text-xs" variant="secondary">
                      {member.rank}
                    </Badge>
                  </TableCell>
                  <TableCell>{member.position}</TableCell>
                  <TableCell>2000년 00월 00일</TableCell>
                  <TableCell className='text-right'>{salary?.wage.toLocaleString()}</TableCell>
                  <TableCell className='text-right'>{salary?.wage && (salary.wage / 12).toLocaleString()}</TableCell>
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