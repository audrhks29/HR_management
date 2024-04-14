import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getMemberData } from "@/server/fetchReadData";
import FilterCondition from "@/shared/FilterCondition";
import Paging from "@/shared/Paging";
import { useSuspenseQuery } from "@tanstack/react-query";
import { memo, useState } from "react";

const Index = memo(() => {
  const { data: memberData }: { data: MemberDataTypes[] } = useSuspenseQuery({
    queryKey: ["memberData"],
    queryFn: getMemberData,
  });

  const [data, setData] = useState<MemberDataTypes[]>(memberData);
  const [searchData, setSearchData] = useState<MemberDataTypes[]>([]);

  return (
    <Card className="h-[850px] relative">
      <CardContent className="py-8">
        <FilterCondition data={memberData} setSearchData={setSearchData} />
        <Table className="text-center">
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead className="w-[100px] p-2">관할</TableHead>
              <TableHead className="w-[120px] p-2">이름</TableHead>
              <TableHead className="w-[110px] p-2">직급</TableHead>
              <TableHead className="w-[200px] p-2">직책</TableHead>
              <TableHead className="w-[130px] p-2">금일 출근시간</TableHead>
              <TableHead className="w-[130px] p-2">출근 구분</TableHead>
              <TableHead className="w-[130px] p-2">금일 퇴근시간</TableHead>
              <TableHead className="w-[130px] p-2">퇴근 구분</TableHead>
              <TableHead className="w-[130px] p-2">근무 시간</TableHead>
              <TableHead className="w-[130px] p-2">등록</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map(member => {
              return (
                <TableRow key={member.employee_number} className="cursor-pointer h-[56px]">
                  <TableCell className="p-2">{member.quarter}</TableCell>
                  <TableCell className="p-2">{member.kor_name}</TableCell>
                  <TableCell className="p-2">
                    <Badge className="text-xs" variant="secondary">
                      {member.rank}
                    </Badge>
                  </TableCell>
                  <TableCell className="p-2">{member.position}</TableCell>
                  <TableCell className="p-2">
                    <Input></Input>
                  </TableCell>
                  <TableCell className="p-2">미출근</TableCell>
                  <TableCell className="p-2">
                    <Input></Input>
                  </TableCell>
                  <TableCell className="p-2">미퇴근</TableCell>
                  <TableCell className="p-2">0시간</TableCell>
                  <TableCell className="p-2">
                    <Button>등록</Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <Paging beforePagingData={searchData} setData={setData} displayAmount={11} />
      </CardContent>
    </Card>
  );
});

export default Index;
