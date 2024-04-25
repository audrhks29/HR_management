import { memo, useState } from "react";
import { useSuspenseQueries } from "@tanstack/react-query";

import { getMemberData, getSalaryData, getSettingData } from "@/server/fetchReadData";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TotalSalary from "./chart/TotalSalary";
import EmployeeCount from "./chart/EmployeeCount";
import { Building2 } from "lucide-react";
import EmployeeBirthday from "./board/EmployeeBirthday";
import { Calendar } from "@/components/ui/calendar";
import Logout from "./logout/Logout";
import CommuteTime from "./chart/CommuteTime";

type QueryResult<T> = {
  data: T;
};

type SuspenseQueriesResult = [
  QueryResult<SettingTypes>,
  QueryResult<MemberDataTypes[]>,
  QueryResult<SalaryDataTypes[]>,
];

const Dashboard = memo(() => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const [{ data: settingData }, { data: memberData }, { data: salaryData }] = useSuspenseQueries<SuspenseQueriesResult>(
    {
      queries: [
        { queryKey: ["settingData"], queryFn: getSettingData },
        { queryKey: ["memberData"], queryFn: getMemberData },
        {
          queryKey: ["salaryData"],
          queryFn: getSalaryData,
        },
      ],
    },
  );

  const companyName = settingData?.business_setting.name_of_company;

  return (
    <Card className="col-span-2 p-5">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex">
            <Building2 className="mr-3" />
            <span>{companyName}</span>
          </div>
          <Logout />
        </CardTitle>
      </CardHeader>

      <CardContent className="grid grid-row gap-6">
        <div className="grid grid-cols-[1fr_1fr_280px] gap-6 h-[316px]">
          <TotalSalary settingData={settingData} salaryData={salaryData} />
          <EmployeeCount settingData={settingData} memberData={memberData} />
          <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <EmployeeBirthday />
          <CommuteTime />
        </div>
      </CardContent>
    </Card>
  );
});

export default Dashboard;
