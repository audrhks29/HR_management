/** @jsxImportSource @emotion/react */

import { memo, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { css } from "@emotion/react";
import { Divider, Tab, Tabs, useTheme } from "@mui/material";

import ColorMode from "../provider/ColorMode";
import { Link } from "react-router-dom";

const Header = memo(() => {
  const theme = useTheme();
  const location = useLocation();

  const navigate = useNavigate();
  const [value, setValue] = useState(location.pathname);

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    navigate(`${newValue}`);
  };

  // styles
  const headerStyle = css`
    width: 100%;
    background-color: ${theme.palette.background.default};
    position: fixed;
    z-index: 100;
  `;

  const navStyle = css`
    display: flex;
    justify-content: space-between;
    width: 1600px;
    height: 60px;
    margin: auto;
  `;

  const navContainerStyle = css`
    display: flex;
    gap: 32px;
    align-items: center;
  `;

  const linkStyle = css`
    display: flex;
    align-items: center;
  `;

  const tabsStyle = css`
    height: 100%;
    width: 80%;
  `;

  const tabStyle = css`
    height: 60px;
  `;

  return (
    <>
      <header css={headerStyle}>
        <nav css={navStyle}>
          <div css={navContainerStyle}>
            <Link to={"/"} css={linkStyle} onClick={() => setValue(`/`)}>
              <img
                src={`${theme.palette.mode === "light" ? "images/logo/logo_light.svg" : "images/logo/logo_dark.svg"}`}
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
              css={tabsStyle}>
              <Tab value="/introduce" label="HRM 소개" css={tabStyle} />
              <Tab value="/download" label="다운로드" css={tabStyle} />
            </Tabs>
          </div>

          <ColorMode />
        </nav>
        <Divider variant="fullWidth" />
      </header>
      <Outlet />
    </>
  );
});

export default Header;
