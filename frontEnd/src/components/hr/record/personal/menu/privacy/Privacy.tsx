import { memo, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Display from "./DisPlay";
import Edit from "./Edit";

import { Card } from "@/components/ui/card";
import PersonalTitle from "@/shared/PersonalTitle";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import {
  deletePersonalMemberData,
  deletePersonalMemberSalaryData,
  deletePersonalSalaryData,
  deletePersonalWorkData,
} from "@/server/fetchDeleteData";
import { ToastAction } from "@/components/ui/toast";

const Privacy = memo(
  ({ personalData, refetch }: { personalData: MemberDataTypes | undefined; refetch: () => void }) => {
    const { employee_number } = useParams();
    const [editMode, setEditMode] = useState(false);
    const { toast } = useToast();
    const navigate = useNavigate();

    useEffect(() => {
      setEditMode(false);
    }, [employee_number]);

    const handleClickDelete = async () => {
      toast({
        variant: "destructive",
        title: "정보 삭제",
        description: "정보를 삭제하시겠습니까?",
        action: (
          <>
            <ToastAction
              className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
              onClick={submitData}
              altText="확인">
              확인
            </ToastAction>
            <ToastAction
              className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
              altText="취소">
              취소
            </ToastAction>
          </>
        ),
      });
    };

    const submitData = async () => {
      await deletePersonalMemberData(employee_number);
      await deletePersonalWorkData(employee_number);
      await deletePersonalMemberSalaryData(employee_number);
      await deletePersonalSalaryData(employee_number);
      navigate(`/hr_record`);
      refetch();
    };

    const handleClickCancel = () => {
      setEditMode(!editMode);
      toast({
        description: "취소되었습니다",
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
            <Button type="button" className="mr-3" onClick={handleClickDelete}>
              삭제
            </Button>
          </div>
        </PersonalTitle>
        {editMode ? (
          <Edit personalData={personalData} refetch={refetch} setEditMode={setEditMode} />
        ) : (
          <Display personalData={personalData} />
        )}
      </Card>
    );
  },
);

export default Privacy;
