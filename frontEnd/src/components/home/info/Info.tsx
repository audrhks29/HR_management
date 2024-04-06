import { memo } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';

import { getBusinessData } from '@/server/fatchData';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import Notification from './notification/Notification';

const Info = memo(() => {
  const { data: businessData }: { data: BusinessDataTypes[] } = useSuspenseQuery({
    queryKey: ["businessData"],
    queryFn: getBusinessData,
  });

  const companyName = businessData.find(business => business.kor_desc === "상호")

  return (
    <Card className='col-span-2'>
      <CardHeader>
        <CardTitle>{companyName?.displayText}</CardTitle>
      </CardHeader>
      <CardContent className='grid grid-cols-2'>
        <Notification />
      </CardContent>
    </Card>
  );
});

export default Info;