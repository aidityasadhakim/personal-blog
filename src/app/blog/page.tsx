import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

// Simulated blog posts for demonstration
const posts = [
  {
    id: 1,
    title: "Getting Started with Next.js",
    summary: "Learn how to build modern web applications with Next.js",
    date: "2024-02-20",
    readingTime: "5 min read",
    categories: ["Web Development", "Next.js"],
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 2,
    title: "Understanding Data Engineering",
    summary: "An introduction to data engineering concepts and practices",
    date: "2024-02-19",
    readingTime: "7 min read",
    categories: ["Data Engineering"],
    image: "/placeholder.svg?height=400&width=600",
  },
  // Add more posts as needed
];

export default function BlogPage() {
  return (
    <div className="container py-8">
      <h1 className="mb-8 text-3xl font-bold">Blog Posts</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Card key={post.id} className="flex flex-col overflow-hidden">
            <div className="aspect-video relative">
              <Image
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 space-y-2 p-4">
              <div className="flex flex-wrap gap-2">
                {post.categories.map((category) => (
                  <Badge key={category} variant="secondary">
                    {category}
                  </Badge>
                ))}
              </div>
              <h2 className="text-xl font-bold">{post.title}</h2>
              <p className="text-muted-foreground">{post.summary}</p>
              <div className="flex justify-between text-sm text-muted-foreground">
                <time dateTime={post.date}>{post.date}</time>
                <span>{post.readingTime}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
