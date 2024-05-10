import { type Author } from "./author";

export type Post = {
  slug: string;
  title: string;
  createdAt: string;
  banner: string;
  author: string;
  excerpt: string;
  content: string;
  preview?: boolean;
  lastUpdatedAt?: string;
};
