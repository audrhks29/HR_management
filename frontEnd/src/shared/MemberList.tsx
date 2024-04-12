import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

import FilterCondition from "@/shared/FilterCondition";
import Paging from "@/shared/Paging";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getMemberData } from "@/server/fetchReadData";

const MemberList = memo(({ menuLink, height, displayAmount }: { menuLink: string; height: string; displayAmount: number }) => {
  const { data: memberData }: { data: MemberDataTypes[] } = useSuspenseQuery({
    queryKey: ["memberData"],
    queryFn: getMemberData,
  });

  const [data, setData] = useState<MemberDataTypes[]>(memberData);
  const [searchData, setSearchData] = useState<MemberDataTypes[]>([]);

  const navigate = useNavigate();

  const handleClickRow = (link: string) => navigate(link);

  return (
    <Card className="overflow-hidden relative" style={{ height: height }}>
      <CardContent className="mt-5">
        <FilterCondition data={memberData} setSearchData={setSearchData} />

        <Table className="text-center">
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead className="w-[130px]">직급</TableHead>
              <TableHead className="w-[100px]">이름</TableHead>
              <TableHead className="w-[200px]">직책</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map(member => (
              <TableRow key={member.employee_number} className="cursor-pointer" onClick={() => handleClickRow(`/${menuLink}/${member.employee_number}`)}>
                <TableCell className="hidden sm:table-cell">
                  <Badge className="text-xs" variant="secondary">
                    {member.rank}
                  </Badge>
                </TableCell>
                <TableCell>{member.kor_name}</TableCell>
                <TableCell>{member.position}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Paging beforePagingData={searchData} setData={setData} displayAmount={displayAmount} />
      </CardContent>
    </Card>
  );
});

export default MemberList;
