import { memo } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

import { userLogout } from "@/server/fetchUserData";

const Logout = memo(() => {
  const navigate = useNavigate();

  const { toast } = useToast();

  const onSubmit = async () => {
    toast({
      variant: "destructive",
      title: "로그아웃",
      description: "로그아웃 하시겠습니까?",
      action: (
        <>
          <ToastAction
            className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            onClick={submitData}
            altText="확인">
            확인
          </ToastAction>
          <ToastAction className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2" altText="취소">
            취소
          </ToastAction>
        </>
      ),
    });
  };

  const submitData = async () => {
    await userLogout();
    toast({
      description: "로그아웃 되었습니다",
    });
    navigate("/");
  };

  return (
    <div>
      <Button type="button" onClick={onSubmit}>
        로그아웃
      </Button>
    </div>
  );
});

export default Logout;
