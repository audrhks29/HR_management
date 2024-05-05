import { memo } from "react";
import { useForm } from "react-hook-form";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { updateOrganizationData } from "@/server/fetchUpdateData";

import Quarter from "./Quarter";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
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
    const { toast } = useToast();

    const { register, handleSubmit, control } = useForm<OrganizationFormTypes>({
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

    const onSubmit = async (data: { organizationData: OrganizationDataTypes[] }) => {
      toast({
        title: "조직도 수정",
        description: "조직도 수정을 완료하시겠습니까?",
        action: (
          <>
            <ToastAction
              className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
              onClick={() => submitData(data)}
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

    const submitData = async (data: { organizationData: OrganizationDataTypes[] }) => {
      await updateOrganizationData(data);
      toast({
        description: "수정되었습니다.",
      });
      await refetch();
      setIsEditMode(false);
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
      </form>
    );
  },
);

export default Edit;
