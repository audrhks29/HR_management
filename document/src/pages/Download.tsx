/** @jsxImportSource @emotion/react */

import { memo, useEffect, useState } from "react";
import { Button, Divider, css, useTheme } from "@mui/material";

import DownloadIcon from "@mui/icons-material/Download";
import { DividerStyle } from "../styles/commonStyles";
import OsCard from "../components/download/OsCard";

import osList from "../assets/osList.json";
import SEOMetaTag from "../SEOMetaTag";

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
    @media (max-width: 815px) {
      flex-direction: column;
      gap: 0;
    }
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

  const osContainerStyle = css`
    width: 100%;
    padding: 80px;
    margin: auto;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
    @media (max-width: 1150px) {
      grid-template-columns: none;
      grid-template-rows: 1fr 1fr 1fr;
    }
  `;

  const imageStyle = css`
    @media (max-width: 815px) {
      display: none;
    }
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

  const handleDownload = () => {
    const osName = osList.find(item => item.os_name === os.toLowerCase());
    const downloadLink = osName?.link;
    downloadLink ? (window.location.href = downloadLink) : alert("준비중입니다.");
  };

  return (
    <>
      <SEOMetaTag
        title="Download"
        description="HR_Management의 다운로드 페이지 입니다."
        keywords="HR_Management Download"
        url="https://hr-management-three.vercel.app/download"
      />
      <section css={InnerStyle}>
        <article css={downloadContainer}>
          <div css={buttonContainerStyle}>
            <img
              src={`${theme.palette.mode === "light" ? "images/logo/logo_light.svg" : "images/logo/logo_dark.svg"}`}
              width={200}
              height={60}
              alt="logo_image"
            />
            <p>
              {os} 전용 APP을 다운로드 하시고
              <br />
              무료로 HR_Management를 사용해보세요
            </p>

            <Button type="button" variant="contained" css={buttonStyle} onClick={handleDownload}>
              <DownloadIcon />

              <span>{os} 전용 APP Download</span>
            </Button>
          </div>

          <div css={imageContainerStyle}>
            <img
              src={`${
                theme.palette.mode === "light"
                  ? "images/logo/logo_image_light.webp"
                  : "images/logo/logo_image_dark.webp"
              }`}
              width={300}
              height={300}
              alt="logo"
              css={imageStyle}
            />
          </div>
        </article>

        <Divider>
          <div css={DividerStyle}></div>
        </Divider>

        <article css={osContainerStyle}>
          {osList.map(list => (
            <OsCard key={list.id} os_name={list.os_name} link={list.link} />
          ))}
        </article>
      </section>
    </>
  );
});

export default Download;
