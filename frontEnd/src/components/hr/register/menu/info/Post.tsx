import { memo } from "react";
import DaumPostcode from "react-daum-postcode";

const Post = memo(() => {
  const postCodeStyle = {
    width: "100vw",
    height: "100vh",
  };

  const handleClickAddress = (data: any) => {
    window.electronAPI.sendPostData(data);
    window.close();
  };

  return (
    <div className="col-span-2">
      <DaumPostcode style={postCodeStyle} onComplete={handleClickAddress}></DaumPostcode>
    </div>
  );
});

export default Post;
