import { Button } from "@/components/ui/button";
import CustomConfirm from "@/shared/alert/CustomConfirm";
import useUserStore from "@/store/user-store";
import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";

const Logout = memo(() => {
  const { setUserInfo } = useUserStore();

  const [confirmState, setConfirmState] = useState<{ popup: boolean; confirmResult: boolean | undefined }>({
    popup: false,
    confirmResult: undefined,
  });

  const navigate = useNavigate();

  const showPopup = () => {
    setConfirmState({ popup: true, confirmResult: undefined });
  };

  const waitForUserConfirmation = () => {
    return new Promise<boolean>((resolve, reject) => {
      if (confirmState.confirmResult) resolve(true);
      else resolve(false);
    });
  };

  const onSubmit = async () => {
    showPopup();
    const confirm = await waitForUserConfirmation();
    if (confirm) {
      setUserInfo();
      setConfirmState({ popup: false, confirmResult: undefined });
      navigate("/");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <CustomConfirm
        confirmState={confirmState}
        setConfirmState={setConfirmState}
        title="로그아웃"
        text="로그아웃 하시겠습니까?"
      />
      <Button type="submit">로그아웃</Button>
    </form>
  );
});

export default Logout;
