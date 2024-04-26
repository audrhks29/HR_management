import React, { memo } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Button } from "@/components/ui/button";
import { getOrganizationData } from "@/server/fetchReadData";
import Contents from "./Contents";

const Index = memo(() => {
  const { data: organizationData }: { data: OrganizationDataTypes[] } = useSuspenseQuery({
    queryKey: ["organizationData"],
    queryFn: getOrganizationData,
  });

  return (
    <Tabs className="w-full" defaultValue={organizationData[0].quarter}>
      <TabsList className="grid grid-cols-2 w-[400px]">
        {organizationData.map((item, index) => (
          <TabsTrigger key={index} value={item.quarter}>
            {item.quarter}
          </TabsTrigger>
        ))}
      </TabsList>

      {organizationData.map((item, index) => (
        <Contents key={index} data={item} />
      ))}

      <div className="text-right mt-3">
        <Button className="mr-3">수정</Button>
        <Button>추가</Button>
      </div>
    </Tabs>
  );
});

export default Index;
