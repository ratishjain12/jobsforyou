"use client";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";
import { forwardRef } from "react";

export default forwardRef<
  HTMLSelectElement,
  React.HTMLProps<HTMLSelectElement>
>(function Select({ className, ...props }, ref) {
  const { theme } = useTheme();

  return (
    <div className="relative">
      <select
        className={cn(
          "h-10 w-full appearance-none truncate rounded-md border-input bg-muted py-2 pl-3 pr-8 text-sm ring-offset-2 ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
        ref={ref}
      />
      <ChevronDown
        className={`absolute right-3 top-3 h-4 w-4 ${theme === "light" ? "" : "text-primary"}`}
      />
    </div>
  );
});
