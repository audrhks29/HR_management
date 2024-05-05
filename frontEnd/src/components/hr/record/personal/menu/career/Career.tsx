import { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Card } from "@/components/ui/card";

import Display from "./Display";
import Edit from "./Edit";

import PersonalTitle from "@/shared/PersonalTitle";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const Career = memo(({ personalData, refetch }: { personalData: MemberDataTypes | undefined; refetch: () => void }) => {
  const { employee_number } = useParams();
  const [editMode, setEditMode] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setEditMode(false);
  }, [employee_number]);

  const handleClickCancel = () => {
    setEditMode(!editMode);
    toast({
      description: "취소되었습니다.",
    });
  };

  const handleClickModify = () => {
    setEditMode(!editMode);
  };

  return (
    <Card className="min-h-[800px] p-8">
      <PersonalTitle personalData={personalData}>
        <div>
          {editMode ? (
            <Button type="button" className="mr-3" onClick={handleClickCancel}>
              취소
            </Button>
          ) : (
            <Button type="button" className="mr-3" onClick={handleClickModify}>
              수정
            </Button>
          )}
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
