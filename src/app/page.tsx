import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 text-center px-6 py-16 md:py-32">
      <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
        Still and will always learning.
      </h1>
      <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
        Interest in web development and data engineering
      </p>
      <div className="space-x-4">
        <Button asChild>
          <Link href="/blog">Read Blog</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/about">About Me</Link>
        </Button>
      </div>
    </div>
  );
}
