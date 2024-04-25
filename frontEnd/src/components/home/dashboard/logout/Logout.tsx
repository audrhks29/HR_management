import { Button } from "@/components/ui/button";
import CustomConfirm from "@/shared/alert/CustomConfirm";
import useUserStore from "@/store/user-store";
import { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Logout = memo(() => {
  const { setUserInfo } = useUserStore();
  const navigate = useNavigate();

  const [confirmState, setConfirmState] = useState({
    popup: false,
    confirm: false,
  });

  useEffect(() => {
    if (confirmState.confirm) {
      setUserInfo();
      navigate("/");
    }

    setConfirmState({ popup: confirmState.popup, confirm: false });
  }, [confirmState.confirm]);

  const handleClickLogout = () => setConfirmState({ popup: true, confirm: false });
  return (
    <div>
      <Button type="submit" onClick={handleClickLogout}>
        로그아웃
      </Button>
      <CustomConfirm
        confirmState={confirmState}
        setConfirmState={setConfirmState}
        title="로그아웃"
        text="로그아웃 하시겠습니까?"
      />
    </div>
  );
});

export default Logout;
