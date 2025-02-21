import { notFound } from "next/navigation";
import { format } from "date-fns";
import { allPosts } from "contentlayer2/generated";
import { Mdx } from "@/components/mdx";
import { Badge } from "@/components/ui/badge";

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post._raw.flattenedPath,
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  const resolvedParams = await params;
  const post = allPosts.find(
    (post) => post._raw.flattenedPath === resolvedParams.slug
  );

  if (!post) {
    notFound();
  }

  return (
    <article className="container py-8 max-w-3xl">
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {post.categories.map((category) => (
            <Badge key={category} variant="secondary">
              {category}
            </Badge>
          ))}
        </div>
        <h1 className="text-4xl font-bold">{post.title}</h1>
        <div className="flex gap-4 text-sm text-muted-foreground">
          <time dateTime={post.date}>
            {format(new Date(post.date), "MMMM dd, yyyy")}
          </time>
          <span>{post.readingTime.text}</span>
        </div>
      </div>
      <div className="prose prose-neutral dark:prose-invert mt-8 max-w-none">
        <Mdx code={post.body.code} />
      </div>
    </article>
  );
}
