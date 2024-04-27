import { memo, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Button } from "@/components/ui/button";
import { getOrganizationData } from "@/server/fetchReadData";
import Contents from "./Contents";
import Edit from "./edit/Edit";
import { Card, CardContent } from "@/components/ui/card";

const Index = memo(() => {
  const [isEditMode, setIsEditMode] = useState(false);

  const { data: organizationData }: { data: OrganizationDataTypes[] } = useSuspenseQuery({
    queryKey: ["organizationData"],
    queryFn: getOrganizationData,
  });

  return (
    <>
      {organizationData?.length === 0 ? (
        <Card className="h-[850px] p-8">
          <CardContent className="flex flex-col items-center justify-center h-full">
            <p>데이터가 없습니다</p>

            <Button className="w-[100px] mt-3">등록</Button>
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue={organizationData[0]?.quarter}>
          {!isEditMode && (
            <TabsList>
              {organizationData.map((item, index) => (
                <TabsTrigger key={index} value={item.quarter} className="w-[200px]">
                  {item.quarter}
                </TabsTrigger>
              ))}
            </TabsList>
          )}

          {!isEditMode ? (
            organizationData.map((item, index) => <Contents key={index} data={item} />)
          ) : (
            <Edit organizationData={organizationData} setIsEditMode={setIsEditMode} />
          )}

          {!isEditMode && (
            <div className="text-right mt-3">
              <Button onClick={() => setIsEditMode(true)}>수정</Button>
            </div>
          )}
        </Tabs>
      )}
    </>
  );
});

export default Index;
