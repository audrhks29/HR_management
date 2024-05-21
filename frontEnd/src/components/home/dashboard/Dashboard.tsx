import { memo, useEffect, useState } from "react";
import { useSuspenseQueries } from "@tanstack/react-query";

import { getMemberData, getOrganizationData, getSalaryData, getSettingData } from "@/server/fetchReadData";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TotalSalary from "./chart/TotalSalary";
import EmployeeCount from "./chart/EmployeeCount";
import { Building2 } from "lucide-react";
import EmployeeBirthday from "./board/EmployeeBirthday";
import { Calendar } from "@/components/ui/calendar";
import Logout from "./logout/Logout";
import CommuteTime from "./chart/CommuteTime";
import { getCurrentLoggedUser } from "@/server/fetchUserData";
import { postSettingBusinessData } from "@/server/fetchCreateData";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

type QueryResult<T> = {
  data: T;
};

type SuspenseQueriesResult = [
  QueryResult<SettingTypes>,
  QueryResult<MemberDataTypes[]>,
  QueryResult<SalaryDataTypes[]>,
  QueryResult<OrganizationDataTypes[]>,
  QueryResult<SignDataTypes>,
];

const Dashboard = memo(() => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const navigate = useNavigate();
  const { toast } = useToast();
  const user_id = sessionStorage.getItem("user_id");

  const [
    { data: settingData, refetch },
    { data: memberData },
    { data: salaryData },
    { data: organizationData },
    { data: currentUserData },
  ] = useSuspenseQueries<SuspenseQueriesResult>({
    queries: [
      { queryKey: ["settingData"], queryFn: getSettingData },
      { queryKey: ["memberData"], queryFn: getMemberData },
      {
        queryKey: ["salaryData"],
        queryFn: getSalaryData,
      },
      {
        queryKey: ["organizationData"],
        queryFn: getOrganizationData,
      },
      {
        queryKey: ["currentUserData"],
        queryFn: () => getCurrentLoggedUser(user_id),
      },
    ],
  });

  useEffect(() => {
    const hasBusinessSetting = settingData?.business_setting;

    if (!hasBusinessSetting) {
      postSettingBusinessData(currentUserData.business);
      refetch();
    }

    if (organizationData.length === 0) {
      toast({
        title: "조직도가 등록되지 않았습니다.",
        description: "원할한 사용을 위해 조직도를 등록해주세요",
        action: (
          <ToastAction
            className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            onClick={() => navigate("/hr_organization_chart")}
            altText="확인">
            확인
          </ToastAction>
        ),
      });
    }
  }, []);

  const companyName = settingData?.business_setting?.name_of_company;

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
