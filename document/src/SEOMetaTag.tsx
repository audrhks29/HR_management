import { Helmet } from "react-helmet-async";

const SEOMetaTag = (props: { title: string; description: string; keywords: string; url: string }) => {
  return (
    <Helmet>
      <title>HR_Management | {props.title}</title>

      <meta name="description" content={props.description} />
      <meta name="keywords" content={props.keywords} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={props.title} />
      <meta property="og:site_name" content={props.title} />
      <meta property="og:description" content={props.description} />
      <meta property="og:image" content={"images/logo/logo_light.svg"} />
      <meta property="og:url" content={props.url} />

      <meta name="twitter:title" content={props.title} />
      <meta name="twitter:description" content={props.description} />
      <meta name="twitter:image" content={"images/logo/logo_light.svg"} />

      <link rel="canonical" href={props.url} />
    </Helmet>
  );
};

export default SEOMetaTag;
