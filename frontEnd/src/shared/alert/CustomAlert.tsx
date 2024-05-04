import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { memo } from "react";

interface PropsTypes {
  alertState: boolean;
  setAlertState: (state: boolean) => void;
  title: string;
  text: string;
}

const CustomAlert = memo((props: PropsTypes) => {
  return (
    <>
      {props.alertState && (
        <div className="fixed top-0 z-10 right-0 w-full h-full bg-black bg-opacity-50 flex justify-center">
          <Alert className="w-[500px] h-[180px] p-7 flex flex-col translate-y-3">
            <AlertTitle className="mb-3">{props.title}</AlertTitle>
            <AlertDescription>{props.text}</AlertDescription>
            <div className="text-right mt-auto">
              <Button type="button" onClick={() => props.setAlertState(false)}>
                확인
              </Button>
            </div>
          </Alert>
        </div>
      )}
    </>
  );
});

export default CustomAlert;
