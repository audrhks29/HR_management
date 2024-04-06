import React, { memo } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { getOrganizationData } from '@/server/fetchReadData';

const Index = memo(() => {
  const { data: organizationData }: { data: OrganizationDataTypes[] } = useSuspenseQuery({
    queryKey: ["organizationData"],
    queryFn: getOrganizationData,
  });

  return (
    <React.Fragment>
      <Card className='h-[780px] relative overflow-y-auto py-8'>
        <CardContent>
          {organizationData.map(quarter => (
            <div
              key={quarter.id}
              className='cursor-pointer flex w-fit border mb-3'>
              <div className='flex items-center w-44 p-3 bg-muted'>{quarter.quarter}</div>
              <ul>
                {quarter.depart.map(depart => (
                  <li key={depart.id} className='flex border-b last:border-0'>
                    <div className='flex items-center w-48 p-3 min-h-[50px]'>{depart.name}</div>
                    <ul>
                      {depart.team.map(team => (
                        <li
                          key={team.id}
                          className='flex items-center p-3 w-48'>{team.name}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className='text-right mt-3'>
        <Button className='mr-3'>수정</Button>
        <Button>추가</Button>
      </div>
    </React.Fragment>
  );
});

export default Index;