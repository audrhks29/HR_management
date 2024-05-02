import { memo } from "react";

import MemberList from "@/shared/MemberList";
import { useParams } from "react-router-dom";
import Select from "./SelectMember/Select";
import None from "./SelectMember/None";
import {
  getMemberPersonalData,
  getPersonalSalaryData,
  getPersonalAttitudeData,
  getMemberSalaryPersonalData,
} from "@/server/fetchReadData";
import { useSuspenseQueries } from "@tanstack/react-query";

type QueryResult<T> = {
  data: T;
};

type SuspenseQueriesResult = [
  QueryResult<SalaryDataTypes>,
  QueryResult<MemberDataTypes>,
  QueryResult<WorkTypes>,
  QueryResult<MemberSalaryDataTypes>,
];

const Contents = memo(() => {
  const { employee_number } = useParams();

  const [
    { data: personalSalaryData },
    { data: memberPersonalData },
    { data: personalAttitudeData },
    { data: memberSalaryPersonalData },
  ] = useSuspenseQueries<SuspenseQueriesResult>({
    queries: [
      {
        queryKey: [`personalSalaryData/${employee_number}`],
        queryFn: () => getPersonalSalaryData(employee_number),
      },
      {
        queryKey: [`memberPersonalData/${employee_number}`],
        queryFn: () => getMemberPersonalData(employee_number),
      },
      {
        queryKey: [`personalAttitudeData/${employee_number}`],
        queryFn: () => getPersonalAttitudeData(employee_number),
      },
      {
        queryKey: [`memberSalaryPersonalData/${employee_number}`],
        queryFn: () => getMemberSalaryPersonalData(employee_number),
      },
    ],
  });

  return (
    <div className="grid grid-cols-[2fr_1fr] gap-6">
      {memberPersonalData ? (
        <Select
          personalMemberData={memberPersonalData}
          personalSalaryData={personalSalaryData}
          personalAttitudeData={personalAttitudeData}
          memberSalaryPersonalData={memberSalaryPersonalData}
        />
      ) : (
        <None />
      )}

      <MemberList menuLink="salary_edit" height="850px" displayAmount={12} />
    </div>
  );
});

export default Contents;
