import { memo } from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
// import { Input } from '@/components/ui/input';

import memberList from '@/assets/sampleData/memberData.json'
import salaryList from '@/assets/sampleData/memberSalaryData.json'

const Index = memo(() => {
  return (
    <Card className='max-h-[780px] overflow-y-auto'>
      <CardContent className="mt-5">
        {/* <Input
          className="w-full my-3"
          value={searchKeyword}
          onChange={(e) => handleInputSearch(e)}
          placeholder='이름으로 검색' /> */}
        <Table className='text-center'>
          <TableHeader className='bg-muted'>
            <TableRow>
              <TableHead className="text-left">이름</TableHead>
              <TableHead className=''>관할</TableHead>
              <TableHead className=''>부서</TableHead>
              <TableHead className=''>팀</TableHead>
              <TableHead className=''>직책</TableHead>
              <TableHead className='w-[130px]'>직급</TableHead>
              <TableHead className=''>급여</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {memberList.map(member => {
              const salary = salaryList.find(salary => salary.employee_number === member.employee_number)

              return (
                <TableRow className='cursor-pointer'>
                  <TableCell className="text-left">{member.kor_name}</TableCell>
                  <TableCell>{member.quarter}</TableCell>
                  <TableCell>{member.department}</TableCell>
                  <TableCell>{member.team}</TableCell>
                  <TableCell>{member.position}</TableCell>
                  <TableCell>
                    <Badge className="text-xs" variant="secondary">
                      {member.rank}
                    </Badge>
                  </TableCell>
                  <TableCell className='text-right'>{salary?.wage.toLocaleString()}</TableCell>
                </TableRow>
              )
            })}

          </TableBody>
        </Table>

      </CardContent>
    </Card>
  );
});

export default Index;