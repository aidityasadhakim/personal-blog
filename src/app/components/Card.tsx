import * as React from "react";
import { clsx } from "clsx";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={clsx(
        "bg-white shadow-md rounded-lg p-4 flex flex-col justify-between h-full",
        className
      )}
      {...props}
    />
  );
});

export default Card;
