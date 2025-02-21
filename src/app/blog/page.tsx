"use client";

import { useState, useEffect, useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { allPosts } from "contentlayer2/generated";
import Link from "next/link";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export default function BlogPage() {
  const [posts, setPosts] = useState<typeof allPosts>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const postsPerPage = 6;

  // Function to load more posts
  const loadMorePosts = useCallback(() => {
    setLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      const startIndex = (page - 1) * postsPerPage;
      const endIndex = startIndex + postsPerPage;
      const newPosts = allPosts.slice(startIndex, endIndex);
      setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      setLoading(false);
    }, 500);
  }, [page]);

  // Initial load
  useEffect(() => {
    loadMorePosts();
  }, [loadMorePosts]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          !loading &&
          posts.length < allPosts.length
        ) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1.0 }
    );

    const sentinel = document.getElementById("sentinel");
    if (sentinel) {
      observer.observe(sentinel);
    }

    return () => observer.disconnect();
  }, [loading, posts.length]);

  return (
    <div className="container py-8">
      <h1 className="mb-8 text-3xl font-bold">Blog Posts</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => (
          <Card key={post._id} className="flex flex-col overflow-hidden">
            <CardHeader className="p-0">
              <Link href={post.url}>
                <div className="aspect-video relative overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform hover:scale-105"
                    priority={index <= 2}
                  />
                </div>
              </Link>
            </CardHeader>
            <CardContent className="flex-1 space-y-2 pt-4">
              <div className="flex flex-wrap gap-2">
                {post.categories.map((category) => (
                  <Badge key={category} variant="secondary">
                    {category}
                  </Badge>
                ))}
              </div>
              <Link href={post.url}>
                <h2 className="text-xl font-bold hover:underline">
                  {post.title}
                </h2>
              </Link>
              <p className="text-muted-foreground">{post.summary}</p>
            </CardContent>
            <CardFooter className="text-sm text-muted-foreground">
              <div className="flex w-full justify-between">
                <time dateTime={post.date}>
                  {format(new Date(post.date), "MMMM dd, yyyy")}
                </time>
                <span>{post.readingTime.text}</span>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Loading state */}
      {loading && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="flex flex-col overflow-hidden">
              <div className="aspect-video relative bg-muted animate-pulse" />
              <div className="flex-1 space-y-2 p-4">
                <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
                <div className="h-8 bg-muted animate-pulse rounded" />
                <div className="h-4 bg-muted animate-pulse rounded" />
                <div className="flex justify-between">
                  <div className="h-4 w-1/4 bg-muted animate-pulse rounded" />
                  <div className="h-4 w-1/4 bg-muted animate-pulse rounded" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Sentinel element for infinite scroll */}
      {posts.length < allPosts.length && (
        <div id="sentinel" className="h-4 w-full" />
      )}

      {/* End of posts message */}
      {posts.length === allPosts.length && (
        <p className="text-center text-muted-foreground mt-8">
          No more posts to load
        </p>
      )}
    </div>
  );
}
