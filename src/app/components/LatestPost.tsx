import Avatar from "@/app/components/avatar";
import CoverImage from "@/app/components/cover-image";
import Link from "next/link";
import Card from "./Card";
import { getAllFilesFrontmatter } from "@/lib/mdx/mdx.server";
import { Frontmatter } from "@/interfaces/Frontmatter";
import clsx from "clsx";

export const getData: any = async () => {
  const post = await getAllFilesFrontmatter();

  return post;
};

export async function LatestPost() {
  const postsFrontmatter = await getData();

  return (
    <section className="divide-y divide-gray-200">
      <h1 className="text-2xl md:text-5xl font-bold tracking-tighter leading-tight md:pr-8 py-5">
        Latest 🆕
      </h1>

      <section className="py-12">
        <ul className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {postsFrontmatter.map((post: Frontmatter) => {
            return (
              <Card className="bg-gray-100">
                <Link href={`/posts/${post.slug}`}>
                  <div>
                    <CoverImage
                      title={post.title}
                      src={post.banner}
                      slug={post.slug}
                    />
                  </div>
                  <div>
                    <h3
                      className={clsx(
                        "text-2xl mt-3 font-bold leading-snug",
                        "underline underline-offset-2 decoration-teal-400"
                      )}
                    >
                      {post.title}
                    </h3>
                    <p className="text-lg leading-relaxed mb-4">
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              </Card>
            );
          })}
        </ul>
      </section>
    </section>
  );
}
