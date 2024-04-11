import { Button } from '@/components/ui/button';
// import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { memo, useState } from 'react';
import DaumPostcode from 'react-daum-postcode';

const Address = memo(({ setFormData, fullAddress, setFullAddress }: {
  setFormData: React.Dispatch<React.SetStateAction<MemberDataTypes>>;
  fullAddress: AddressDataTypes;
  setFullAddress: React.Dispatch<React.SetStateAction<AddressDataTypes>>;
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFullAddress((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setFormData((prevData) => ({
      ...prevData,
      address: fullAddress
    }));
  };

  const handleSearchAddress = (data: {
    address: string;
    jibunAddress: string;
    zonecode: string;
  }) => {
    setFullAddress({
      address: data.address,
      jibun_address: data.jibunAddress,
      zone_code: data.zonecode,
      detail_address: ""
    });
    // props.onClose()
  }

  const postCodeStyle = {
    width: '500px',
    height: '500px',
  };

  return (
    <div className="space-y-1">
      <Label htmlFor="address">주소</Label>
      <Button onClick={() => setIsPopupOpen(!isPopupOpen)}>주소검색</Button>

      {isPopupOpen
        && <DaumPostcode
          style={postCodeStyle}
          onComplete={handleSearchAddress}
        ></DaumPostcode>}

      <Input
        id="sample4_roadAddress"
        name="address"
        placeholder="도로명주소"
        disabled
        value={fullAddress.address}
        onChange={handleChange} />

      <Input
        id="sample4_jibunAddress"
        name="jibun_adrress"
        placeholder="지번주소"
        disabled
        value={fullAddress.jibun_address}
        onChange={handleChange} />

      <Input
        id="sample4_detailAddress"
        name='detail_address'
        placeholder="상세주소"
        value={fullAddress.detail_address}
        onChange={handleChange} />

      <Input
        id="sample4_postcode"
        name='zonecode'
        placeholder="우편번호"
        disabled
        value={fullAddress.zone_code}
        onChange={handleChange}
      />
    </div>
  );
});

export default Address;