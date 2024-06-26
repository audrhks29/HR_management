import { TabsContent } from "@/components/ui/tabs";
import { memo } from "react";

import MemberList from "@/shared/MemberList";

import { getMemberPersonalData } from "@/server/fetchReadData";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Privacy from "./menu/privacy/Privacy";
import Career from "./menu/career/Career";

const Contents = memo(() => {
  const { employee_number } = useParams();

  const { data: memberPersonalData, refetch }: { data: MemberDataTypes | undefined; refetch: () => void } =
    useSuspenseQuery({
      queryKey: [`memberPersonalData/${employee_number}`],
      queryFn: () => getMemberPersonalData(employee_number),
    });

  return (
    <div className="mt-5">
      <TabsContent value="info" className="grid grid-cols-[2fr_1fr] gap-6">
        <Privacy personalData={memberPersonalData} refetch={refetch} />
        <MemberList menuLink="hr_record" height="790px" displayAmount={11} />
      </TabsContent>

      <TabsContent value="edu_career">
        <Career personalData={memberPersonalData} refetch={refetch} />
      </TabsContent>
    </div>
  );
});

export default Contents;
