import { cn } from "@/src/lib/utils";
import React, { ComponentProps } from "react";

const Separator: React.FC<ComponentProps<"div">> = ({ className }) => {
  return (
    <div
      className={cn(
        "border",
        "border-r-transparent border-b-neutral-300/50 dark:border-b-neutral-700/50 border-l-transparent border-t-neutral-50 dark:border-t-neutral-950", // border
        className
      )}
    />
  );
};

export default Separator;
