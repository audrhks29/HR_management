import { memo } from "react";
import { useForm } from "react-hook-form";
import { Tree, TreeNode } from "react-organizational-chart";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { updateOrganizationData } from "@/server/fetchUpdateData";

interface FormValues {
  organizationData: OrganizationDataTypes[];
}

const Edit = memo(({ organizationData }: { organizationData: OrganizationDataTypes[] }) => {
  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      organizationData: organizationData.map(item => ({
        id: item.id,
        quarter: item.quarter,
        depart: item.depart.map(depart => ({
          id: depart.id,
          name: depart.name,
          team: depart.team.map(team => ({
            id: team.id,
            name: team.name,
          })),
        })),
      })),
    },
  });

  const onSubmit = (data: { organizationData: OrganizationDataTypes[] }) => {
    updateOrganizationData(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="relative overflow-y-auto py-8">
        <CardHeader>
          <CardTitle>조직도 수정</CardTitle>
        </CardHeader>

        <CardContent className="text-[14px] grid gap-32">
          {organizationData.map((item, index) => (
            <Tree
              key={item.id}
              label={
                <Input
                  id={`organizationData.${index}.quarter`}
                  {...register(`organizationData.${index}.quarter`)}
                  className="max-w-[200px] m-auto py-2 border-primary/20 text-center"
                />
              }
              lineColor="gray">
              {item.depart.map((depart, depart_index) => (
                <TreeNode
                  key={depart.id}
                  label={
                    <Input
                      id={`organizationData.${index}.depart.${depart_index}.name`}
                      {...register(`organizationData.${index}.depart.${depart_index}.name`)}
                      className="max-w-[200px] m-auto py-2 border-primary/20 text-center"
                    />
                  }>
                  {depart.team.map((team, team_index) => (
                    <TreeNode
                      key={team.id}
                      label={
                        <Input
                          id={`organizationData.${index}.depart.${depart_index}.team.${team_index}.name`}
                          {...register(`organizationData.${index}.depart.${depart_index}.team.${team_index}.name`)}
                          className="py-2 border-primary/20 text-center"
                        />
                      }
                    />
                  ))}
                </TreeNode>
              ))}
            </Tree>
          ))}
        </CardContent>
      </Card>

      <div className="text-right mt-3">
        <Button className="mr-3">추가</Button>
        <Button type="submit">확인</Button>
      </div>
    </form>
  );
});

export default Edit;
