import { memo, useState } from "react";
import { useSuspenseQueries } from "@tanstack/react-query";

import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

import FilterCondition from "@/shared/FilterCondition";
import Paging from "@/shared/Paging";
import MonthPicker from "@/shared/MonthPicker";

import { getAttitudeData, getCommuteData, getMemberData } from "@/server/fetchReadData";

type QueryResult<T> = {
  data: T;
};

type SuspenseQueriesResult = [
  QueryResult<MemberDataTypes[]>,
  QueryResult<ExceptCommute[]>,
  QueryResult<ExceptAttitude[]>,
];

const Index = memo(() => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const todayDate = `${year}${month}${day}`;

  const [{ data: memberData }, { data: attitudeData }, { data: commuteData }] =
    useSuspenseQueries<SuspenseQueriesResult>({
      queries: [
        { queryKey: ["memberData"], queryFn: getMemberData },
        {
          queryKey: ["attitudeData"],
          queryFn: getAttitudeData,
        },
        { queryKey: ["commuteData"], queryFn: getCommuteData },
      ],
    });

  const [data, setData] = useState<MemberDataTypes[]>(memberData);
  const [searchData, setSearchData] = useState<MemberDataTypes[]>([]);

  const [isMonthPicker, setIsMonthPicker] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState({
    year: year.toString(),
    month: month.toString(),
  });

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
              const employeeAttitude = attitudeData?.find(
                (item: ExceptCommute) => item.employee_number === member.employee_number,
              );

              const monthAttitude = employeeAttitude?.attitude.find(
                item => item.month === selectedMonth.year + selectedMonth.month,
              );

              const employeeCommute = commuteData.find(item => item.employee_number === member.employee_number);
              const employeeTodayCommute = employeeCommute?.commuteTime.find(item => item.date === todayDate);

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
                  <TableCell className="p-2">{monthAttitude?.working_count}</TableCell>
                  <TableCell className="p-2">{monthAttitude?.annual_leave_count}</TableCell>
                  <TableCell className="p-2">{monthAttitude?.truancy_count}</TableCell>
                  <TableCell className="p-2">{monthAttitude?.overtime_count}</TableCell>
                  <TableCell className="p-2">{monthAttitude?.night_work_count}</TableCell>
                  <TableCell className="p-2">{monthAttitude?.holiday_work_count}</TableCell>
                  <TableCell className="p-2">{employeeTodayCommute?.working_time}</TableCell>
                  <TableCell className="p-2">{employeeTodayCommute?.quitting_time}</TableCell>
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
