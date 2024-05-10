import { promises, readFileSync } from "fs";
import matter from "gray-matter";
import { bundleMDX } from "mdx-bundler";
import { join } from "path";
import readingTime from "reading-time";
import { Frontmatter } from "@/interfaces/Frontmatter";
// import rehypeAutolinkHeadings from 'rehype-autolink-headings';
// import rehypePrettyCode from 'rehype-pretty-code';
// import rehypeSlug from 'rehype-slug';
// import remarkGfm from 'remark-gfm';

// import { sortByDate } from '@/lib/mdx.client';

export async function getFileSlugArray() {
  return getFileList(join(process.cwd(), "_posts")).then((paths) =>
    paths.map((path) =>
      path
        .replace(join(process.cwd(), "_posts") + "/", "")
        .replace(".mdx", "")
        .split("/")
    )
  );
}

const getFileList = async (dirName: string) => {
  let files: string[] = [];
  const items = await promises.readdir(dirName, { withFileTypes: true });

  for (const item of items) {
    if (item.isDirectory()) {
      files = [...files, ...(await getFileList(`${dirName}/${item.name}`))];
    } else {
      files.push(`${dirName}/${item.name}`);
    }
  }

  return files;
};

export async function getAllFilesFrontmatter() {
  const files = await getFileList(join(process.cwd(), "_posts"));

  return files.reduce((allPosts: any, absolutePath: string) => {
    const source = readFileSync(absolutePath, "utf8");
    const { data } = matter(source);

    const res = [
      {
        ...data,
        slug: absolutePath
          .replace(join(process.cwd(), "_posts") + "/", "")
          .replace(".mdx", ""),
        readingTime: readingTime(source),
      },
      ...allPosts,
    ];
    return res;
  }, []);
}
