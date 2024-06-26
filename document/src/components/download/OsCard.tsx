/** @jsxImportSource @emotion/react */

import { memo } from "react";
import { Button, Card, CardContent, CardMedia, Typography, css } from "@mui/material";

import DownloadIcon from "@mui/icons-material/Download";

const OsCard = memo(({ os_name, link }: { os_name: string; link: string | null }) => {
  const typographyStyle = css`
    padding: 16px;
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    text-transform: uppercase;
  `;

  const buttonContainer = css`
    display: flex;
    justify-content: center;
  `;

  const buttonStyle = css`
    width: 200px;
    height: 50px;
    display: flex;
    gap: 10px;
    font-size: 14px;
    font-weight: bold;
  `;

  const handleDownload = () => {
    if (link) {
      window.location.href = link;
    } else {
      alert("준비중입니다.");
    }
  };

  return (
    <Card sx={{ maxWidth: 345, borderRadius: "10px", margin: "auto" }}>
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" css={typographyStyle}>
          {os_name}
        </Typography>

        <div css={buttonContainer}>
          <Button type="button" variant="outlined" css={buttonStyle} onClick={handleDownload}>
            <DownloadIcon />
            <span>Download</span>
          </Button>
        </div>

        <CardMedia
          css={{ padding: "80px" }}
          component="img"
          height="300"
          image={`images/os/${os_name}.webp`}
          alt={os_name}
        />
      </CardContent>
    </Card>
  );
});

export default OsCard;
