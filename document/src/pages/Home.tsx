/** @jsxImportSource @emotion/react */

import { Button, Divider, css, useTheme } from "@mui/material";
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { DividerStyle, InnerStyle } from "../styles/Common";
import MainIntroduce from "../components/home/MainIntroduce";

const Home = memo(() => {
  const theme = useTheme();

  const buttonStyle = css`
    width: 200px;
    height: 40px;
  `;

  const navigate = useNavigate();
  return (
    <div css={InnerStyle}>
      <div
        css={{
          padding: "100px 0",
        }}
      >
        <div
          css={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "30px",
          }}
        >
          <img src="public/images/logo/logo_image_light.png" width={300} />
          <img src="public/images/logo/logo_light.svg" width={200} />
        </div>

        <div
          css={{
            display: "flex",
            gap: "20px",
            justifyContent: "center",
            marginTop: "30px",
          }}
        >
          <Button
            type="button"
            variant="outlined"
            css={buttonStyle}
            onClick={() => navigate("/introduce")}
          >
            HRM이란?
          </Button>
          <Button
            type="button"
            variant="contained"
            css={buttonStyle}
            onClick={() => navigate("/download")}
          >
            윈도우용 APP 다운로드
          </Button>
        </div>
      </div>
      <Divider>
        <div css={DividerStyle}></div>
      </Divider>

      <MainIntroduce />
    </div>
  );
});

export default Home;
