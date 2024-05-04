import { useState } from "react";

import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSuspenseQueries } from "@tanstack/react-query";

import { getOrganizationData, getPositionData, getRankData } from "@/server/fetchReadData";
import { UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";

type QueryResult<T> = {
  data: T;
};

type SuspenseQueriesResult = [
  QueryResult<RankSettingTypes[]>,
  QueryResult<OrganizationDataTypes[]>,
  QueryResult<PositionSettingTypes[]>,
];

const Department = ({
  register,
  setValue,
  watch,
}: {
  register: UseFormRegister<MemberRegistrationFormTypes>;
  setValue: UseFormSetValue<MemberRegistrationFormTypes>;
  watch: UseFormWatch<MemberRegistrationFormTypes>;
}) => {
  const [{ data: rankData }, { data: organizationData }, { data: positionData }] =
    useSuspenseQueries<SuspenseQueriesResult>({
      queries: [
        {
          queryKey: ["rankData"],
          queryFn: getRankData,
        },
        {
          queryKey: ["organizationData"],
          queryFn: getOrganizationData,
        },
        {
          queryKey: ["positionData"],
          queryFn: getPositionData,
        },
      ],
    });

  const [date, setDate] = useState<Date | undefined>(new Date());

  const watchQuarter = watch("employeeData.quarter");
  const watchDepart = watch("employeeData.department");

  const handleJoinDate = (value: Date | undefined) => {
    if (value) {
      const year = String(value?.getFullYear());
      const month = String(value?.getMonth() + 1).padStart(2, "0");
      const date = String(value?.getDate()).padStart(2, "0");
      const valueDate = `${year}${month}${date}`;

      setDate(value);
      setValue(`employeeData.date_of_joining`, valueDate);
    }
  };

  return (
    <Card className="h-[700px] p-8">
      <CardHeader>
        <CardTitle>부서정보</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {/* 사원번호 입력 */}
        <div className="space-y-1 w-3/5">
          <Label htmlFor="employee_number">사원번호</Label>
          <Input
            id="employee_number"
            {...(register("employeeData.employee_number"),
            {
              required: true,
            })}
          />
        </div>

        {/* 소속 관할, 부서, 팀  */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Select
              onValueChange={value => {
                setValue(`employeeData.quarter`, value);
              }}>
              <Label>소속 관할</Label>
              <SelectTrigger>
                <SelectValue placeholder="소속 관할" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {organizationData.map((organization, index) => (
                    <SelectItem key={index} value={organization.quarter}>
                      {organization.quarter}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Select
              onValueChange={value => {
                setValue(`employeeData.department`, value);
              }}>
              <Label>소속 부서</Label>
              <SelectTrigger>
                <SelectValue placeholder="소속 부서" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {organizationData.map((organization, index) => {
                    const isDepart = organization.quarter === watchQuarter;
                    if (isDepart) {
                      return organization.depart.map(depart => (
                        <SelectItem key={index} value={depart.name}>
                          {depart.name}
                        </SelectItem>
                      ));
                    }
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Select
              onValueChange={value => {
                setValue(`employeeData.team`, value);
              }}>
              <Label>소속 팀</Label>
              <SelectTrigger>
                <SelectValue placeholder="소속 팀" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {organizationData.map(organization => {
                    const isDepart = organization.quarter === watchQuarter;
                    if (isDepart) {
                      return organization.depart.map(depart => {
                        const isTeam = depart.name === watchDepart;
                        if (isTeam) {
                          return depart.team.map((team, index) => (
                            <SelectItem key={index} value={team.name}>
                              {team.name}
                            </SelectItem>
                          ));
                        }
                        return null;
                      });
                    }
                    return null;
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* 직책, 직급 */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Select
              onValueChange={value => {
                setValue(`employeeData.position`, value);
              }}>
              <Label>직책</Label>
              <SelectTrigger>
                <SelectValue placeholder="직책" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {positionData.map(position => (
                    <SelectItem key={position.id} value={position.name}>
                      {position.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Select
              onValueChange={value => {
                setValue(`employeeData.rank`, value);
              }}>
              <Label>직급</Label>
              <SelectTrigger>
                <SelectValue placeholder="직급" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {rankData?.map(rank => (
                    <SelectItem key={rank.order} value={rank.value}>
                      {rank.value}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* 입사일자 */}
        <div>
          <Label>입사일자</Label>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn("w-[280px] justify-start text-left font-normal", !date && "text-muted-foreground")}>
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={date} onSelect={value => handleJoinDate(value)} initialFocus />
          </PopoverContent>
        </Popover>
      </CardContent>
    </Card>
  );
};

export default Department;
