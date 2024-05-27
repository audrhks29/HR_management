/** @jsxImportSource @emotion/react */

import React, { memo } from "react";

import { Divider } from "@mui/material";
// import { Divider, useTheme } from "@mui/material";
import { SectionStyle } from "../../styles/mainStyles";
import { DividerStyle } from "../../styles/commonStyles";
import { motion } from "framer-motion";
import { css } from "@emotion/react";

const articleStyle = css`
  display: flex;
  flex-direction: column;
  min-height: 400px;
  width: 1340px;
  @media (max-width: 1680px) {
    width: 1200px;
  }
  @media (max-width: 1350px) {
    width: 1000px;
  }
  @media (max-width: 1150px) {
    width: 850px;
  }
  @media (max-width: 1000px) {
    width: 650px;
  }
  @media (max-width: 820px) {
    width: 500px;
  }
  @media (max-width: 685px) {
    width: 300px;
  }
`;

const titleStyle = css`
  font-weight: bold;
  font-size: 22px;
  padding-left: 10px;
  padding-bottom: 10px;
`;

const containerStyle = css`
  display: flex;
  @media (max-width: 1150px) {
    flex-direction: column;
  }
`;

const descriptionStyle = css`
  font-size: 20px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  @media (max-width: 1150px) {
    padding: 60px 0;
  }
`;

const imageStyle = css`
  width: 800px;
  @media (max-width: 1680px) {
    width: 700px;
  }
  @media (max-width: 1350px) {
    width: 600px;
  }
  @media (max-width: 1150px) {
    width: 850px;
  }
  @media (max-width: 1000px) {
    width: 650px;
  }
  @media (max-width: 820px) {
    width: 500px;
  }
  @media (max-width: 685px) {
    width: 300px;
  }
`;

const IntroduceArticle = memo(
  ({ title, img_src, description }: { title: string; img_src: string; description: string }) => {
    return (
      <article css={articleStyle}>
        <h3 css={titleStyle}>{title}</h3>

        <div css={containerStyle}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{
              ease: "easeInOut",
              duration: 2,
              y: { duration: 1 },
            }}>
            <img src={img_src} css={imageStyle} alt={title} />
          </motion.div>

          <motion.div
            css={descriptionStyle}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{
              ease: "easeInOut",
              duration: 2,
              x: { duration: 1 },
            }}
            dangerouslySetInnerHTML={{ __html: description }}></motion.div>
        </div>
      </article>
    );
  },
);

const Index = memo(({ data }: { data: ListTypes[] }) => {
  // const theme = useTheme();
  return (
    <section css={SectionStyle}>
      {data.map(item => (
        <React.Fragment key={item.id}>
          <IntroduceArticle
            title={item.title}
            // img_src={theme.palette.mode === "light" ? item.src.light : item.src.dark}
            img_src={item.src.light}
            description={item.description}
          />
          {item.id !== data.length && (
            <Divider>
              <div css={DividerStyle}></div>
            </Divider>
          )}
        </React.Fragment>
      ))}
    </section>
  );
});

export default Index;
