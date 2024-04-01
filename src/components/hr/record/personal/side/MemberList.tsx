import { memo, useEffect, useState } from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import memberList from '@/assets/sampleData/memberData.json'
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';

const MemberList = memo(() => {
  const navigate = useNavigate();

  const handleClickRow = (link: string) => navigate(link)
  const [searchData, setSearchData] = useState(memberList)
  const [searchKeyword, setSearchKeyword] = useState("")

  const handleInputSearch = (e: React.ChangeEvent<HTMLInputElement>) => setSearchKeyword(e.target.value);

  useEffect(() => {
    const filteredData = memberList.filter(member => member.kor_name.includes(searchKeyword))
    searchKeyword !== "" ? setSearchData(filteredData) : setSearchData(memberList)
  }, [searchKeyword])

  return (
    <Card className='max-h-[780px] overflow-y-auto'>
      <CardContent className="mt-5">
        <Input
          className="w-full my-3"
          value={searchKeyword}
          onChange={(e) => handleInputSearch(e)}
          placeholder='이름으로 검색' />
        <Table className='text-center'>
          <TableHeader className='bg-muted'>
            <TableRow>
              <TableHead className='w-[130px]'>직급</TableHead>
              <TableHead className="w-[100px] text-left">이름</TableHead>
              <TableHead className='w-[200px]'>직책</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {searchData.map(member => (
              <TableRow
                key={member.employee_number}
                className='cursor-pointer'
                onClick={() => handleClickRow(`/hr_record/${member.employee_number}`)}
              >
                <TableCell className="hidden sm:table-cell">
                  <Badge className="text-xs" variant="secondary">
                    {member.rank}
                  </Badge>
                </TableCell>
                <TableCell className="text-left">
                  {member.kor_name}
                </TableCell>
                <TableCell>{member.position}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

      </CardContent>
    </Card>
  );
});

export default MemberList;