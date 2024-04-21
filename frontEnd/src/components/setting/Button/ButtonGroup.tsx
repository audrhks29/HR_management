import { Button } from "@/components/ui/button";
import { memo } from "react";

const ButtonGroup = memo(() => {
  return (
    <div className="text-right">
      <Button>저장</Button>
    </div>
  );
});

export default ButtonGroup;
