import { memo } from "react";

import { useSuspenseQuery } from "@tanstack/react-query";

import Business from "./business/Business";
import Rank from "./rank/Rank";

import { getSettingData } from "@/server/fetchReadData";
import Position from "./position/Position";

const Index = memo(() => {
  const { data: settingData, refetch }: { data: SettingTypes; refetch: () => void } = useSuspenseQuery({
    queryKey: ["settingData"],
    queryFn: getSettingData,
  });

  return (
    <div className="grid gap-6">
      <Business data={settingData.business_setting} refetch={refetch} />
      <div className="grid grid-cols-2 gap-6">
        <Position data={settingData.position_setting} refetch={refetch} />
        <Rank data={settingData.rank_setting} refetch={refetch} />
      </div>
    </div>
  );
});

export default Index;
