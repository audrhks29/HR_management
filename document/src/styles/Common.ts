import { css } from "@emotion/react";
import { useTheme } from "@mui/material/styles";

export const DividerStyle = () => {
  const theme = useTheme();

  return css`
    width: 60px;
    height: 4px;
    background-color: ${theme.palette.secondary.main};
    border-radius: 4px;
  `;
};

export const InnerStyle = css`
  margin: auto;
  width: 1600px;
`;
