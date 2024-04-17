import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Terminal } from "lucide-react";
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
        <Alert className="absolute top-0 right-0 w-96">
          <Terminal className="h-4 w-4" />
          <AlertTitle>{props.title}</AlertTitle>
          <AlertDescription>{props.text}</AlertDescription>
          <Button onClick={() => props.setAlertState(false)}>확인</Button>
        </Alert>
      )}
    </>
  );
});

export default CustomAlert;
