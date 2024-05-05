import { memo, useEffect, useState } from "react";

import { Card } from "@/components/ui/card";
import PersonalTitle from "@/shared/PersonalTitle";
import Display from "./Display";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Edit from "./Edit";
import CustomAlert from "@/shared/alert/CustomAlert";

const Career = memo(({ personalData, refetch }: { personalData: MemberDataTypes | undefined; refetch: () => void }) => {
  const { employee_number } = useParams();
  const [editMode, setEditMode] = useState(false);
  const [alertState, setAlertState] = useState(false);

  useEffect(() => {
    setEditMode(false);
  }, [employee_number]);

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
    </Card>
  );
});

export default Career;
