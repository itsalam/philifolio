import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import React, { ComponentProps } from "react";

import { cn } from "@/src/lib/utils";

const headingVariants = cva(
  "tracking-tight pb-3 bg-clip-text text-transparent",
  {
    variants: {
      colour: {
        none: "bg-current text-black",
        default:
          "bg-gradient-to-t from-neutral-700 to-neutral-800 dark:from-stone-200 dark:to-neutral-200",
        highlight:
          "bg-gradient-to-t from-neutral-400 to-neutral-600 dark:from-stone-200 dark:to-neutral-200",
        pink: "bg-gradient-to-t from-accent to-accent/90 dark:from-stone-200 dark:to-neutral-200",
        light: "bg-gradient-to-t from-neutral-200 to-neutral-300",
        secondary:
          "bg-gradient-to-t from-neutral-500 to-neutral-600 dark:from-stone-200 dark:to-neutral-200",
      },
      size: {
        default: "text-2xl sm:text-3xl lg:text-4xl",
        xxxs: "text-sm sm:text-md lg:text-md",
        xxs: "text-base sm:text-lg lg:text-lg",
        xs: "text-lg sm:text-xl lg:text-2xl",
        sm: "text-xl sm:text-2xl lg:text-3xl",
        md: "text-2xl sm:text-3xl lg:text-4xl",
        lg: "text-3xl sm:text-4xl lg:text-5xl",
        xl: "text-4xl sm:text-5xl lg:text-6xl",
        xll: "text-5xl sm:text-6xl lg:text-[5.4rem]  lg:leading-[0.5rem] ",
        xxl: "text-5xl sm:text-6xl lg:text-[6rem]",
        xxxl: "text-5xl sm:text-6xl lg:text-[8rem]",
      },
      weight: {
        default: "font-normal",
        medium: "font-medium",
        thin: "font-thin",
        base: "font-base",
        semi: "font-semibold",
        bold: "font-bold",
        black: "font-black",
      },
    },
    defaultVariants: {
      colour: "default",
      size: "default",
      weight: "default",
    },
  }
);

export interface HeadingProps extends VariantProps<typeof headingVariants> {
  asChild?: boolean;
  children: React.ReactNode;
  className?: string;
  asHeader?: boolean;
}

const GradientHeading = React.forwardRef<
  HTMLHeadingElement,
  ComponentProps<"span"> & HeadingProps
>((
  { asChild, asHeader, colour, weight, size, className, children, ...props },
  ref
) => {
  const Comp = asChild ? Slot : "h3"; // default to 'h3' if not a child
  const Text = asHeader ? "h3" : "span";
  return (
    <Comp ref={ref} {...props} className={className}>
      <Text className={cn(headingVariants({ colour, size, weight }))}>
        {children}
      </Text>
    </Comp>
  );
});

GradientHeading.displayName = "GradientHeading";

// Manually define the variant types
export type Variant = "default" | "pink" | "light" | "secondary";
export type Size =
  | "default"
  | "xxs"
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "xxl"
  | "xxxl";
export type Weight = "default" | "thin" | "base" | "semi" | "bold" | "black";

export { GradientHeading, headingVariants };
