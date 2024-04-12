import { memo, useState } from "react";

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

type QueryResult<T> = {
  data: T;
};

type SuspenseQueriesResult = [
  QueryResult<RankDataTypes[]>,
  QueryResult<OrganizationDataTypes[]>,
  QueryResult<PositionDataTypes[]>,
];

const Department = memo(
  ({
    formData,
    handleChange,
    handleChangeSelect,
    handleSelectDate,
  }: {
    formData: MemberDataTypes;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleChangeSelect: (name: string, value: string) => void;
    handleSelectDate: (value: Date | undefined) => void;
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

    return (
      <Card className="min-h-[700px] p-8">
        <CardHeader>
          <CardTitle>부서정보</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {/* 사원번호 입력 */}
          <div className="space-y-1 w-3/5">
            <Label htmlFor="employee_number">사원번호</Label>
            <Input
              id="employee_number"
              name="employee_number"
              value={formData.employee_number}
              onChange={handleChange}
            />
          </div>

          {/* 소속 관할, 부서, 팀  */}
          <div className="space-y-1 grid grid-cols-3 gap-4">
            <div>
              <Select value={formData.quarter} onValueChange={value => handleChangeSelect("quarter", value)}>
                <Label>소속 관할</Label>
                <SelectTrigger>
                  <SelectValue placeholder="소속 관할" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {organizationData.map(organization => (
                      <SelectItem key={organization.id} value={organization.quarter}>
                        {organization.quarter}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Select value={formData.department} onValueChange={value => handleChangeSelect("department", value)}>
                <Label>소속 부서</Label>
                <SelectTrigger>
                  <SelectValue placeholder="소속 부서" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {organizationData.map(organization => {
                      const isDepart = organization.quarter === formData.quarter;
                      if (isDepart) {
                        return organization.depart.map(depart => (
                          <SelectItem key={depart.id} value={depart.name}>
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
              <Select value={formData.team} onValueChange={value => handleChangeSelect("team", value)}>
                <Label>소속 팀</Label>
                <SelectTrigger>
                  <SelectValue placeholder="소속 팀" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {organizationData.map(organization => {
                      const isDepart = organization.quarter === formData.quarter;
                      if (isDepart) {
                        return organization.depart.map(depart => {
                          const isTeam = depart.name === formData.department;
                          if (isTeam) {
                            return depart.team.map(team => (
                              <SelectItem key={team.id} value={team.name}>
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
          <div className="space-y-1 grid grid-cols-3 gap-4">
            <div>
              <Select value={formData.position} onValueChange={value => handleChangeSelect("position", value)}>
                <Label>직책</Label>
                <SelectTrigger>
                  <SelectValue placeholder="직책" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {positionData.map(position => (
                      <SelectItem key={position.id} value="00부장">
                        {position.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Select value={formData.rank} onValueChange={value => handleChangeSelect("rank", value)}>
                <Label>직급</Label>
                <SelectTrigger>
                  <SelectValue placeholder="직급" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {rankData.map(rank => (
                      <SelectItem key={rank.id} value={rank.rank}>
                        {rank.rank}
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
                className={cn("w-[280px] justify-start text-left font-normal", !date && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={value => {
                  setDate(value);
                  handleSelectDate(value);
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </CardContent>
      </Card>
    );
  },
);

export default Department;
