import { useTheme } from "@/components/mode/theme-provider";
import { Minus, X } from "lucide-react";
import { memo } from "react";

const Frame = memo(() => {
  const { theme } = useTheme();

  return (
    <div className="flex items-center bg-primary-foreground border-b border-primary/20 justify-between select-none">
      <div className="text-[14px] flex gap-3 h-[25px] items-center pl-4">
        <img src={`public/logo/logo_image_${theme === "light" ? "light" : "dark"}.png`} alt="" className="h-[22px]" />
        <img src={`public/logo/logo_${theme === "light" ? "light" : "dark"}.svg`} alt="" className="h-[16px]" />
      </div>
      <div className="flex items-center ">
        <div className="hover:bg-muted p-3 cursor-pointer">
          <Minus className="w-5 h-5" />
        </div>
        <div className="hover:bg-muted p-3 cursor-pointer">
          <X className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
});

export default Frame;
