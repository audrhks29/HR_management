import React, { memo } from "react";

import Business from "./business/Business";
import CommuteTime from "./commuteTime/CommuteTime";
import Rank from "./rank/Rank";

const Index = memo(() => {
  return (
    <React.Fragment>
      <Business />
      <CommuteTime />
      <Rank />
    </React.Fragment>
  );
});

export default Index;
