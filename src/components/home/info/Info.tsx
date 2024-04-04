import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { memo } from 'react';

import businessData from '@/assets/sampleData/businessData.json'
import Notification from './notification/Notification';

const Info = memo(() => {
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