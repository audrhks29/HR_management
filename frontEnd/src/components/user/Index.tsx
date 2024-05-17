import { memo } from "react";
import { Link } from "react-router-dom";

import { Building2, Settings } from "lucide-react";

import { Button } from "@/components/ui/button";

import { getSettingData } from "@/server/fetchReadData";
import { useSuspenseQuery } from "@tanstack/react-query";

const Index = memo(() => {
  const { data: settingData }: { data: SettingTypes } = useSuspenseQuery({
    queryKey: ["settingData"],
    queryFn: getSettingData,
  });

  const companyName = settingData?.business_setting?.name_of_company;

  return (
    <div className="flex border-r border-primary/20 items-center px-4 w-[250px]">
      <div className="flex items-center gap-2 font-semibold">
        <Building2 className="h-6 w-6" />

        <span className="">{companyName}</span>
      </div>
      <Link to={"/setting"} className="block ml-auto ">
        <Button variant="outline" size="icon" className="h-8 w-8">
          <Settings className="h-4 w-4" />
        </Button>
      </Link>
    </div>
  );
});

export default Index;
