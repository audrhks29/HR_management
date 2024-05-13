/** @jsxImportSource @emotion/react */

import { memo } from "react";
import { motion } from "framer-motion";
import {
  ArticleStyle,
  ContainerStyle,
  TitleStyle,
  ImageBoxStyle,
  DescriptionStyle,
} from "../../styles/IntroduceStyles";

const MotionFromLeftArticle = memo(
  ({
    title,
    description,
    img_src,
  }: {
    title: string;
    description: string;
    img_src: string;
  }) => {
    return (
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false }}
        transition={{
          ease: "easeInOut",
          duration: 2,
          x: { duration: 1 },
        }}
      >
        <article css={ArticleStyle}>
          <div css={ImageBoxStyle}>
            <img src={img_src} alt="" width={300} />
          </div>

          <div css={ContainerStyle}>
            <h3 css={TitleStyle}>{title}</h3>
            <p css={DescriptionStyle}>{description}</p>
          </div>
        </article>
      </motion.div>
    );
  }
);

export default MotionFromLeftArticle;
