import { memo } from 'react';


import memberData from '@/assets/sampleData/memberData.json'

import MemberList from '@/shared/MemberList';
import { useParams } from 'react-router-dom';
import Select from './SelectMember/Select';
import None from './SelectMember/None';


const Contents = memo(() => {
  const { employee_number } = useParams();

  const personalData = memberData.find(member => member.employee_number === employee_number)

  return (
    <div className='grid grid-cols-[2fr_1fr] gap-6'>
      {personalData
        ? <Select personalData={personalData} />
        : <None />}

      <MemberList
        menuLink="salary_history"
        height='850px'
        displayAmount={12} />
    </div>
  );
})


export default Contents;