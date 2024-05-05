import { memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useSuspenseQueries } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table";

import { getOrganizationData, getPositionData, getRankData } from "@/server/fetchReadData";
import { updateEduCareerData } from "@/server/fetchUpdateData";

type QueryResult<T> = {
  data: T;
};

type SuspenseQueriesResult = [
  QueryResult<RankSettingTypes[]>,
  QueryResult<OrganizationDataTypes[]>,
  QueryResult<PositionSettingTypes[]>,
];

const Edit = memo(
  ({
    personalData,
    refetch,
    setEditMode,
    setAlertState,
  }: {
    personalData: MemberDataTypes | undefined;
    refetch: () => void;
    setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
    setAlertState: React.Dispatch<React.SetStateAction<boolean>>;
  }) => {
    const { employee_number } = useParams();

    const navigate = useNavigate();

    const [defaultArmy, setDefaultArmy] = useState({
      division: personalData?.military.division,
      army: personalData?.military.army,
      rank: personalData?.military.rank,
    });

    const [defaultDepart, setDefaultDepart] = useState({
      quarter: personalData?.quarter,
      department: personalData?.department,
      team: personalData?.team,
      position: personalData?.position,
      rank: personalData?.rank,
    });

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

    const { register, handleSubmit, setValue, watch } = useForm<MemberPrivacyUpdateFormTypes>({
      defaultValues: {
        memberData: {
          employee_number: "",
          kor_name: "",
          eng_name: "",
          sex: "",
          email: "",
          phone_number: "",
          address: {
            address: "",
            jibun_address: "",
            zone_code: "",
            detail_address: "",
          },
          rrn_front: "",
          rrn_back: "",
          military: {
            division: "",
            army: "",
            rank: "",
          },
          quarter: "",
          department: "",
          team: "",
          position: "",
          rank: "",
          date_of_joining: "",
        },
      },
    });

    useEffect(() => {
      if (personalData) {
        setValue(`memberData`, {
          employee_number: personalData.employee_number,
          kor_name: personalData.kor_name,
          eng_name: personalData.eng_name,
          sex: personalData.sex,
          email: personalData.email,
          phone_number: personalData.phone_number,
          address: {
            address: personalData.address.address,
            jibun_address: personalData.address.jibun_address,
            zone_code: personalData.address.zone_code,
            detail_address: personalData.address.detail_address,
          },
          rrn_front: personalData.rrn_front,
          rrn_back: personalData.rrn_back,
          military: {
            division: personalData.military.division,
            army: personalData.military.army,
            rank: personalData.military.rank,
          },
          quarter: personalData.quarter,
          department: personalData.department,
          team: personalData.team,
          position: personalData.position,
          rank: personalData.rank,
          date_of_joining: personalData.date_of_joining,
        });
      }
    }, [employee_number]);

    const onSubmit = async (data: MemberPrivacyUpdateFormTypes) => {
      await updateEduCareerData(data, employee_number);
      refetch();
      setAlertState(true);
      setEditMode(false);
      const newParams = watch(`memberData.employee_number`);
      navigate(`/hr_record/${newParams}`);
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="mt-5 grid grid-cols-2 gap-3">
          <div className="col-span-2 gap-3">
            <Table className="border">
              <TableBody>
                <TableRow className="cursor-pointer h-[53px]">
                  <TableHead className="w-32 text-left border-r">주소</TableHead>
                  <TableCell className="grid grid-rows-2 gap-1 p-2">
                    <Input {...register(`memberData.address.address`, { required: true })} />
                    <Input {...register(`memberData.address.detail_address`, { required: true })} />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <Table className="text-center border">
            <TableBody>
              <TableRow className="cursor-pointer h-[53px]">
                <TableHead className="w-32 text-left border-r">핸드폰 번호</TableHead>
                <TableCell className="p-2">
                  <Input id={`memberData.phone_number`} {...register(`memberData.phone_number`, { required: true })} />
                </TableCell>
              </TableRow>

              <TableRow className="cursor-pointer h-[53px]">
                <TableHead className="w-32 text-left border-r">주민등록번호</TableHead>
                <TableCell className="p-2 flex items-center">
                  <Input id={`memberData.rrn_front`} {...register(`memberData.rrn_front`, { required: true })} />
                  &nbsp;-&nbsp;
                  <Input id={`memberData.rrn_back`} {...register(`memberData.rrn_back`, { required: true })} />
                </TableCell>
              </TableRow>

              <TableRow className="cursor-pointer h-[53px]">
                <TableHead className="w-32 text-left border-r">이메일</TableHead>
                <TableCell className="p-2">
                  <Input id={`memberData.email`} {...register(`memberData.email`)} />
                </TableCell>
              </TableRow>

              <TableRow className="cursor-pointer h-[53px]">
                <TableHead className="w-32 text-left border-r">병역</TableHead>
                <TableCell className="p-2 grid grid-rows-3 gap-1">
                  <Select
                    defaultValue={defaultArmy.army}
                    onValueChange={value => {
                      setValue(`memberData.military.army`, value);
                    }}>
                    <SelectTrigger>
                      <SelectValue placeholder={defaultArmy.army} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="육군">육군</SelectItem>
                        <SelectItem value="해군">해군</SelectItem>
                        <SelectItem value="공군">공군</SelectItem>
                        <SelectItem value="해병대">해병대</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <Select
                    defaultValue={defaultArmy.rank}
                    onValueChange={value => {
                      setValue(`memberData.military.rank`, value);
                    }}>
                    <SelectTrigger>
                      <SelectValue placeholder={defaultArmy.rank} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="대령">대령</SelectItem>
                        <SelectItem value="중령">중령</SelectItem>
                        <SelectItem value="소령">소령</SelectItem>
                        <SelectItem value="대위">대위</SelectItem>
                        <SelectItem value="중위">중위</SelectItem>
                        <SelectItem value="소위">소위</SelectItem>
                        <SelectItem value="상사">상사</SelectItem>
                        <SelectItem value="중사">중사</SelectItem>
                        <SelectItem value="하사">하사</SelectItem>
                        <SelectItem value="병장">병장</SelectItem>
                        <SelectItem value="상병">상병</SelectItem>
                        <SelectItem value="일병">일병</SelectItem>
                        <SelectItem value="이병">이병</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <Select
                    defaultValue={defaultArmy.division}
                    onValueChange={value => {
                      setValue(`memberData.military.division`, value);
                    }}>
                    <SelectTrigger>
                      <SelectValue placeholder={defaultArmy.division} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="군필">군필</SelectItem>
                        <SelectItem value="미필">미필</SelectItem>
                        <SelectItem value="해당없음">해당없음</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Table className="text-center border">
            <TableBody>
              <TableRow className="cursor-pointer h-[53px]">
                <TableHead className="w-24 text-left border-r">사원번호</TableHead>
                <TableCell className="p-2">
                  <Input
                    id={`memberData.employee_number`}
                    {...register(`memberData.employee_number`, { required: true })}
                  />
                </TableCell>
              </TableRow>

              <TableRow className="cursor-pointer h-[53px]">
                <TableHead className="w-24 text-left border-r">소속 관할</TableHead>
                <TableCell className="p-2">
                  <Select
                    defaultValue={defaultDepart.quarter}
                    onValueChange={value => {
                      setValue(`memberData.quarter`, value);
                      setDefaultDepart({ ...defaultDepart, quarter: value });
                    }}>
                    <SelectTrigger>
                      <SelectValue placeholder={defaultDepart.quarter} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value={" "}>없음</SelectItem>
                        {organizationData.map((organization, index) => (
                          <SelectItem key={index} value={organization.quarter}>
                            {organization.quarter}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>

              <TableRow className="cursor-pointer h-[53px]">
                <TableHead className="w-24 text-left border-r">소속 부서</TableHead>
                <TableCell className="p-2">
                  <Select
                    defaultValue={defaultDepart.department}
                    onValueChange={value => {
                      setValue(`memberData.department`, value);
                      setDefaultDepart({ ...defaultDepart, department: value });
                    }}>
                    <SelectTrigger>
                      <SelectValue placeholder={defaultDepart.department} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value={" "}>없음</SelectItem>
                        {organizationData.map(organization => {
                          const isDepart = organization.quarter === defaultDepart.quarter;
                          if (isDepart) {
                            return organization.depart.map((depart, index) => (
                              <SelectItem key={index} value={depart.name}>
                                {depart.name}
                              </SelectItem>
                            ));
                          }
                        })}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>

              <TableRow className="cursor-pointer h-[53px]">
                <TableHead className="w-24 text-left border-r">소속 팀</TableHead>
                <TableCell className="p-2">
                  <Select
                    defaultValue={defaultDepart.team}
                    onValueChange={value => {
                      setValue(`memberData.team`, value);
                      setDefaultDepart({ ...defaultDepart, team: value });
                    }}>
                    <SelectTrigger>
                      <SelectValue placeholder={defaultDepart.team} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value={" "}>없음</SelectItem>
                        {organizationData.map(organization => {
                          const isDepart = organization.quarter === defaultDepart.quarter;
                          if (isDepart) {
                            return organization.depart.map(depart => {
                              const isTeam = depart.name === defaultDepart.department;
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
                </TableCell>
              </TableRow>

              <TableRow className="cursor-pointer h-[53px]">
                <TableHead className="w-24 text-left border-r">직책</TableHead>
                <TableCell className="p-2">
                  <Select
                    defaultValue={defaultDepart.position}
                    onValueChange={value => {
                      setValue(`memberData.position`, value);
                    }}>
                    <SelectTrigger>
                      <SelectValue placeholder={defaultDepart.position} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {positionData.map((position, index) => (
                          <SelectItem key={index} value={position.name}>
                            {position.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>

              <TableRow className="cursor-pointer h-[53px]">
                <TableHead className="w-24 text-left border-r">직급</TableHead>
                <TableCell className="p-2">
                  <Select
                    defaultValue={defaultDepart.rank}
                    onValueChange={value => {
                      setValue(`memberData.rank`, value);
                    }}>
                    <SelectTrigger>
                      <SelectValue placeholder={defaultDepart.rank} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {rankData?.map((rank, index) => (
                          <SelectItem key={index} value={rank.value}>
                            {rank.value}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>

              <TableRow className="cursor-pointer h-[53px]">
                <TableHead className="w-24 text-left border-r">입사일</TableHead>
                <TableCell className="p-2">
                  <Input
                    type="text"
                    id={`memberData.date_of_joining`}
                    {...register(`memberData.date_of_joining`, {
                      pattern: {
                        value: /(\d{4})년 (\d{2})월 (\d{2})일$/,
                        message: "알맞은 형식을 입력해주세요. 예) 2020년 01월 01일",
                      },
                    })}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>

        <div className="text-right">
          <Button type="submit">수정완료</Button>
        </div>
      </form>
    );
  },
);

export default Edit;
