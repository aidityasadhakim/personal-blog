import Container from "@/app/components/container";
import { LatestPost } from "@/app/components/latest-post";
import { Intro } from "@/app/components/intro";
import { MoreStories } from "@/app/components/more-stories";
import { getAllPosts } from "@/lib/api";

export default function Index() {
  const allPosts = getAllPosts();

  const latestPost = allPosts[0];

  const morePosts = allPosts.slice(1);

  return (
    <main>
      <Container>
        <Intro />
        <LatestPost
          title={latestPost.title}
          coverImage={latestPost.coverImage}
          date={latestPost.date}
          author={latestPost.author}
          slug={latestPost.slug}
          excerpt={latestPost.excerpt}
        />
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
      </Container>
    </main>
  );
}
