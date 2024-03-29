import { memo } from 'react';
import PageTitle from '@/shared/PageTitle';
import Contents from '@/components/hr/record/Contents';


const Hr_record = memo(() => {
  return (
    <main>
      <PageTitle title="구성원 조회" />
      <Contents />
    </main>
  );
});

export default Hr_record;