import { TabsContent } from "@/components/ui/tabs";
import { memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tree, TreeNode } from "react-organizational-chart";
import { Building, Building2, Warehouse } from "lucide-react";
import { Button } from "@/components/ui/button";

const Contents = memo(({ data }: { data: OrganizationDataTypes }) => {
  return (
    <TabsContent value={data.quarter} className="mt-5">
      <Card className="h-[700px] relative overflow-y-auto py-8 flex items-center justify-center">
        <CardContent>
          <Tree
            label={
              <Button
                variant="outline"
                className="bg-primary-foreground block m-auto px-14 py-4 w-fit h-fit border-primary/20">
                <Building2 className="m-auto" />
                <span>{data.quarter}</span>
              </Button>
            }
            lineColor="gray">
            {data.depart.map(depart => (
              <TreeNode
                key={depart.id}
                label={
                  <Button
                    variant="outline"
                    className="bg-primary-foreground block w-fit h-fit m-auto px-8 py-2 border-primary/20">
                    <Building className="m-auto" />
                    <span>{depart.name}</span>
                  </Button>
                }>
                {depart.team.map(team => (
                  <TreeNode
                    key={team.id}
                    label={
                      <Button
                        variant="outline"
                        className="bg-primary-foreground block w-fit h-fit m-auto px-8 py-2 border-primary/20">
                        <Warehouse className="m-auto" />
                        <span>{team.name}</span>
                      </Button>
                    }
                  />
                ))}
              </TreeNode>
            ))}
          </Tree>
        </CardContent>
      </Card>
    </TabsContent>
  );
});

export default Contents;
