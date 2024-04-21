import React, { memo } from "react";

import { useSuspenseQuery } from "@tanstack/react-query";

import Business from "./business/Business";
import CommuteTime from "./commuteTime/CommuteTime";
import Rank from "./rank/Rank";

import { getSettingData } from "@/server/fetchReadData";

const Index = memo(() => {
  const { data: settingData }: { data: SettingTypes } = useSuspenseQuery({
    queryKey: ["settingData"],
    queryFn: getSettingData,
  });
  return (
    <React.Fragment>
      <Business data={settingData.business_setting} />
      <CommuteTime data={settingData.commute_setting} />
      <Rank data={settingData.rank_setting} />
    </React.Fragment>
  );
});

export default Index;
