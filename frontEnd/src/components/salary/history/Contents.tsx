import { memo } from 'react';

import MemberList from '@/shared/MemberList';
import { useParams } from 'react-router-dom';
import Select from './SelectMember/Select';
import None from './SelectMember/None';
import { getMemberData, getSalaryData } from '@/server/fatchData';
import { useSuspenseQueries } from '@tanstack/react-query';

type QueryResult<T> = {
  data: T;
};

type SuspenseQueriesResult = [
  QueryResult<MemberDataTypes[]>,
  QueryResult<SalaryDataTypes[]>
];

const Contents = memo(() => {
  const { employee_number } = useParams();

  const [{ data: memberData }, { data: salaryData }] = useSuspenseQueries<SuspenseQueriesResult>({
    queries: [
      {
        queryKey: ["memberData"],
        queryFn: getMemberData,
      },
      {
        queryKey: ["salaryData"],
        queryFn: getSalaryData,
      }
    ]
  });

  const personalData = memberData.find(member => member.employee_number === employee_number)

  return (
    <div className='grid grid-cols-[2fr_1fr] gap-6'>
      {personalData
        ? <Select
          personalData={personalData}
          salaryData={salaryData}
        />
        : <None />}

      <MemberList
        menuLink="salary_history"
        height='850px'
        displayAmount={12} />
    </div>
  );
})


export default Contents;