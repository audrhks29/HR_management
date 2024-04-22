import { memo, useState } from "react";
import { useSuspenseQueries } from "@tanstack/react-query";

import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

import FilterCondition from "@/shared/FilterCondition";
import Paging from "@/shared/Paging";
import MonthPicker from "@/shared/MonthPicker";

import { getCommuteData, getMemberData } from "@/server/fetchReadData";

type QueryResult<T> = {
  data: T;
};

type SuspenseQueriesResult = [QueryResult<MemberDataTypes[]>, QueryResult<CommuteTimeDataTypes>];

const Index = memo(() => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const todayDate = `${year}${month}${day}`;

  const [{ data: memberData }, { data: commuteData }] = useSuspenseQueries<SuspenseQueriesResult>({
    queries: [
      { queryKey: ["memberData"], queryFn: getMemberData },
      {
        queryKey: ["commuteData"],
        queryFn: getCommuteData,
      },
    ],
  });

  const [data, setData] = useState<MemberDataTypes[]>(memberData);
  const [searchData, setSearchData] = useState<MemberDataTypes[]>([]);

  const [isMonthPicker, setIsMonthPicker] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState({
    year: year.toString(),
    month: month.toString(),
  });

  // const monthCommute = commuteTimeData.filter((data: CommuteTimeDataTypes) =>
  //   data.date.includes(selectedMonth.year + selectedMonth.month),
  // );

  return (
    <Card className="h-[850px] relative">
      <CardContent className="py-8">
        <FilterCondition data={memberData} setSearchData={setSearchData} />

        <MonthPicker
          isMonthPicker={isMonthPicker}
          setIsMonthPicker={setIsMonthPicker}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
        />

        <Table className="text-center">
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead className="w-[100px] p-2">관할</TableHead>
              <TableHead className="w-[120px] p-2">이름</TableHead>
              <TableHead className="w-[110px] p-2">직급</TableHead>
              <TableHead className="w-[200px] p-2">직책</TableHead>
              <TableHead className="p-2">근무일</TableHead>
              <TableHead className="p-2">휴가일</TableHead>
              <TableHead className="p-2">결근일</TableHead>
              <TableHead className="p-2">연장근로시간</TableHead>
              <TableHead className="p-2">야간근로시간</TableHead>
              <TableHead className="p-2">휴일근로시간</TableHead>
              <TableHead className="w-[130px] p-2">금일 출근시간</TableHead>
              <TableHead className="w-[130px] p-2">금일 퇴근시간</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map(member => {
              // 오늘 출퇴근시간 관련
              // const todayCommuteTime = commuteTimeDateData?.data.find(
              //   (item: CommuteTimeTypes) => item.employee_number === member.employee_number,
              // );

              // // 개인별 근태
              // const employeeAttitude = monthCommute?.map(item =>
              //   item.data.find(data => data.employee_number === member.employee_number),
              // );

              // // 근무 일수
              // const workingCount = employeeAttitude?.filter(
              //   item => item?.working_time.includes(":") && item?.quitting_time.includes(":"),
              // ).length;

              // // 휴가 일수
              // const annualLeavesCount = employeeAttitude.reduce((accumulator, item) => {
              //   let extraHours = 0;
              //   if (item?.working_time === "연차") {
              //     extraHours = 1;
              //   } else if (item?.working_division === "오전반차" || item?.quitting_division === "오후반차") {
              //     extraHours = 0.5;
              //   }
              //   return accumulator + extraHours;
              // }, 0);
              // console.log(annualLeavesCount);
              // // 결근, 병가 일수
              // const truancyCount = employeeAttitude?.filter(
              //   item => item?.working_time === "결근" || item?.working_time === "병가",
              // ).length;

              // // 연장근로 시간
              // const moreTime = employeeAttitude?.filter(
              //   item => item?.working_time === "결근" || item?.working_time === "병가",
              // ).length;

              return (
                <TableRow key={member.employee_number} className="cursor-pointer h-[56px]">
                  <TableCell className="p-2">{member.quarter}</TableCell>
                  <TableCell className="p-2">{member.kor_name}</TableCell>
                  <TableCell className="p-2">
                    <Badge className="text-xs" variant="secondary">
                      {member.rank}
                    </Badge>
                  </TableCell>
                  {/* <TableCell className="p-2">{member.position}</TableCell>
                  <TableCell className="p-2">{workingCount}</TableCell>
                  <TableCell className="p-2">{annualLeavesCount}</TableCell>
                  <TableCell className="p-2">{truancyCount}</TableCell>
                  <TableCell className="p-2">0</TableCell>
                  <TableCell className="p-2">0</TableCell>
                  <TableCell className="p-2">0</TableCell>
                  <TableCell className="p-2">{todayCommuteTime?.working_time}</TableCell>
                  <TableCell className="p-2">{todayCommuteTime?.quitting_time}</TableCell> */}
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
