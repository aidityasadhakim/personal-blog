import Container from "@/app/components/container";
import { LatestPost } from "@/app/components/LatestPost";
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
          coverImage={latestPost.banner}
          date={latestPost.createdAt}
          author={latestPost.author}
          slug={latestPost.slug}
          excerpt={latestPost.excerpt}
        />
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
      </Container>
    </main>
  );
}
