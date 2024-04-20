import { memo, useState } from "react";

import { useSuspenseQueries } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { postCommuteTimeData } from "@/server/fetchCreateData";
import { getCommuteTimeDateData, getMemberData } from "@/server/fetchReadData";

import FilterCondition from "@/shared/FilterCondition";
import Paging from "@/shared/Paging";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface FormValues {
  commuteTime: {
    employee_number: string;
    working_time: string;
    working_division: string;
    quitting_time: string;
    quitting_division: string;
  }[];
}

type QueryResult<T> = {
  data: T;
};

type SuspenseQueriesResult = [QueryResult<MemberDataTypes[]>, QueryResult<CommuteTimeDataTypes>];
const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, "0");
const day = String(today.getDate()).padStart(2, "0");
const todayDate = `${year}${month}${day}`;

const Index = memo(() => {
  const [{ data: memberData }, { data: commuteTimeData, refetch: refetchCommuteTimeData }] =
    useSuspenseQueries<SuspenseQueriesResult>({
      queries: [
        { queryKey: ["memberData"], queryFn: getMemberData },
        {
          queryKey: ["commuteTimeData"],
          queryFn: () => getCommuteTimeDateData(todayDate),
        },
      ],
    });

  const [data, setData] = useState<MemberDataTypes[]>(memberData);
  const [searchData, setSearchData] = useState<MemberDataTypes[]>([]);

  const { register, handleSubmit, setValue } = useForm<FormValues>({
    defaultValues: {
      commuteTime: data.map((member, index) => {
        const idx = commuteTimeData?.data.findIndex(item => item.employee_number === data[index]?.employee_number);
        return {
          employee_number: member.employee_number,
          working_time: idx !== -1 ? commuteTimeData?.data[idx]?.working_time : "",
          working_division: idx !== -1 ? commuteTimeData?.data[idx]?.working_division : "",
          quitting_time: idx !== -1 ? commuteTimeData?.data[idx]?.quitting_time : "",
          quitting_division: idx !== -1 ? commuteTimeData?.data[idx]?.quitting_division : "",
        };
      }),
    },
  });

  const onSubmit = (index: number) => async (data: FormValues) => {
    await postCommuteTimeData(data.commuteTime[index]);
    refetchCommuteTimeData();
  };

  const calculateWorkingHours = (startTime: string, endTime: string) => {
    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);

    const startDate = new Date();
    startDate.setHours(startHour, startMinute, 0, 0);

    const endDate = new Date();
    endDate.setHours(endHour, endMinute, 0, 0);

    const timeDiff = endDate.getTime() - startDate.getTime();
    const hoursDiff = timeDiff / (1000 * 60 * 60);

    return hoursDiff;
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
              {data.map(member => {
                const index = memberData.findIndex(item => item.employee_number === member.employee_number);

                const employeeCommuteTime = commuteTimeData?.data.find(
                  item => item.employee_number === member.employee_number,
                );
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
                      {employeeCommuteTime?.working_time ? (
                        employeeCommuteTime?.working_time
                      ) : (
                        <Input
                          id={`commuteTime.${member.employee_number}.working_time`}
                          {...register(`commuteTime.${index}.working_time`)}
                          placeholder="출근시간"
                        />
                      )}
                    </TableCell>

                    <TableCell className="p-2">
                      {employeeCommuteTime?.working_division ? (
                        employeeCommuteTime?.working_division
                      ) : (
                        <Select onValueChange={value => setValue(`commuteTime.${index}.working_division`, value)}>
                          <SelectTrigger className="w-[130px]">
                            <SelectValue placeholder="미출근" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="정상출근">정상출근</SelectItem>
                            <SelectItem value="지각">지각</SelectItem>
                            <SelectItem value="결근">결근</SelectItem>
                            <SelectItem value="연차">연차</SelectItem>
                            <SelectItem value="반차">오전반차</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    </TableCell>

                    <TableCell className="p-2">
                      {employeeCommuteTime?.quitting_time ? (
                        employeeCommuteTime?.quitting_time
                      ) : (
                        <Input
                          id={`commuteTime.${member.employee_number}.quitting_time`}
                          {...register(`commuteTime.${index}.quitting_time`)}
                          type="text"
                          placeholder="퇴근시간"
                        />
                      )}
                    </TableCell>

                    <TableCell className="p-2">
                      {employeeCommuteTime?.quitting_division ? (
                        employeeCommuteTime?.quitting_division
                      ) : (
                        <Select
                          onValueChange={value => {
                            setValue(`commuteTime.${index}.quitting_division`, value);
                          }}>
                          <SelectTrigger className="w-[130px]">
                            <SelectValue placeholder="미퇴근" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="정상퇴근">정상퇴근</SelectItem>
                            <SelectItem value="조기퇴근">조기퇴근</SelectItem>
                            <SelectItem value="병가">병가</SelectItem>
                            <SelectItem value="오후반차">오후반차</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    </TableCell>
                    <TableCell className="p-2">
                      {calculateWorkingHours(employeeCommuteTime?.working_time, employeeCommuteTime?.quitting_time)}시간
                    </TableCell>
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
