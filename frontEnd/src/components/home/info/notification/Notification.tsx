import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { memo } from 'react';

const Notification = memo(() => {
  return (
    <Card className='col-span-2'>
      <CardHeader>
        <CardDescription className='text-primary'>공지사항</CardDescription>
      </CardHeader>
      <CardContent className='mt-6'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>번호</TableHead>
              <TableHead>제목</TableHead>
              <TableHead>작성자</TableHead>
              <TableHead>날짜</TableHead>
              <TableHead>조회수</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className='text-center'>
            <TableRow>
              <TableCell>3</TableCell>
              <TableCell className='text-left'>공지사항 테스트 입니다.</TableCell>
              <TableCell>지은호</TableCell>
              <TableCell>2024년 04월 04일</TableCell>
              <TableCell>0</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>2</TableCell>
              <TableCell className='text-left'>공지사항 테스트 입니다.</TableCell>
              <TableCell>지은호</TableCell>
              <TableCell>2024년 04월 04일</TableCell>
              <TableCell>0</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell className='text-left'>공지사항 테스트 입니다.</TableCell>
              <TableCell>지은호</TableCell>
              <TableCell>2024년 04월 04일</TableCell>
              <TableCell>0</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
});

export default Notification;