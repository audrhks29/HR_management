/** @jsxImportSource @emotion/react */

import { Button } from "@mui/material";
import { memo } from "react";
import { useNavigate } from "react-router-dom";

const Home = memo(() => {
  const navigate = useNavigate();
  return (
    <div
      css={{
        borderRadius: "6px",
        border: "1px solid rgba(27, 31, 36, 0.15)",
        color: "rgb(36, 41, 47)",
        fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
        fontWeight: "600",
        fontSize: "14px",
        padding: "5px 16px",
        textAlign: "center",
      }}
    >
      <div css={{ display: "flex", gap: "20px", justifyContent: "center" }}>
        <Button
          type="button"
          variant="outlined"
          css={{ width: "200px", height: "40px" }}
          onClick={() => navigate("/introduce")}
        >
          HRM이란?
        </Button>
        <Button
          type="button"
          variant="contained"
          css={{ width: "200px", height: "40px" }}
          onClick={() => navigate("/download")}
        >
          윈도우용 APP 다운로드
        </Button>
      </div>
    </div>
  );
});

export default Home;
