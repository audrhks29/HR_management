import { memo, useState } from 'react';

import { TabsContent } from '@/components/ui/tabs';

import Privacy from './menu/info/Privacy';
import Department from './menu/info/Department';
import { Button } from '@/components/ui/button';
import Career from './menu/career/Career';
import Education from './menu/career/Education';

const Contents = memo(() => {
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
    date_of_joining: '',
  });
  console.log(formData);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSexChange = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      sex: value,
    }));
  };

  const handleChangeSelect = (name: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

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
          handleChangeSelect={handleChangeSelect} />
        <div className='text-right col-span-2'>
          <Button>다음</Button>
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