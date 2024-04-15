import { memo } from "react";

import { Button } from "@/components/ui/button";
import { Bell, Package2 } from "lucide-react";
import useUserStore from "@/store/user-store";

const Index = memo(() => {
  const { userInfo } = useUserStore();

  return (
    <div className="flex border-r border-primary/40 items-center px-4 w-[250px]">
      <div className="flex items-center gap-2 font-semibold">
        <Package2 className="h-6 w-6" />
        <span className="">{userInfo ? userInfo.business_info.name_of_company : "로그인"}</span>
      </div>
      <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
        <Bell className="h-4 w-4" />
        <span className="sr-only">Toggle notifications</span>
      </Button>
    </div>
  );
});

export default Index;
