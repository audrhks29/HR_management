import { memo, useEffect, useState } from "react";

import { Card } from "@/components/ui/card";
import PersonalTitle from "@/shared/PersonalTitle";
import Display from "./Display";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Edit from "./Edit";

const Career = memo(({ personalData, refetch }: { personalData: MemberDataTypes | undefined; refetch: () => void }) => {
  const { employee_number } = useParams();
  const [editMode, setEditMode] = useState(false);

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
          <Button type="button">삭제</Button>
        </div>
      </PersonalTitle>
      {editMode ? (
        <Edit personalData={personalData} refetch={refetch} setEditMode={setEditMode} />
      ) : (
        <Display personalData={personalData} />
      )}
    </Card>
  );
});

export default Career;
