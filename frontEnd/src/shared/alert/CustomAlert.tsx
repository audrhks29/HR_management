import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { memo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

interface PropsTypes {
  alertState: boolean;
  setAlertState: (state: boolean) => void;
  title: string;
  text: string;
}

const CustomAlert = memo((props: PropsTypes) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleClickYes = () => {
    props.setAlertState(false);
    if (pathname.includes("/hr_record/")) {
      navigate("/hr_record");
    }
  };

  return (
    <>
      {props.alertState && (
        <div className="fixed top-0 z-10 right-0 w-full h-full bg-black bg-opacity-50 flex justify-center">
          <Alert className="w-[500px] h-[180px] p-7 flex flex-col translate-y-3">
            <AlertTitle className="mb-3">{props.title}</AlertTitle>
            <AlertDescription>{props.text}</AlertDescription>
            <div className="text-right mt-auto">
              <Button type="button" onClick={handleClickYes}>
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
