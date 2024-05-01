import { memo } from "react";

import MemberList from "@/shared/MemberList";
import { useParams } from "react-router-dom";

import { getMemberPersonalData, getMemberSalaryPersonalData } from "@/server/fetchReadData";
import { useSuspenseQueries } from "@tanstack/react-query";
import Select from "./SelectMember/Select";
import None from "./SelectMember/None";

type QueryResult<T> = {
  data: T;
};

type SuspenseQueriesResult = [QueryResult<MemberSalaryDataTypes>, QueryResult<MemberDataTypes>];

const Contents = memo(() => {
  const { employee_number } = useParams();

  const [{ data: memberSalaryPersonalData, refetch }, { data: memberPersonalData }] =
    useSuspenseQueries<SuspenseQueriesResult>({
      queries: [
        {
          queryKey: [`memberSalaryPersonalData/${employee_number}`],
          queryFn: () => getMemberSalaryPersonalData(employee_number),
        },
        {
          queryKey: [`memberPersonalData/${employee_number}`],
          queryFn: () => getMemberPersonalData(employee_number),
        },
      ],
    });
  // console.log(memberSalaryPersonalData);
  return (
    <div className="grid grid-cols-[2fr_1fr] gap-6">
      {memberPersonalData ? (
        <Select
          personalData={memberPersonalData}
          memberSalaryPersonalData={memberSalaryPersonalData}
          refetch={refetch}
        />
      ) : (
        <None />
      )}

      <MemberList menuLink="salary_status" height="850px" displayAmount={12} />
    </div>
  );
});

export default Contents;
