import { memo, useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

import memberData from '../../../assets/sampleData/memberData.json'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { useNavigate } from 'react-router-dom';

const Index = memo(() => {
  const [currentPage, setCurrentPage] = useState(1)
  const [data, setData] = useState<MemberDataTypes[]>([])

  const navigate = useNavigate()

  const displayAmount = 12; // 페이지 당 index 갯수
  const lastPage = Math.ceil(memberData.length / displayAmount); //마지막 페이지 번호
  const pageIndex = Array.from({ length: lastPage }, (_, i) => i + 1) // 페이지 번호 배열

  useEffect(() => {
    const slicedData = memberData.slice((currentPage - 1) * displayAmount, currentPage * displayAmount)
    setData(slicedData)
  }, [currentPage])

  // 페이지 이전, 다음 버튼 클릭
  const handleClickPrev = () => currentPage !== 1 ? setCurrentPage(currentPage - 1) : ""
  const handleClickNext = () => currentPage !== lastPage ? setCurrentPage(currentPage + 1) : ""

  const handleClickRow = (id: string) => navigate(`${id}`)

  return (
    <Card className='h-full relative'>
      <CardContent className='py-8'>
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

        <Pagination className='absolute bottom-8 w-full'>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={handleClickPrev}
                className="cursor-pointer" />
            </PaginationItem>

            <PaginationItem>
              {pageIndex.map((page, index) => {
                const isCurrent = currentPage === index + 1
                return (
                  <PaginationLink
                    key={index}
                    onClick={() => setCurrentPage(page)}
                    style={{ background: isCurrent ? "#1f2937" : "" }}
                    className='cursor-pointer'
                  >
                    {page}
                  </PaginationLink>
                )
              })}
            </PaginationItem>

            <PaginationItem>
              <PaginationNext onClick={handleClickNext} className="cursor-pointer" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>

      </CardContent>
    </Card>
  );
});

export default Index;