import { memo, useEffect, useState } from "react";

import { useSuspenseQueries } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { postAttitudeData, postCommuteTimeData } from "@/server/fetchCreateData";
import { getCommuteData, getMemberData } from "@/server/fetchReadData";

import FilterCondition from "@/shared/FilterCondition";
import Paging from "@/shared/Paging";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { calculateAttitude } from "../function/calculateAttitude";
import { calculateWorkingHours } from "../function/calculateWorkingHours";
import useDateStore from "@/store/date-store";
import CustomAlert from "@/shared/alert/CustomAlert";

interface FormValues {
  commuteTime: {
    employee_number: string;
    commuteTime: {
      date: string;
      working_time: string;
      working_division: string;
      quitting_time: string;
      quitting_division: string;
      total_time: number;
    };
  }[];
}

type QueryResult<T> = {
  data: T;
};

type SuspenseQueriesResult = [QueryResult<MemberDataTypes[]>, QueryResult<ExceptAttitude[]>];

const Index = memo(() => {
  const { todayDate } = useDateStore();

  const [{ data: memberData }, { data: commuteData, refetch: refetchCommuteData }] =
    useSuspenseQueries<SuspenseQueriesResult>({
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
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      commuteTime: data.map(member => {
        const employeeCommute = commuteData?.find(item => item.employee_number === member.employee_number);
        const employeeTodayCommute = employeeCommute?.commuteTime.find(item => item.date === todayDate);

        return {
          employee_number: member.employee_number,
          commuteTime: {
            date: employeeTodayCommute ? employeeTodayCommute.date : todayDate,
            working_time: employeeTodayCommute ? employeeTodayCommute?.working_time : "",
            working_division: employeeTodayCommute ? employeeTodayCommute?.working_division : "",
            quitting_time: employeeTodayCommute ? employeeTodayCommute?.quitting_time : "",
            quitting_division: employeeTodayCommute ? employeeTodayCommute?.quitting_division : "",
            total_time: employeeTodayCommute ? employeeTodayCommute?.total_time : 0,
          },
        };
      }),
    },
  });

  const onSubmit = (index: number, id: string) => async (data: FormValues) => {
    const newCommuteTime = data.commuteTime[index];
    const total_time = calculateWorkingHours(
      newCommuteTime.commuteTime.working_time,
      newCommuteTime.commuteTime.quitting_time,
    );

    const newData = {
      ...newCommuteTime,
      commuteTime: {
        ...newCommuteTime.commuteTime,
        total_time,
      },
    };

    try {
      await postCommuteTimeData(newData, id);

      const updatedCommuteData = await refetchCommuteData();
      const attitudeData = calculateAttitude(updatedCommuteData.data, id);
      await postAttitudeData(attitudeData, id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form>
      <Card className="h-[850px] relative">
        <CardContent className="py-8">
          <FilterCondition data={memberData} setSearchData={setSearchData} />
          {errors?.commuteTime && (
            <p className="text-[12px] text-destructive font-bold">알맞은 형식을 입력해주세요. 예) 2020년 01월 01일</p>
          )}
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

                const employeeCommute = commuteData?.find(item => item.employee_number === member.employee_number);
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

                    <TableCell className="p-2">
                      {employeeTodayCommute?.working_time ? (
                        employeeTodayCommute?.working_time
                      ) : (
                        <Input
                          id={`commuteTime.${index}.commuteTime.working_time`}
                          {...register(`commuteTime.${index}.commuteTime.working_time`, {
                            pattern: {
                              value: /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
                              message: "알맞은 형식을 입력해주세요 예)00:00",
                            },
                          })}
                          placeholder="예) 09:00"
                        />
                      )}
                    </TableCell>

                    <TableCell className="p-2">
                      {employeeTodayCommute?.working_division ? (
                        employeeTodayCommute?.working_division
                      ) : (
                        <Select
                          onValueChange={value => setValue(`commuteTime.${index}.commuteTime.working_division`, value)}>
                          <SelectTrigger className="w-[130px]">
                            <SelectValue placeholder="미출근" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="정상출근">정상출근</SelectItem>
                            <SelectItem value="지각">지각</SelectItem>
                            <SelectItem value="병가">병가</SelectItem>
                            <SelectItem value="결근">결근</SelectItem>
                            <SelectItem value="연차">연차</SelectItem>
                            <SelectItem value="오전반차">오전반차</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    </TableCell>

                    <TableCell className="p-2">
                      {employeeTodayCommute?.quitting_time ? (
                        employeeTodayCommute?.quitting_time
                      ) : (
                        <Input
                          id={`commuteTime.${index}.commuteTime.quitting_time`}
                          {...register(`commuteTime.${index}.commuteTime.quitting_time`, {
                            pattern: {
                              value: /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
                              message: "알맞은 형식을 입력해주세요 예)00:00",
                            },
                          })}
                          type="text"
                          placeholder="예) 18:00"
                        />
                      )}
                    </TableCell>

                    <TableCell className="p-2">
                      {employeeTodayCommute?.quitting_division ? (
                        employeeTodayCommute?.quitting_division
                      ) : (
                        <Select
                          onValueChange={value => {
                            setValue(`commuteTime.${index}.commuteTime.quitting_division`, value);
                          }}>
                          <SelectTrigger className="w-[130px]">
                            <SelectValue placeholder="미퇴근" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="정상퇴근">정상퇴근</SelectItem>
                            <SelectItem value="조기퇴근">조기퇴근</SelectItem>
                            <SelectItem value="병가">병가</SelectItem>
                            <SelectItem value="결근">결근</SelectItem>
                            <SelectItem value="연차">연차</SelectItem>
                            <SelectItem value="오후반차">오후반차</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    </TableCell>

                    <TableCell className="p-2">{employeeTodayCommute?.total_time}시간</TableCell>

                    <TableCell className="p-2">
                      <Button onClick={handleSubmit(onSubmit(index, member.employee_number))}>등록</Button>
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
