/** @jsxImportSource @emotion/react */

import { memo } from "react";
import hrList from "../../assets/introduceList/hr.json";
import { Divider } from "@mui/material";
import { ArticleStyle } from "../../styles/IntroduceStyles";
import { DividerStyle } from "../../styles/commonStyles";

const Hr = memo(() => {
  console.log(hrList);
  return (
    <section>
      {hrList.map((hr) => (
        <>
          <article css={ArticleStyle}>
            <h3>{hr.img_name}</h3>
          </article>
          <Divider>
            <div css={DividerStyle}></div>
          </Divider>
        </>
      ))}
    </section>
  );
});

export default Hr;
