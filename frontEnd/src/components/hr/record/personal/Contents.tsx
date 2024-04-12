import { TabsContent } from "@/components/ui/tabs";
import { memo } from "react";

import MemberList from "@/shared/MemberList";
import Privacy from "./menu/Privacy";
import Career from "./menu/Career";
import { getPersonalData } from "@/server/fetchReadData";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const Contents = memo(() => {
  const { employee_number } = useParams();

  const { data: personalData }: { data: MemberDataTypes | undefined } = useSuspenseQuery({
    queryKey: [`personalData/${employee_number}`],
    queryFn: () => getPersonalData(employee_number),
  });

  return (
    <div className="mt-5">
      <TabsContent value="info" className="grid grid-cols-[2fr_1fr] gap-6">
        <Privacy personalData={personalData} />
        <MemberList menuLink="hr_record" height="800px" displayAmount={11} />
      </TabsContent>

      <TabsContent value="edu_career" className="grid grid-cols-[2fr_1fr] gap-6">
        <Career personalData={personalData} />
        <MemberList menuLink="hr_record" height="800px" displayAmount={11} />
      </TabsContent>
    </div>
  );
});

export default Contents;
