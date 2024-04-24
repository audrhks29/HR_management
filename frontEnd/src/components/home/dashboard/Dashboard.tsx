import { memo, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";

import { getSettingData } from "@/server/fetchReadData";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TotalSalary from "./chart/TotalSalary";
import EmployeeCount from "./chart/EmployeeCount";
import { Building2 } from "lucide-react";
import EmployeeBirthday from "./board/EmployeeBirthday";
import { Calendar } from "@/components/ui/calendar";

const Dashboard = memo(() => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { data: settingData }: { data: SettingTypes } = useSuspenseQuery({
    queryKey: ["settingData"],
    queryFn: getSettingData,
  });

  const companyName = settingData?.business_setting.name_of_company;

  return (
    <Card className="col-span-2 p-5">
      <CardHeader>
        <CardTitle className="flex">
          <Building2 className="mr-3" />
          <span>{companyName}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-row gap-6">
        <div className="grid grid-cols-2 gap-6">
          <TotalSalary />
          <EmployeeCount />
        </div>
        <div className="grid grid-cols-3 gap-6">
          <EmployeeBirthday />
          <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
        </div>
      </CardContent>
    </Card>
  );
});

export default Dashboard;
