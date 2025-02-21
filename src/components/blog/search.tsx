"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";

export function Search() {
  const router = useRouter();
  const [value, setValue] = React.useState("");
  const debouncedValue = useDebounce(value, 500);

  React.useEffect(() => {
    if (debouncedValue) {
      router.push(`/blog?search=${encodeURIComponent(debouncedValue)}`);
    } else {
      router.push("/blog");
    }
  }, [debouncedValue, router]);

  return (
    <div className="relative w-full">
      <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search posts..."
        className="pl-8"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}
