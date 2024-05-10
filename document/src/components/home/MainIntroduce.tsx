/** @jsxImportSource @emotion/react */

import { memo, useEffect, useState } from "react";
import {
  IntroduceArticleGrid,
  IntroduceContainer,
  IntroduceTitle,
} from "../../styles/mainStyle";

import { Divider } from "@mui/material";
import { css } from "@mui/material/styles";
import { DividerStyle } from "../../styles/Common";

// styles
const imageBoxStyle = css`
  margin: auto;
`;

const MainIntroduce = memo(() => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section css={{ display: "grid", gap: "30px" }}>
      <article css={IntroduceArticleGrid}>
        <div css={IntroduceContainer}>
          <h3 css={IntroduceTitle}>간편한 기능</h3>
          <p css={{ fontSize: "18px", lineHeight: "30px" }}>
            간편하고 직관적인 사용자 경험을 제공합니다.
            <br /> 복잡한 인사 업무를 간소화하고 <br />
            중소기업에서도 쉽게 활용할 수 있는 <br />
            효율적인 HRM 솔루션입니다.
          </p>
        </div>

        <div css={imageBoxStyle}>
          <img
            src="public/images/introduce/main/function.gif"
            alt=""
            width={300}
          />
        </div>
      </article>

      <Divider>
        <div css={DividerStyle}></div>
      </Divider>

      <article css={IntroduceArticleGrid}>
        <div css={imageBoxStyle}>
          <img
            src="public/images/introduce/main/management.gif"
            alt=""
            width={300}
          />
        </div>
        <div css={IntroduceContainer}>
          <h3 css={IntroduceTitle}>통합된 인사관리</h3>
          <p css={{ fontSize: "18px", lineHeight: "30px" }}>
            다양한 인사 업무를 한 곳에서 효율적으로 관리할 수 있습니다.
            <br /> 모든 정보를 통합하여 관리하므로 업무 처리 속도를 높이고
            <br />
            오류를 줄일 수 있습니다.
          </p>
        </div>
      </article>

      <Divider>
        <div css={DividerStyle}></div>
      </Divider>

      <article css={IntroduceArticleGrid}>
        <div css={IntroduceContainer}>
          <h3 css={IntroduceTitle}>실시간 데이터 업데이트</h3>
          <p css={{ fontSize: "18px", lineHeight: "30px" }}>
            실시간으로 업데이트되는 데이터를 통해 <br />
            조직 내 인원 상태 및 업무 진행 상황을 신속하게 파악할 수 있습니다.
            <br />
            이를 통해 의사 결정을 더욱 빠르고 정확하게 할 수 있습니다.
          </p>
        </div>
        <div css={imageBoxStyle}>
          <img src="public/images/introduce/main/data.gif" alt="" width={300} />
        </div>
      </article>

      <Divider>
        <div css={DividerStyle}></div>
      </Divider>

      <article css={IntroduceArticleGrid}>
        <div css={imageBoxStyle}>
          <img src="public/images/introduce/main/ux.gif" alt="" width={300} />
        </div>
        <div css={IntroduceContainer}>
          <h3 css={IntroduceTitle}>사용자 친화적 설계</h3>
          <p css={{ fontSize: "18px", lineHeight: "30px" }}>
            직관적인 메뉴 구성으로 누구나 쉽게 사용할 수 있습니다.
            <br /> 별도의 교육 없이도 빠르게 익숙해질 수 있어서
            <br /> 업무 효율성을 높일 수 있습니다.
          </p>
        </div>
      </article>
    </section>
  );
});

export default MainIntroduce;
