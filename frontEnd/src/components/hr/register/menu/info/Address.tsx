import { Button } from "@/components/ui/button";
// import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { memo, useEffect, useState } from "react";
import DaumPostcode from "react-daum-postcode";
import { UseFormRegister } from "react-hook-form";

const Address = memo(({ register }: { register: UseFormRegister<MemberRegistrationFormValues> }) => {
  const [postData, setPostData] = useState(null);

  useEffect(() => {
    const handlePostData = (data: any) => {
      setPostData(data);
      // handleSearchAddress(data);
    };
    window.electronAPI.onPostData(handlePostData);
  }, []);

  const handleClickButton = () => {
    window.electronAPI.openPostWindow();
  };

  return (
    <div className="space-y-1">
      <Label htmlFor="address">주소</Label>

      {/* {isPopupOpen && <DaumPostcode style={postCodeStyle} onComplete={handleSearchAddress} />} */}

      <div className="grid grid-cols-2 gap-6">
        <Input
          id="sample4_roadAddress"
          {...register(`employeeData.address.address`)}
          placeholder="도로명주소"
          disabled
        />
        <Input
          id="sample4_jibunAddress"
          {...register(`employeeData.address.jibun_address`)}
          placeholder="지번주소"
          disabled
        />
      </div>

      <div className="grid grid-cols-[1fr_3fr_80px] gap-3 py-2">
        <Input id="sample4_postcode" {...register(`employeeData.address.zone_code`)} placeholder="우편번호" disabled />
        <Input id="sample4_detailAddress" {...register(`employeeData.address.detail_address`)} placeholder="상세주소" />
        <Button onClick={handleClickButton}>주소검색</Button>
      </div>
    </div>
  );
});

export default Address;
