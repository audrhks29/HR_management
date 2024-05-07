/** @jsxImportSource @emotion/react */

import { memo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Tab, Tabs, useTheme } from "@mui/material";

import ColorMode from "../provider/ColorMode";
import { Link } from "react-router-dom";

const Header = memo(() => {
  const theme = useTheme();
  const location = useLocation();
  // console.log(location.pathname);
  const navigate = useNavigate();
  const [value, setValue] = useState(location.pathname);
  console.log(value);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    navigate(`${newValue}`);
  };

  return (
    <nav
      css={{
        display: "flex",
        justifyContent: "space-between",
        width: "1600px",
        height: "60px",
        margin: "auto",
      }}
    >
      <div css={{ display: "flex", gap: "32px", alignItems: "center" }}>
        <Link
          to={"/"}
          css={{ display: "flex", alignItems: "center" }}
          onClick={() => setValue(`/`)}
        >
          <img
            src={`${
              theme.palette.mode === "light"
                ? "public/logo_light.svg"
                : "public/logo_dark.svg"
            }`}
            alt="logo"
            width={80}
          />
        </Link>

        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
          css={{ height: "100%", width: "80%" }}
        >
          <Tab value="/introduce" label="HRM 소개" css={{ height: "60px" }} />
          <Tab value="/download" label="다운로드" css={{ height: "60px" }} />
          <Tab value="/three" label="Item Three" css={{ height: "60px" }} />
        </Tabs>
      </div>

      <ColorMode />
    </nav>
  );
});

export default Header;
