import Head from "next/head";
import { useRouter } from "next/router";

export default function Seo({
  title,
  publish,
  description,
  type,
}: {
  title: string;
  publish?: string;
  description?: string;
  type: string;
}): JSX.Element {
  const router = useRouter();
  const meta = {
    author: "Annabella Putri DIrgo",
    description: "A Web Developer's Posts",
    avatar: "https://avatars.githubusercontent.com/u/95697403?v=4",
  };
  const titleWithAuthor = title + " - " + meta.author;
  return (
    <Head>
      <title>{titleWithAuthor}</title>
      <meta name="title" content={title} />
      <meta name="robots" content="follow, index" />
      <meta name="viewport" content="width=device-width" />
      <meta name="author" content={meta.author} />
      <link
        rel="canonical"
        href={`https://bellapd.vercel.app${router.asPath}`}
      />
      <link rel="icon" href={meta.avatar} />

      <meta property="og:type" content={type} />
      <meta
        property="og:url"
        content={`https://bellapd.vercel.app${router.asPath}`}
      />
      <meta property="og:title" content={title + " - " + meta.author} />
      <meta property="og:image" content={meta.avatar} />

      <meta property="twitter:card" content="summary_large_image" />
      {/* <meta property="twitter:url" content="" /> */}
      <meta
        property="twitter:creator"
        content={`https://bsraya.com${router.asPath}`}
      />
      <meta property="twitter:image" content={meta.avatar} />
      {!description ? (
        <>
          <meta name="description" content={meta.description} />
          <meta property="og:description" content={meta.description} />
          <meta property="twitter:description" content={meta.description} />
        </>
      ) : (
        <>
          <meta name="description" content={description} />
          <meta property="og:description" content={description} />
          <meta property="twitter:description" content={description} />
        </>
      )}
      {publish && <meta property="article:published_time" content={publish} />}
    </Head>
  );
}
