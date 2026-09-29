import { Helmet } from "react-helmet-async";

interface Props {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: string;
  schema?: Record<string, unknown>;
}

const SITE = "https://idiol.in";

export function Seo({ title, description, path = "/", image = "/og.jpg", type = "website", schema }: Props) {
  const url = `${SITE}${path}`;
  const fullTitle = `${title} | IDIOL`;
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {schema && <script type="application/ld+json">{JSON.stringify(schema)}</script>}
    </Helmet>
  );
}
