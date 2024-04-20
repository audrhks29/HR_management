import { memo } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";

import { getSettingData } from "@/server/fetchReadData";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import Notification from "./notification/Notification";

const Info = memo(() => {
  const { data: settingData }: { data: SettingTypes } = useSuspenseQuery({
    queryKey: ["settingData"],
    queryFn: getSettingData,
  });

  const companyName = settingData?.business_setting.name_of_company;

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>{companyName}</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2">
        <Notification />
      </CardContent>
    </Card>
  );
});

export default Info;
