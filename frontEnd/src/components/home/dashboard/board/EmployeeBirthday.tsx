import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getMemberData } from "@/server/fetchReadData";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Cake } from "lucide-react";
import { memo } from "react";

const EmployeeBirthday = memo(() => {
  const today = new Date();
  const year = String(today.getFullYear());
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  const { data: memberData }: { data: MemberDataTypes[] } = useSuspenseQuery({
    queryKey: ["memberData"],
    queryFn: getMemberData,
  });

  const birthdayList = memberData
    .sort((a, b) => Number(a.rrn_front.substring(2, 4)) - Number(b.rrn_front.substring(2, 4)))
    .filter(item => Number(item.rrn_front.substring(2, 6)) >= Number(month + day))
    .slice(0, 5);

  return (
    <Card className="h-[330px]">
      <CardHeader>
        <CardTitle className="text-[20px] flex items-center">
          <Cake className="mr-3" />
          <span>축하해주세요!</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table className="text-[12px] text-center">
          <TableHeader className="bg-muted">
            <TableRow className="p-1 h-8">
              <TableHead className="p-1 h-8">관할</TableHead>
              <TableHead className="p-1 h-8">팀</TableHead>
              <TableHead className="p-1 h-8">직급</TableHead>
              <TableHead className="p-1 h-8">이름</TableHead>
              <TableHead className="p-1 h-8">생일</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {birthdayList.map((member, index) => {
              return (
                <TableRow key={index}>
                  <TableCell className="p-2">{member.quarter}</TableCell>
                  <TableCell className="p-2">{member.team}</TableCell>
                  <TableCell className="p-2">
                    <Badge className="text-xs" variant="secondary">
                      {member.rank}
                    </Badge>
                  </TableCell>
                  <TableCell className="p-2">{member.kor_name}</TableCell>
                  <TableCell className="p-2">
                    {member.rrn_front.substring(2, 4)}월 {member.rrn_front.substring(4, 6)}일
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
});

export default EmployeeBirthday;
