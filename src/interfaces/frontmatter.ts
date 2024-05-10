import { ReadTimeResults } from "reading-time";

export type Frontmatter = {
  title: string;
  excerpt: string;
  banner: string;
  createdAt: string;
  lastUpdatedAt?: string;
  author: string;
  tags: string;
  slug: string;
  readingTime: ReadTimeResults;
};
