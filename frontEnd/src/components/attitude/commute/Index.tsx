import { memo, useState } from "react";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { postAttitudeData } from "@/server/fetchCreateData";
import { getMemberData } from "@/server/fetchReadData";

import FilterCondition from "@/shared/FilterCondition";
import Paging from "@/shared/Paging";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface FormValues {
  attitudes: {
    employee_number: string;
    working_time: string;
    working_division: string;
    quitting_time: string;
    quitting_division: string;
  }[];
}

const Index = memo(() => {
  const { data: memberData }: { data: MemberDataTypes[] } = useSuspenseQuery({
    queryKey: ["memberData"],
    queryFn: getMemberData,
  });

  const [data, setData] = useState<MemberDataTypes[]>(memberData);
  const [searchData, setSearchData] = useState<MemberDataTypes[]>([]);

  const { register, handleSubmit, setValue } = useForm<FormValues>({
    defaultValues: {
      attitudes: data.map(member => ({
        employee_number: member.employee_number,
        working_time: "",
        working_division: "",
        quitting_time: "",
        quitting_division: "",
      })),
    },
  });

  const onSubmit = (index: number) => (data: FormValues) => {
    postAttitudeData(data.attitudes[index]);
  };

  return (
    <form>
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
              {data.map((member, index) => {
                return (
                  <TableRow key={index} className="cursor-pointer h-[56px]">
                    <TableCell className="p-2">{member.quarter}</TableCell>
                    <TableCell className="p-2">{member.kor_name}</TableCell>
                    <TableCell className="p-2">
                      <Badge className="text-xs" variant="secondary">
                        {member.rank}
                      </Badge>
                    </TableCell>
                    <TableCell className="p-2">{member.position}</TableCell>
                    <TableCell className="p-2 flex">
                      <Input
                        id={`attitudes.${index}.working_time`}
                        {...register(`attitudes.${index}.working_time`)}
                        placeholder="출근시간"
                      />
                    </TableCell>
                    <TableCell className="p-2">
                      <Select onValueChange={value => setValue(`attitudes.${index}.working_division`, value)}>
                        <SelectTrigger className="w-[130px]">
                          <SelectValue placeholder="미출근" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="정상출근">정상출근</SelectItem>
                          <SelectItem value="지각">지각</SelectItem>
                          <SelectItem value="결근">결근</SelectItem>
                          <SelectItem value="연차">연차</SelectItem>
                          <SelectItem value="반차">반차</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="p-2">
                      <Input
                        id={`attitudes.${index}.quitting_time`}
                        {...register(`attitudes.${index}.quitting_time`)}
                        type="text"
                        placeholder="퇴근시간"
                      />
                    </TableCell>
                    <TableCell className="p-2">
                      <Select onValueChange={value => setValue(`attitudes.${index}.quitting_division`, value)}>
                        <SelectTrigger className="w-[130px]">
                          <SelectValue placeholder="미퇴근" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="정상퇴근">정상퇴근</SelectItem>
                          <SelectItem value="조기퇴근">조기퇴근</SelectItem>
                          <SelectItem value="병가">병가</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="p-2">0시간</TableCell>
                    <TableCell className="p-2">
                      <Button onClick={handleSubmit(onSubmit(index))}>등록</Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <Paging beforePagingData={searchData} setData={setData} displayAmount={11} />
        </CardContent>
      </Card>
    </form>
  );
});

export default Index;
