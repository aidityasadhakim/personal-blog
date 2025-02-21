"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { useInView } from "react-intersection-observer";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Post } from "contentlayer2/generated";

interface PostGridProps {
  posts: Post[];
  loadMore?: () => Promise<void>;
  hasMore?: boolean;
}

export function PostGrid({ posts, loadMore, hasMore = false }: PostGridProps) {
  const { ref, inView } = useInView();

  React.useEffect(() => {
    if (inView && hasMore && loadMore) {
      loadMore();
    }
  }, [inView, hasMore, loadMore]);

  return (
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
      {hasMore && (
        <div ref={ref} className="col-span-full">
          <PostSkeleton />
        </div>
      )}
    </div>
  );
}

export function PostSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[...Array(3)].map((_, i) => (
        <Card key={i} className="flex flex-col overflow-hidden">
          <CardHeader className="p-0">
            <Skeleton className="aspect-video" />
          </CardHeader>
          <CardContent className="flex-1 space-y-2 pt-4">
            <div className="flex gap-2">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-16" />
            </div>
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </CardContent>
          <CardFooter>
            <div className="flex w-full justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-16" />
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
