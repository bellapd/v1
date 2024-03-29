import fs from "fs";
import path from "path";
import { Heading, Text } from "@chakra-ui/react";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";

// components
import Tags from "../../components/Main/Tags";
import Layout from "../../components/Main/Layout";
import MDXComponents from "../../components/Posts/MDXcomponents";

// interface
import type { IMdxPage } from "../../types/mdx.type";

// remark plugins
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

// rehype pluings
import rehypeSlug from "rehype-slug";
import rehypeKatex from "rehype-katex";
import rehypePrismPlus from "rehype-prism-plus";
import rehypeCodeTitles from "rehype-code-titles";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrismDiff from "rehype-prism-diff";

// infer mdxSource parameter type hint
export default function Posts({ mdxSource }: IMdxPage) {
  return (
    <Layout>
      <Text fontSize="sm" color="gray.500" mt="5rem">
        {mdxSource.frontmatter.date} - {mdxSource.frontmatter.readingTime}{" "}
        reading
      </Text>
      <Heading as="h1" size="3xl" my={5}>
        {mdxSource.frontmatter.title}
      </Heading>
      {/* <Tags tags={mdxSource.frontmatter.tags} /> */}
      <MDXRemote {...mdxSource} components={MDXComponents} />
    </Layout>
  );
}

export const getStaticPaths = async () => {
  const folders = fs.readdirSync(path.join("content", "posts"));

  const paths = folders.map((name) => ({
    params: {
      slug: name,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

// slug is the id of the post, which is a string
export const getStaticProps = async ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
  const source = fs.readFileSync(
    path.join("content", "posts", slug, "index.mdx"),
    "utf-8"
  );

  const mdxSource = await serialize(source, {
    parseFrontmatter: true,
    mdxOptions: {
      remarkPlugins: [remarkGfm, remarkMath],
      rehypePlugins: [
        rehypeSlug,
        rehypeCodeTitles,
        [rehypeAutolinkHeadings, { behavior: "wrap" }],
        rehypeKatex,
        rehypePrismPlus,
        rehypePrismDiff,
      ],
      format: "mdx",
    },
  });

  return {
    props: {
      mdxSource,
    },
  };
};
