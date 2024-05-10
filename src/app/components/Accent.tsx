import clsx from "clsx";
import * as React from "react";

type AccentType = React.ComponentPropsWithoutRef<"span">;

export default function Accent({ children, className }: AccentType) {
  return (
    <span
      className={clsx(
        className,
        "transition-colors",
        "bg-gradient-to-tr from-teal-400 via-green-300 to-teal-200 bg-clip-text text-transparent"
        // "dark:from-teal-400 dark:to-teal-100 dark:bg-clip-text dark:text-transparent"
      )}
    >
      {children}
    </span>
  );
}
