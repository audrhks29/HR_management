import React, { memo } from "react";

import { useSuspenseQuery } from "@tanstack/react-query";

import Business from "./business/Business";
import Rank from "./rank/Rank";

import { getSettingData } from "@/server/fetchReadData";

const Index = memo(() => {
  const { data: settingData, refetch }: { data: SettingTypes; refetch: () => void } = useSuspenseQuery({
    queryKey: ["settingData"],
    queryFn: getSettingData,
  });

  return (
    <React.Fragment>
      <Business data={settingData.business_setting} refetch={refetch} />
      <Rank data={settingData.rank_setting} refetch={refetch} />
    </React.Fragment>
  );
});

export default Index;
