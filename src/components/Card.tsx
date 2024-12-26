"use client";

import * as React from "react";

import { cn } from "@/src/lib/utils";
import { motion } from "motion/react";

const CardStyled = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof motion.div> & {
    childClassName?: string;
    children?: React.ReactNode;
    transparent?: boolean;
  }
>((
  { childClassName, className, children, transparent, style, ...props },
  ref
) => (
  <motion.div
    ref={ref}
    className={cn(
      "w-full rounded-[24px]",
      transparent
        ? "bg-transparent border-transparent"
        : "to-[--accent-stop] border-neutral-950/20 bg-gradient-to-b dark:border-stone-950/60 border dark:from-neutral-800 dark:to-neutral-900 from-neutral-100",
      className
    )}
    whileHover={"hover"}
    variants={{
      hover: {
        "--accent-stop": "rgb(255, 249, 232)",
      },
      animate: {
        "--accent-stop": "rgb(247, 247, 247)",
      },
    }}
    style={
      {
        "--accent-stop": "rgb(247, 247, 247)",
        ...style,
      } as React.CSSProperties
    }
    {...props}
  >
    {/* Nested structure for aesthetic borders */}
    {/* <div className="rounded-[23px] border  dark:border-neutral-900/80 border-black/10 ">
      <div className="rounded-[22px] border  dark:border-neutral-950 border-white/50">
        <div className="rounded-[21px] border  dark:border-neutral-900/70  border-neutral-950/20"> */}
    {/* Inner content wrapper */}
    <div
      className={cn(
        "w-full rounded-[23px] text-neutral-500",
        childClassName
      )}
      style={{
        boxShadow: !transparent
          ? "rgba(0, 0, 0, 0.05) 0px -3px 0px 0px inset, rgb(255, 255, 255) 0px 0px 0px 2px inset, rgba(0, 0, 0, 0.06) 0px 4px 2px 0px inset, rgba(0, 0, 0, 0.04) 0px 0px 24px 4px inset, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px"
          : undefined,
      }}
    >
      {children}
    </div>
    {/* </div>
      </div>
    </div> */}
  </motion.div>
));

// Allows for global css overrides and theme support - similar to shad cn
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "border",
        "rounded-lg rounded-[calc(var(--radius))] border-white/60 dark:border-border/30", // border
        className
      )}
      {...props}
    >
      <div className="border dark:border-neutral-900/80 border-black/10 rounded-[calc(var(--radius)-1px)]">
        <div className="border dark:border-neutral-950 border-white/50 rounded-[calc(var(--radius)-2px)]">
          <div className="border dark:border-neutral-900/70 border-neutral-950/20 rounded-[calc(var(--radius)-3px)]">
            <div className=" w-full border border-white/50 dark:border-neutral-700/50 text-neutral-500 bg-gradient-to-b from-card/70 to-secondary/50 rounded-[calc(var(--radius)-4px)] ">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "first:pt-6 last:pb-6",
      className
    )}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "pl-2", // padding
      "text-lg font-semibold leading-tight text-neutral-900 dark:text-neutral-100", // textStyles
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "pl-2 text-sm text-neutral-600 dark:text-neutral-400",
      className
    )}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "py-4 px-6",
      className
    )}
    {...props}
  />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center justify-between gap-2 py-4 px-6",
      className
    )}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

const Separator = () => {
  return (
    <div className="border border-t-neutral-50 border-b-neutral-300/50 dark:border-t-neutral-950 dark:border-b-neutral-700/50 border-l-transparent border-r-transparent" />
  );
};

export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardStyled,
  CardTitle,
  Separator,
};
