import { useSuspenseQueries } from "@tanstack/react-query";
import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { getOrganizationData, getPositionData, getRankData } from "@/server/fetchReadData";

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
  errors,
}: {
  register: UseFormRegister<MemberRegistrationFormTypes>;
  setValue: UseFormSetValue<MemberRegistrationFormTypes>;
  watch: UseFormWatch<MemberRegistrationFormTypes>;
  errors: FieldErrors<MemberRegistrationFormTypes>;
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

  const watchQuarter = watch("employeeData.quarter");
  const watchDepart = watch("employeeData.department");

  return (
    <Card className="p-8">
      <CardHeader>
        <CardTitle>부서정보</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {/* 사원번호 입력 */}
        <div className="space-y-1 w-3/5">
          <Label htmlFor="employee_number">사원번호</Label>
          <Input
            id="employee_number"
            {...register("employeeData.employee_number", {
              required: "사원번호를 입력해주세요.",
              maxLength: {
                value: 16,
                message: "16자리 이내로 입력해주세요",
              },
            })}
          />
          <ErrorMessage
            errors={errors}
            name="employeeData.employee_number"
            render={({ message }) => <p className="text-destructive font-bold text-[12px]">{message}</p>}
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
        <div className="space-y-1 w-2/5">
          <Label>입사일자</Label>
          <Input
            id={`employeeData.date_of_joining`}
            type="text"
            placeholder="2020년 01월 01일"
            {...register(`employeeData.date_of_joining`, {
              required: "입사일자를 입력해주세요.",
              pattern: {
                value: /(\d{4})년 (\d{2})월 (\d{2})일$/,
                message: "알맞은 형식을 입력해주세요. 예) 2020년 01월 01일",
              },
            })}
          />
          <ErrorMessage
            errors={errors}
            name="employeeData.date_of_joining"
            render={({ message }) => <p className="text-destructive font-bold text-[12px]">{message}</p>}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default Department;
