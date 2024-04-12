import { memo } from "react";

import MemberList from "@/shared/MemberList";
import { useParams } from "react-router-dom";
import Select from "./SelectMember/Select";
import None from "./SelectMember/None";
import { getPersonalData, getSalaryData } from "@/server/fetchReadData";
import { useSuspenseQueries } from "@tanstack/react-query";

type QueryResult<T> = {
  data: T;
};

type SuspenseQueriesResult = [QueryResult<SalaryDataTypes[]>, QueryResult<MemberDataTypes>];

const Contents = memo(() => {
  const { employee_number } = useParams();

  const [{ data: salaryData }, { data: personalData }] = useSuspenseQueries<SuspenseQueriesResult>({
    queries: [
      {
        queryKey: ["salaryData"],
        queryFn: getSalaryData,
      },
      {
        queryKey: [`personalData/${employee_number}`],
        queryFn: () => getPersonalData(employee_number),
      },
    ],
  });

  return (
    <div className="grid grid-cols-[2fr_1fr] gap-6">
      {personalData ? <Select personalData={personalData} salaryData={salaryData} /> : <None />}

      <MemberList menuLink="salary_history" height="850px" displayAmount={12} />
    </div>
  );
});

export default Contents;
