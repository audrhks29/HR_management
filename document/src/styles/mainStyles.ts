import { css } from "@emotion/react";

export const ArticleStyle = css`
  display: flex;
  gap: 30px;
  min-height: 400px;
  justify-content: center;
  width: 1000px;
  margin: auto;
  @media (max-width: 1200px) {
    width: 900px;
  }

  @media (max-width: 992px) {
    width: 750px;
  }

  @media (max-width: 768px) {
    width: 90%;
    flex-direction: column;
    align-items: center;
  }

  @media (max-width: 576px) {
    gap: 15px;
    min-height: 300px;
  }
`;

export const ContainerStyle = css`
  margin: auto;
  text-align: center;
`;

export const TitleStyle = css`
  font-weight: bold;
  font-size: 40px;
  padding-bottom: 20px;
`;

export const ImageBoxStyle = css`
  margin: auto;
`;

export const SectionStyle = css`
  /* display: grid; */
  gap: 30px;
  overflow: hidden;
`;

export const DescriptionStyle = css`
  font-size: 18px;
  line-height: 30px;
`;
