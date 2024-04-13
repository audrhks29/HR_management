import { memo } from "react";

import MemberList from "@/shared/MemberList";
import { useParams } from "react-router-dom";
import Select from "./SelectMember/Select";
import None from "./SelectMember/None";
import { getMemberPersonalData, getSalaryData } from "@/server/fetchReadData";
import { useSuspenseQueries } from "@tanstack/react-query";

type QueryResult<T> = {
  data: T;
};

type SuspenseQueriesResult = [QueryResult<SalaryDataTypes[]>, QueryResult<MemberDataTypes>];

const Contents = memo(() => {
  const { employee_number } = useParams();

  const [{ data: salaryData }, { data: memberPersonalData }] = useSuspenseQueries<SuspenseQueriesResult>({
    queries: [
      {
        queryKey: ["salaryData"],
        queryFn: getSalaryData,
      },
      {
        queryKey: [`memberPersonalData/${employee_number}`],
        queryFn: () => getMemberPersonalData(employee_number),
      },
    ],
  });

  return (
    <div className="grid grid-cols-[2fr_1fr] gap-6">
      {memberPersonalData ? <Select personalData={memberPersonalData} salaryData={salaryData} /> : <None />}

      <MemberList menuLink="salary_history" height="850px" displayAmount={12} />
    </div>
  );
});

export default Contents;
