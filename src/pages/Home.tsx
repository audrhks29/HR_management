import { memo } from "react";

import PageTitle from "@/shared/PageTitle";

const Home = memo(() => {
  return (
    <main>
      <PageTitle title="홈" />
    </main>
  );
});

export default Home;