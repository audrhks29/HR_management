import { Button } from '@/components/ui/button';
// import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { memo, useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
// import { ipcRenderer } from 'electron';

const Address = memo(() => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [fullAddress, setFullAddress] = useState({
    address: "",
    jibun_address: "",
    zone_code: "",
    detail_address: ""
  })

  // 팝업창 열기
  const openPostCode = () => {
    setIsPopupOpen(true)
  }

  const closePostCode = () => {
    setIsPopupOpen(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFullAddress((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePostCode = (data) => {
    setFullAddress({
      address: data.address,
      jibun_address: data.jibunAddress,
      zone_code: data.zonecode,
      detail_address: ""
    });
    // props.onClose()
  }
  // const handleButtonClick = () => {
  //   ipcRenderer.send('create-post-window');
  // };

  const postCodeStyle = {
    width: '500px',
    height: '500px',
    background: '#000'
  }; // 스타일 정의 code
  return (
    <div className="space-y-1">
      <Label htmlFor="address">주소</Label>
      <Button onClick={() => setIsPopupOpen(!isPopupOpen)}>주소검색</Button>

      {isPopupOpen
        && <DaumPostcode
          style={postCodeStyle}
          onComplete={handlePostCode}
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