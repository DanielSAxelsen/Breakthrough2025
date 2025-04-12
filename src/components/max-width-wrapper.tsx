import { cn } from "@/lib/utils";
import React, { forwardRef, HTMLAttributes } from "react";

const MaxWidthWrapper = forwardRef<
  HTMLDivElement,
  {
    className?: string;
    children: React.ReactNode;
  } & HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      {...props}
      className={cn(
        "w-full max-w-[95rem] mx-auto md:px-16 sm:px-14 px-5 relative",
        className
      )}
    >
      {children}
    </div>
  );
});

MaxWidthWrapper.displayName = "MaxWidthWrapper";

export default MaxWidthWrapper;
