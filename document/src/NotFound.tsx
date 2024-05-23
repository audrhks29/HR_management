/** @jsxImportSource @emotion/react */

import { Button, css } from "@mui/material";
import { memo } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = memo(() => {
  const navigate = useNavigate();
  const containerStyle = css`
    height: 900px;
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  const textContainerStyle = css`
    width: 600px;
    display: flex;
    flex-direction: column;
    text-align: center;
    margin: auto;
  `;

  const buttonStyle = css`
    width: 200px;
    margin: auto;
  `;

  const handleButton = () => {
    navigate(`/`);
  };

  return (
    <div css={containerStyle}>
      <div css={textContainerStyle}>
        <h2>404</h2>
        <span>sorry...</span>
        <span>page is not found</span>
        <Button variant="outlined" css={buttonStyle} onClick={handleButton}>
          홈으로
        </Button>
      </div>
    </div>
  );
});

export default NotFound;
