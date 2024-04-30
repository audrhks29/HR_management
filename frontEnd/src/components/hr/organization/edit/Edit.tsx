import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { updateOrganizationData } from "@/server/fetchUpdateData";
import CustomConfirm from "@/shared/alert/CustomConfirm";

import Quarter from "./Quarter";

const Edit = memo(
  ({
    organizationData,
    refetch,
    setIsEditMode,
  }: {
    organizationData: OrganizationDataTypes[];
    refetch: () => void;
    setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  }) => {
    const [confirmState, setConfirmState] = useState<{ popup: boolean; confirmResult: boolean | undefined }>({
      popup: false,
      confirmResult: undefined,
    });

    const navigate = useNavigate();

    const showPopup = () => {
      setConfirmState({ popup: true, confirmResult: undefined });
    };

    const { register, handleSubmit, control } = useForm<OrganizationFormValues>({
      defaultValues: {
        organizationData: organizationData?.map(item => ({
          quarter: item.quarter,
          depart: item?.depart?.map(depart => ({
            name: depart.name,
            team: depart?.team?.map(team => ({
              name: team.name,
            })),
          })),
        })),
      },
    });

    const waitForUserConfirmation = () => {
      return new Promise<boolean>((resolve, reject) => {
        if (confirmState.confirmResult) resolve(true);
        else resolve(false);
      });
    };

    const onSubmit = async (data: { organizationData: OrganizationDataTypes[] }) => {
      showPopup();
      const confirm = await waitForUserConfirmation();
      if (confirm) {
        await updateOrganizationData(data);
        setConfirmState({ popup: false, confirmResult: undefined });
        setIsEditMode(false);
        await refetch();
        navigate("/hr_organization_chart");
      }
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="relative overflow-y-auto py-8">
          <CardHeader>
            <CardTitle>
              <span>조직도 수정</span>
            </CardTitle>
          </CardHeader>

          <CardContent>
            <Quarter control={control} register={register} />
          </CardContent>
        </Card>

        <div className="text-right mt-3">
          <Button type="button" className="mr-3">
            추가
          </Button>
          <Button type="submit">확인</Button>
        </div>

        <CustomConfirm
          confirmState={confirmState}
          setConfirmState={setConfirmState}
          title="조직도 수정"
          text="수정사항을 반영하시겠습니까?"
        />
      </form>
    );
  },
);

export default Edit;
