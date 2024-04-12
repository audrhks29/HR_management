import { memo } from "react";

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Bell, Package2 } from "lucide-react";

const User = memo(() => {
  return (
    <div className="flex border-r border-primary/40 items-center px-4 w-[250px]">
      <Link to="/login" className="flex items-center gap-2 font-semibold">
        <Package2 className="h-6 w-6" />
        <span className="">이름</span>
      </Link>
      <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
        <Bell className="h-4 w-4" />
        <span className="sr-only">Toggle notifications</span>
      </Button>
    </div>
  );
});

export default User;
