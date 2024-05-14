/** @jsxImportSource @emotion/react */

import { memo } from "react";
import { motion } from "framer-motion";
import {
  ArticleStyle,
  ContainerStyle,
  TitleStyle,
  ImageBoxStyle,
  DescriptionStyle,
} from "../../styles/mainStyles";

const MotionFromRightArticle = memo(
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
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false }}
        transition={{
          ease: "easeInOut",
          duration: 2,
          x: { duration: 1 },
        }}
      >
        <article css={ArticleStyle}>
          <div css={ContainerStyle}>
            <h3 css={TitleStyle}>{title}</h3>
            <p
              css={DescriptionStyle}
              dangerouslySetInnerHTML={{ __html: description }}
            ></p>
          </div>

          <div css={ImageBoxStyle}>
            <img src={img_src} alt="" width={300} />
          </div>
        </article>
      </motion.div>
    );
  }
);

export default MotionFromRightArticle;
