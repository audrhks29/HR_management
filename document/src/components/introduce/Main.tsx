/** @jsxImportSource @emotion/react */

import { memo } from "react";
import {
  IntroduceArticleGrid,
  IntroduceContainer,
  IntroduceTitle,
} from "../../styles/Introduce";
import { Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
import { DividerStyle } from "../../styles/Common";

const Root = styled("div")(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  "& > :not(style) ~ :not(style)": {
    marginTop: theme.spacing(2),
  },
}));

const Main = memo(() => {
  return (
    <Root>
      <section css={{ display: "grid", gap: "30px" }}>
        <article css={IntroduceArticleGrid}>
          <div css={IntroduceContainer}>
            <h3 css={IntroduceTitle}>인사 기능</h3>
            <p css={{ fontSize: "18px", lineHeight: "30px" }}>
              HRM은 누구나 쉽게 사용할 수 있는 <br />
              간편한 인사관리 앱이며
              <br />
              중소기업의 인사관리에 적합합니다.
            </p>
          </div>
          <div>
            <img
              src="public/images/introduce/main/main_all.png"
              alt=""
              width="100%"
            />
          </div>
        </article>

        <Divider>
          <div css={DividerStyle}></div>
        </Divider>
        <article>두번쨰dddddddddddddddddddddddddddddddddddddddddddddd</article>
        <article>세번쨰</article>
        <article>네번쨰</article>
      </section>
    </Root>
  );
});

export default Main;
