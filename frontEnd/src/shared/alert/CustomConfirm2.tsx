import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction, memo } from "react";

interface PropsTypes {
  confirmState: { popup: boolean; confirmResult: boolean | undefined };
  setConfirmState: Dispatch<SetStateAction<{ popup: boolean; confirmResult: boolean | undefined }>>;
  title: string;
  text: string;
}

const CustomConfirm2 = memo((props: PropsTypes) => {
  const handleYes = () => {
    props.setConfirmState({ popup: true, confirmResult: true });
  };

  const handleNo = () => {
    props.setConfirmState({ popup: false, confirmResult: undefined });
  };

  return (
    <>
      {props.confirmState.popup && (
        <div className="fixed top-0 z-10 right-0 w-full h-full bg-black bg-opacity-50 flex justify-center">
          <Alert className="w-[500px] h-[180px] p-7 flex flex-col translate-y-3">
            <AlertTitle className="mb-3">{props.title}</AlertTitle>
            <AlertDescription>{props.text}</AlertDescription>
            <div className="text-right mt-auto">
              <Button className="mr-3" onClick={handleYes}>
                확인
              </Button>
              <Button onClick={handleNo}>취소</Button>
            </div>
          </Alert>
        </div>
      )}
    </>
  );
});

export default CustomConfirm2;
