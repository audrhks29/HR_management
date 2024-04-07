import { memo, useState } from 'react';

import { TabsContent } from '@/components/ui/tabs';

import Privacy from './menu/info/Privacy';
import Department from './menu/info/Department';
import { Button } from '@/components/ui/button';
import Career from './menu/career/Career';
import Education from './menu/career/Education';

const Contents = memo(({ handleNextClick }: { handleNextClick: () => void }) => {
  const [formData, setFormData] = useState({
    employee_number: '',
    kor_name: '',
    eng_name: '',
    phone_number: '',
    rrn_front: '',
    rrn_back: '',
    sex: 'male',
    quarter: '',
    department: '',
    team: '',
    position: '',
    rank: '',
    date_of_joining: ''
  });

  // input 변경시 동작
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 성별 체크박스 변경시 동작
  const handleSexChange = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      sex: value,
    }));
  };

  // select 변경시 동작
  const handleChangeSelect = (name: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  // date 변경시 동작
  const handleSelectDate = (value: Date | undefined) => {
    if (value) {
      const date = new Date(value);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const formatData = `${year}년 ${month}월 ${day}일`;

      setFormData((prevData) => ({
        ...prevData,
        date: formatData
      }));
    }
  };

  return (
    <div className='mt-5'>
      <TabsContent
        value="info"
        className='grid grid-cols-2 gap-6'>

        <Privacy
          formData={formData}
          handleChange={handleChange}
          handleSexChange={handleSexChange} />
        <Department
          formData={formData}
          handleChange={handleChange}
          handleChangeSelect={handleChangeSelect}
          handleSelectDate={handleSelectDate} />

        <div className='text-right col-span-2'>
          <Button onClick={handleNextClick}>다음</Button>
        </div>
      </TabsContent>

      <TabsContent
        value="edu_career"
        className='grid grid-rows-2 gap-6'>
        <Education />
        <Career />
        <div className='text-right'>
          <Button>제출</Button>
        </div>
      </TabsContent>
    </div>
  );
});

export default Contents;