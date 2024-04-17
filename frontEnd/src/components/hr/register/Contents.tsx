import { memo, useEffect, useState } from "react";

import { TabsContent } from "@/components/ui/tabs";

import Privacy from "./menu/info/Privacy";
import Department from "./menu/info/Department";
import { Button } from "@/components/ui/button";
import Career from "./menu/career/Career";
import Education from "./menu/career/Education";

import { postMemberData } from "@/server/fetchCreateData";

import { initialCareerData, initialMemberData, initialEduData, initialFullAddress } from "@/assets/initialValue";
import { useNavigate } from "react-router-dom";
import CustomConfirm from "@/shared/alert/CustomConfirm";

const Contents = memo(({ handleNextClick }: { handleNextClick: () => void }) => {
  const [formData, setFormData] = useState<MemberDataTypes>(initialMemberData);
  const [careerData, setCareerData] = useState(initialCareerData);
  const [eduData, setEduData] = useState(initialEduData);
  const [fullAddress, setFullAddress] = useState(initialFullAddress);

  const [confirmState, setConfirmState] = useState({
    popup: false,
    confirm: false,
  });

  const navigate = useNavigate();

  // career plus버튼
  const handleClickCareerPlusButton = (name: string, data: CareerDataTypes) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: [...prevData.career, data],
    }));

    setCareerData(initialCareerData);
  };

  // edu plus버튼
  const handleClickEduPlusButton = (name: string, data: EduDataTypes) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: [...prevData.edu, data],
    }));

    setEduData(initialEduData);
  };

  // input 변경시 동작
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 성별 체크박스 변경시 동작
  const handleSexChange = (value: string) => {
    setFormData(prevData => ({
      ...prevData,
      sex: value,
    }));
  };

  // select 변경시 동작
  const handleChangeSelect = (name: string, value: string) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  // date 변경시 동작
  const handleSelectDate = (value: Date | undefined) => {
    if (value) {
      const date = new Date(value);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const formatData = `${year}년 ${month}월 ${day}일`;

      setFormData(prevData => ({
        ...prevData,
        date: formatData,
      }));
    }
  };

  // useState 초기화
  const initialData = () => {
    setFormData(initialMemberData);
    setCareerData(initialCareerData);
    setEduData(initialEduData);
    setFullAddress(initialFullAddress);
  };

  // 제출버튼 클릭
  const handleSubmit = () => ({ popup: true, confirm: false });

  useEffect(() => {
    if (confirmState.confirm) {
      postMemberData(formData);
      initialData();
      navigate("/hr_record");
    }

    setConfirmState({ popup: confirmState.popup, confirm: false });
  }, [confirmState.confirm]);

  return (
    <div className="mt-5">
      <TabsContent value="info" className="grid grid-cols-2 gap-6">
        <Privacy
          formData={formData}
          setFormData={setFormData}
          handleChange={handleChange}
          handleSexChange={handleSexChange}
          fullAddress={fullAddress}
          setFullAddress={setFullAddress}
        />

        <Department
          formData={formData}
          handleChange={handleChange}
          handleChangeSelect={handleChangeSelect}
          handleSelectDate={handleSelectDate}
        />

        <div className="text-right col-span-2">
          <Button onClick={handleNextClick}>다음</Button>
        </div>
      </TabsContent>

      <TabsContent value="edu_career" className="flex flex-col gap-6">
        <Education
          formData={formData}
          eduData={eduData}
          setEduData={setEduData}
          handleClickEduPlusButton={handleClickEduPlusButton}
        />
        <Career
          formData={formData}
          careerData={careerData}
          setCareerData={setCareerData}
          handleClickCareerPlusButton={handleClickCareerPlusButton}
        />

        <div className="text-right">
          <Button onClick={handleSubmit}>제출</Button>
        </div>
      </TabsContent>

      <CustomConfirm
        confirmState={confirmState}
        setConfirmState={setConfirmState}
        title="구성원 등록"
        text="데이터 입력을 완료하시겠습니까?"
      />
    </div>
  );
});

export default Contents;
