import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction, memo } from "react";

interface PropsTypes {
  confirmState: { popup: boolean; confirm: boolean };
  setConfirmState: Dispatch<SetStateAction<{ popup: boolean; confirm: boolean }>>;
  title: string;
  text: string;
}

/*

[ 부모컴포넌트에서 필요한 상태 ]
const [confirmState, setConfirmState] = useState({
  popup: false,
  confirm: false,
});
------------------------------------------
[ 부모컴포넌트에서 실행하는 함수 ]
  const 함수이름 = () => {
    setConfirmState({ popup: true, confirm: false });
  };
------------------------------------------
[ 부모컴포넌트에서 실행할 useEffect ]
useEffect(() => {
  if (confirmState.confirm) {
    함수실행
  }
  setConfirmState({ popup: confirmState.popup, confirm: false });
}, [confirmState.confirm]);
------------------------------------------
[ 부모컴포넌트에서 필요한 props ]
  <CustomConfirm
    confirmState={confirmState}
    setConfirmState={setConfirmState}
    title="타이틀"
    text="텍스트"
  />
*/

const CustomConfirm = memo((props: PropsTypes) => {
  return (
    <>
      {props.confirmState.popup && (
        <div className="fixed top-0 right-0 w-full h-full bg-black bg-opacity-50 flex justify-center">
          <Alert className="w-[500px] h-[180px] p-7 flex flex-col translate-y-3">
            <AlertTitle className="mb-3">{props.title}</AlertTitle>
            <AlertDescription>{props.text}</AlertDescription>
            <div className="text-right mt-auto">
              <Button className="mr-3" onClick={() => props.setConfirmState({ popup: false, confirm: true })}>
                확인
              </Button>
              <Button onClick={() => props.setConfirmState({ popup: false, confirm: false })}>취소</Button>
            </div>
          </Alert>
        </div>
      )}
    </>
  );
});

export default CustomConfirm;
