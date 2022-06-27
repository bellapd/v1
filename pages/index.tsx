import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Posts from "../components/Posts";
import Layout from "../components/Layout";
import { Heading, Box, Stack, Text } from "@chakra-ui/react";
import type { IPost } from "../types/post.type";
import { DateTime } from "luxon";
import Readall from "../components/Readall";

export default function Home({ posts }: { posts: IPost[] }): JSX.Element {
  return (
    <Layout>
      <Stack align={"left"} my={6}>
        <Heading as="h1" size="3xl">
          I'm{" "}
          <Box as="span" bg="#F2A814" bgClip="text">
            Anna
          </Box>
          bella
        </Heading>
        <Text as="i" fontSize="sm" my={6}>
          An Undergraduate Student of Electrical Engineering and Computer
          Science at National Tsing Hua University.
        </Text>
      </Stack>
      <Text as="b" fontSize="xl" my={6}>
        Recent posts
      </Text>
      <Posts posts={posts} />
      <Readall />
    </Layout>
  );
}

export const getStaticProps = async () => {
  const folders = fs.readdirSync(path.join(process.cwd(), "content", "blogs"));

  var posts = folders.slice(0, 2).map((slug) => {
    const content = fs.readFileSync(
      path.join("content", "blogs", slug, "index.mdx"),
      "utf-8"
    );
    const { data: frontMatter } = matter(content);
    return {
      frontMatter,
      slug: slug,
    };
  });

  posts.sort((a, b) => {
    const aDate: typeof a.frontMatter.date = DateTime.fromFormat(
      a.frontMatter.date,
      "LLLL dd, yyyy"
    );
    const bDate: typeof a.frontMatter.date = DateTime.fromFormat(
      b.frontMatter.date,
      "LLLL dd, yyyy"
    );
    return bDate - aDate;
  });

  return {
    props: {
      posts,
    },
  };
};
