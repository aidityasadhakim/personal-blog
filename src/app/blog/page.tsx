import { compareDesc } from "date-fns";
import { allPosts } from "contentlayer2/generated";
import { PostGrid } from "@/components/blog/post-grid";

export default function BlogPage() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  return (
    <div className="container py-8">
      <h1 className="mb-8 text-3xl font-bold">Blog Posts</h1>
      <PostGrid posts={posts} />
    </div>
  );
}
