import { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

import memberList from '../../../assets/sampleData/memberData.json'
import Paging from '@/shared/Paging';
import FilterCondition from '@/shared/FilterCondition';

const Index = memo(() => {
  const [data, setData] = useState<MemberDataTypes[]>([]);
  const [searchData, setSearchData] = useState(memberList);

  const navigate = useNavigate();

  const handleClickRow = (id: string) => navigate(`${id}`);

  return (
    <Card className='h-[850px] relative'>
      <CardContent className='py-8'>
        <FilterCondition setSearchData={setSearchData} />

        <Table className='text-center'>
          <TableHeader className='bg-muted'>
            <TableRow>
              <TableHead className='w-[140px]'>사원번호</TableHead>
              <TableHead className="w-[260px] text-left">이름</TableHead>
              <TableHead className='w-[108px]'>성별</TableHead>
              <TableHead className='w-[90px]'>관할</TableHead>
              <TableHead className='w-[160px]'>부서</TableHead>
              <TableHead className='w-[160px]'>팀</TableHead>
              <TableHead className='w-[160px]'>직책</TableHead>
              <TableHead className='w-[110px]'>직급</TableHead>
              <TableHead>입사일</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map(member => (
              <TableRow
                key={member.employee_number}
                className='cursor-pointer'
                onClick={() => handleClickRow(member.employee_number)}
              >
                <TableCell>{member.employee_number}</TableCell>
                <TableCell className="text-left">
                  {member.kor_name} ({member.eng_name})
                </TableCell>
                <TableCell>{member.sex}</TableCell>
                <TableCell>{member.quarter}</TableCell>
                <TableCell>{member.department}</TableCell>
                <TableCell>{member.team}</TableCell>
                <TableCell>{member.position}</TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge className="text-xs" variant="secondary">
                    {member.rank}
                  </Badge>
                </TableCell>
                <TableCell>{member.date_of_joining}</TableCell>
              </TableRow>
            ))}
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