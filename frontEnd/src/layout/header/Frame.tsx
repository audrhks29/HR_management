import { useTheme } from "@/components/mode/theme-provider";
import { Minus, X } from "lucide-react";
import { memo } from "react";
import { useLocation } from "react-router-dom";

const Frame = memo(() => {
  const { theme } = useTheme();
  const location = useLocation();

  const handleMinimize = () => {
    if (location.pathname.includes("/salary_history_personal")) window.customFrameAPI.minimizeSalaryPersonalWindow();
    else if (location.pathname === "/post") window.customFrameAPI.minimizePostWindow();
    else window.customFrameAPI.minimizeWindow();
  };

  const handleClose = () => {
    if (location.pathname.includes("/salary_history_personal")) window.customFrameAPI.closeSalaryPersonalWindow();
    else if (location.pathname === "/post") window.customFrameAPI.closePostWindow();
    else window.customFrameAPI.closeWindow();
  };

  return (
    <div className="grid grid-cols-[1fr_auto] bg-primary-foreground border-b border-primary/20 select-none">
      <div className="h-10 flex items-center dragable">
        <div className="text-[14px] flex gap-3 items-center pl-4">
          <img src={`logo/logo_image_${theme === "light" ? "light" : "dark"}.png`} alt="" className="h-[22px]" />
          <img src={`logo/logo_${theme === "light" ? "light" : "dark"}.svg`} alt="" className="h-[16px]" />
        </div>
      </div>

      <div className="flex items-center">
        <div className="hover:bg-muted p-3 cursor-pointer" onClick={handleMinimize}>
          <Minus className="w-5 h-5" />
        </div>
        <div className="hover:bg-muted p-3 cursor-pointer" onClick={handleClose}>
          <X className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
});

export default Frame;
