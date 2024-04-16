import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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

  const handleButtonClick = () => {
    const confirmMessage = confirm("등록하시겠습니까?");
  };

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
                  <TableCell className="p-2 flex">
                    <Input id="on_time" name="on_time" type="text" placeholder="출근시간" />
                  </TableCell>
                  <TableCell className="p-2">
                    <Select>
                      <SelectTrigger className="w-[130px]">
                        <SelectValue placeholder="Theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">미출근</SelectItem>
                        <SelectItem value="dark">정상출근</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="p-2">
                    <Input id="off_time" name="off_time" type="text" placeholder="퇴근시간" />
                  </TableCell>
                  <TableCell className="p-2">미퇴근</TableCell>
                  <TableCell className="p-2">0시간</TableCell>
                  <TableCell className="p-2">
                    <Button onClick={handleButtonClick}>등록</Button>
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
