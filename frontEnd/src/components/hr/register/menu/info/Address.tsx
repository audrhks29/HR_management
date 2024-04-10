import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { memo } from 'react';
import DaumPostcode from 'react-daum-postcode';
// import { ipcRenderer } from 'electron';

const Address = memo(() => {
  // const [isPopupOpen, setIsPopupOpen] = useState(false)

  // 팝업창 열기
  // const openPostCode = () => {
  //   setIsPopupOpen(true)
  // }

  // 팝업창 닫기
  // const closePostCode = () => {
  //   setIsPopupOpen(false)
  // }


  // let fullAddress = '';
  // let extraAddress = '';
  // const handlePostCode = (data) => {

  //   if (data.addressType === 'R') {
  //     if (data.bname !== '') {
  //       extraAddress += data.bname;
  //     }
  //     if (data.buildingName !== '') {
  //       extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
  //     }
  //     fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
  //   }
  //   console.log(data)

  //   console.log(data.zonecode)
  //   // props.onClose()
  // }
  // console.log(fullAddress)
  // const handleButtonClick = () => {
  //   ipcRenderer.send('create-post-window');
  // };

  return (
    <div className="space-y-1">
      <Label htmlFor="address">주소</Label>
      <Input id="address" />
      <Input id="sample4_postcode" placeholder="우편번호" />
      <DaumPostcode
      // onComplete={handlePostCode}
      ></DaumPostcode>
      <Button
        value="우편번호 찾기"
      // onClick={openPostCode}
      >우편번호 찾기</Button>
      <Input
        id="sample4_roadAddress"
        placeholder="도로명주소"
      />
      <Input
        id="sample4_jibunAddress"
        placeholder="지번주소" />
      <Input
        id="sample4_detailAddress"
        placeholder="상세주소" />
      <Input
        id="sample4_extraAddress"
        placeholder="참고항목" />
      <Button
      // onClick={handleButtonClick}
      >자식 윈도우 생성</Button>
    </div>
  );
});

export default Address;