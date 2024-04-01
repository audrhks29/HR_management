import React, { memo } from 'react';

import { Card, CardContent } from '@/components/ui/card';

import organizationData from '@/assets/sampleData/organizationData.json'
import { Button } from '@/components/ui/button';

const Content = memo(() => {
  return (
    <React.Fragment>
      <Card className='h-[780px] relative overflow-y-auto py-8'>
        <CardContent>
          {organizationData.map(quarter => (
            <div className='cursor-pointer flex w-fit border mb-3'>
              <div className='flex items-center w-44 p-3 bg-muted'>{quarter.quarter}</div>
              <ul>
                {quarter.depart.map(depart => (
                  <li className='flex border-b last:border-0'>
                    <div className='flex items-center w-48 p-3 min-h-[50px]'>{depart.name}</div>
                    <ul>
                      {depart.team.map(team => (
                        <li className='flex items-center p-3 w-48'>{team.name}</li>
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

export default Content;