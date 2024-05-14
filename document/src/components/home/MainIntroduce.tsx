/** @jsxImportSource @emotion/react */

import React, { memo } from "react";

import { Divider } from "@mui/material";

import { DividerStyle } from "../../styles/commonStyles";
import MotionFromRightArticle from "../shared/MotionFromRightArticle";

import mainList from "../../assets/mainList.json";
import MotionFromLeftArticle from "../shared/MotionFromLeftArticle";
import { SectionStyle } from "../../styles/mainStyles";

const MainIntroduce = memo(() => {
  return (
    <section css={SectionStyle}>
      {mainList.map((list) => {
        if (list.id % 2 === 1) {
          return (
            <React.Fragment key={list.id}>
              <MotionFromRightArticle
                title={list.title}
                description={list.description}
                img_src={list.img_src}
              />

              {list.id !== mainList.length && (
                <Divider>
                  <div css={DividerStyle}></div>
                </Divider>
              )}
            </React.Fragment>
          );
        } else {
          return (
            <React.Fragment key={list.id}>
              <MotionFromLeftArticle
                title={list.title}
                description={list.description}
                img_src={list.img_src}
              />

              {list.id !== mainList.length && (
                <Divider>
                  <div css={DividerStyle}></div>
                </Divider>
              )}
            </React.Fragment>
          );
        }
      })}
    </section>
  );
});

export default MainIntroduce;
