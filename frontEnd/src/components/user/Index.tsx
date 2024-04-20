import { memo } from "react";

import { Button } from "@/components/ui/button";
import { Building2, Settings } from "lucide-react";
import useUserStore from "@/store/user-store";
import { Link } from "react-router-dom";

const Index = memo(() => {
  const { userInfo } = useUserStore();

  return (
    <div className="flex border-r border-primary/40 items-center px-4 w-[250px]">
      <div className="flex items-center gap-2 font-semibold">
        <Building2 className="h-6 w-6" />

        {/* 임시 */}
        <span className="">{userInfo ? userInfo.business_info.name_of_company : "임시"}</span>
      </div>
      <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
        <Link to={"/setting"}>
          <Settings className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
});

export default Index;
