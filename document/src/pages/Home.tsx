/** @jsxImportSource @emotion/react */

import { Button, Divider, css, useTheme } from "@mui/material";
import { memo } from "react";
import { useNavigate } from "react-router-dom";

import MainIntroduce from "../components/home/MainIntroduce";
import { DividerStyle } from "../styles/commonStyles";

const Home = memo(() => {
  const theme = useTheme();

  const mainInnerStyle = css`
    padding-top: 60px;
  `;

  const imageContainerStyle = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
  `;

  const buttonContainerStyle = css`
    display: flex;
    gap: 20px;
    justify-content: center;
    margin-top: 30px;
  `;

  const buttonStyle = css`
    width: 200px;
    height: 40px;
  `;

  const navigate = useNavigate();

  return (
    <div css={mainInnerStyle}>
      <div
        css={{
          padding: "100px 0",
        }}>
        <div css={imageContainerStyle}>
          <img
            src={`${
              theme.palette.mode === "light" ? "images/logo/logo_image_light.webp" : "images/logo/logo_image_dark.webp"
            }`}
            width={300}
            height={300}
            alt="logo_image"
          />
          <img
            src={`${theme.palette.mode === "light" ? "images/logo/logo_light.svg" : "images/logo/logo_dark.svg"}`}
            width={200}
            height={60}
            alt="logo"
          />
        </div>

        <div css={buttonContainerStyle}>
          <Button type="button" variant="outlined" css={buttonStyle} onClick={() => navigate("/introduce")}>
            HRM이란?
          </Button>

          <Button type="button" variant="contained" css={buttonStyle} onClick={() => navigate("/download")}>
            Download App
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
