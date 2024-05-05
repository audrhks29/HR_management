import { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Display from "./DisPlay";
import Edit from "./Edit";

import { Card } from "@/components/ui/card";
import PersonalTitle from "@/shared/PersonalTitle";
import { Button } from "@/components/ui/button";
import CustomAlert from "@/shared/alert/CustomAlert";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  deletePersonalMemberData,
  deletePersonalMemberSalaryData,
  deletePersonalSalaryData,
  deletePersonalWorkData,
} from "@/server/fetchDeleteData";

const Privacy = memo(
  ({ personalData, refetch }: { personalData: MemberDataTypes | undefined; refetch: () => void }) => {
    const { employee_number } = useParams();
    const [editMode, setEditMode] = useState(false);
    const [alertState, setAlertState] = useState(false);
    const [deleteAlertState, setDeleteAlertState] = useState(false);

    useEffect(() => {
      setEditMode(false);
    }, [employee_number]);

    const handleClickDelete = async () => {
      setDeleteAlertState(true);
      await deletePersonalMemberData(employee_number);
      await deletePersonalWorkData(employee_number);
      await deletePersonalMemberSalaryData(employee_number);
      await deletePersonalSalaryData(employee_number);
      refetch();
    };

    return (
      <Card className="min-h-[800px] p-8">
        <PersonalTitle personalData={personalData}>
          <div>
            {editMode ? (
              <Button type="button" className="mr-3" onClick={() => setEditMode(!editMode)}>
                취소
              </Button>
            ) : (
              <Button type="button" className="mr-3" onClick={() => setEditMode(!editMode)}>
                수정
              </Button>
            )}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                  전체 삭제
                </TooltipTrigger>
                <TooltipContent className="text-destructive p-5">
                  <p>삭제 시 복구하실 수 없습니다</p>
                  <p>그래도 삭제하시겠습니까?</p>
                  <div className="mt-3 text-right">
                    <Button type="button" onClick={handleClickDelete}>
                      전체 삭제
                    </Button>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </PersonalTitle>
        {editMode ? (
          <Edit personalData={personalData} refetch={refetch} setEditMode={setEditMode} setAlertState={setAlertState} />
        ) : (
          <Display personalData={personalData} />
        )}

        <CustomAlert
          alertState={alertState}
          setAlertState={setAlertState}
          title="수정 완료"
          text="데이터가 수정되었습니다."
        />

        <CustomAlert
          alertState={deleteAlertState}
          setAlertState={setDeleteAlertState}
          title="삭제 완료"
          text="데이터가 삭제되었습니다."
        />
      </Card>
    );
  },
);

export default Privacy;
