import React, { ComponentProps } from "react";
import { cn } from "../lib/utils";

const FancyDisplayFont: React.FC<ComponentProps<"div">> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        "flex", // sizing
        "items-center justify-center gap-4", // layout
        "font-display text-4xl font-bold italic text-amber-600", // textStyles
        className
      )}
      {...props}
    >
      <div className="h-px w-20 bg-gradient-to-r from-transparent to-amber-600" />
      <p>{children}</p>
      <div className="h-px w-20 bg-gradient-to-r from-amber-600 to-transparent" />
    </div>
  );
};

export default FancyDisplayFont;
