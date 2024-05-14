/** @jsxImportSource @emotion/react */

import { memo, useEffect, useState } from "react";
import { Button, Divider, css, useTheme } from "@mui/material";

import DownloadIcon from "@mui/icons-material/Download";
import { DividerStyle } from "../styles/commonStyles";
import OsCard from "../components/download/OsCard";

import osList from "../assets/osList.json";

const Download = memo(() => {
  const InnerStyle = css`
    margin: auto;
    padding-top: 60px;
  `;

  const downloadContainer = css`
    display: flex;
    align-items: center;
    gap: 150px;
    justify-content: center;
    padding: 80px;
  `;

  const imageContainerStyle = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
  `;

  const buttonContainerStyle = css`
    display: flex;
    flex-direction: column;
    font-size: 20px;
    align-items: center;
    gap: 40px;
  `;

  const buttonStyle = css`
    width: 300px;
    height: 50px;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
  `;

  const osContainer = css`
    width: 1600px;
    padding: 80px;
    margin: auto;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
  `;

  const [os, setOS] = useState("Unknown");
  const theme = useTheme();

  useEffect(() => {
    const userAgent = window.navigator.userAgent;

    if (userAgent.indexOf("Windows") !== -1) {
      setOS("Windows");
    } else if (userAgent.indexOf("Mac") !== -1) {
      setOS("macOS");
    } else if (userAgent.indexOf("Linux") !== -1) {
      setOS("Linux");
    }
  }, []);

  return (
    <section css={InnerStyle}>
      <article css={downloadContainer}>
        <div css={buttonContainerStyle}>
          <img
            src={`${
              theme.palette.mode === "light" ? "public/images/logo/logo_light.svg" : "public/images/logo/logo_dark.svg"
            }`}
            width={200}
          />
          <p>
            {os} 전용 APP을 다운로드 하시고
            <br />
            무료로 HR_Management를 사용해보세요
          </p>

          <Button type="button" variant="contained" css={buttonStyle}>
            <DownloadIcon />

            <span>{os} 전용 APP Download</span>
          </Button>
        </div>

        <div css={imageContainerStyle}>
          <img
            src={`${
              theme.palette.mode === "light"
                ? "public/images/logo/logo_image_light.png"
                : "public/images/logo/logo_image_dark.png"
            }`}
            width={300}
          />
        </div>
      </article>

      <Divider>
        <div css={DividerStyle}></div>
      </Divider>

      <article css={osContainer}>
        {osList.map(list => (
          <OsCard key={list.id} os_name={list.os_name} />
        ))}
      </article>
    </section>
  );
});

export default Download;
