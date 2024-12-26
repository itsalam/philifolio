import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/src/lib/utils";
import { motion } from "motion/react";

const buttonVariantsOuter = cva("dark:border-[2px] p-[1px]", {
  variants: {
    variant: {
      primary:
        "w-full border border-[1px]  border-black/10 dark:border-black bg-gradient-to-b from-black/70 to-black dark:from-white dark:to-white/80   ",
      accent:
        "w-full border-[1px] border-black/10 dark:border-amber-950 bg-gradient-to-b from-amber-300/90 to-amber-500 dark:from-amber-200/70 dark:to-amber-500   ",
      destructive:
        "w-full border-[1px] border-black/10 dark:border-amber-950 bg-gradient-to-b from-red-300/90 to-red-500 dark:from-red-300/90 dark:to-red-500   ",
      secondary:
        "w-full border-[1px] border-black/20 bg-white/50 dark:border-amber-950 dark:bg-amber-600/50   ",
      minimal:
        "group  w-full border-[1px] dark:border-[1px] border-black/20 bg-white/50 dark:border-amber-950 dark:bg-amber-600/80  active:bg-amber-200 dark:active:bg-amber-800 hover:bg-gradient-to-t hover:from-amber-100 to-white dark:hover:from-amber-600/50 dark:hover:to-amber-600/70 active:bg-amber-200 dark:active:bg-amber-800",
      icon: "group rounded-full border dark:border-amber-950 border-black/10 dark:bg-amber-600/50 bg-white/50 active:bg-amber-200 dark:active:bg-amber-800 hover:bg-gradient-to-t hover:from-amber-100 to-white dark:hover:from-amber-700 dark:hover:to-amber-600 active:bg-amber-200 dark:active:bg-amber-800",
    },
    animated: {
      false: "",
      true: "transition-all duration-500 ease-in-out",
    },
    size: {
      sm: "rounded-[6px]",
      default: "rounded-[12px]",
      lg: "rounded-[12px]",
      icon: "rounded-full",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "default",
    animated: true,
  },
});

const innerDivVariants = cva(
  "w-full h-full flex items-center justify-center text-muted-foreground",
  {
    variants: {
      variant: {
        primary:
          "gap-2 bg-gradient-to-b from-amber-800 to-black  dark:from-amber-200 dark:to-amber-50 text-sm text-white/90 dark:text-black/80ease-in-out  hover:from-stone-800 hover:to-amber-800/70 dark:hover:from-stone-200 dark:hover:to-amber-200 dark:active:from-stone-300 dark:active:to-amber-300 active:bg-gradient-to-b active:from-black active:to-black ",
        accent:
          "gap-2 bg-gradient-to-b from-amber-400 to-amber-600 text-sm text-white/90ease-in-out hover:bg-gradient-to-b hover:from-amber-400/70 hover:to-amber-600/70 dark:hover:from-amber-400/70 dark:hover:to-amber-600/70 active:bg-gradient-to-b active:from-amber-400/80 active:to-amber-600/80 dark:active:from-amber-400 dark:active:to-amber-600",
        destructive:
          "gap-2 bg-gradient-to-b from-red-400/60 to-red-500/60 text-sm text-white/90ease-in-out hover:bg-gradient-to-b hover:from-red-400/70 hover:to-red-600/70 dark:hover:from-red-400/70 dark:hover:to-red-500/80 active:bg-gradient-to-b active:from-red-400/80 active:to-red-600/80 dark:active:from-red-400 dark:active:to-red-500",
        secondary:
          "bg-gradient-to-b from-amber-100/80 to-amber-200/50 dark:from-amber-800 dark:to-amber-700/50 text-smease-in-out hover:bg-gradient-to-b hover:from-amber-200/40 hover:to-amber-300/60 dark:hover:from-amber-700 dark:hover:to-amber-700/60 active:bg-gradient-to-b active:from-amber-200/60 active:to-amber-300/70 dark:active:from-amber-800 dark:active:to-amber-700",
        minimal:
          "bg-gradient-to-b from-transparent to-amber-50/50 dark:from-amber-800 dark:to-amber-700/50 text-sm  group-hover:bg-gradient-to-b group-hover:from-amber-50/50 group-hover:to-amber-100/60 dark:group-hover:from-amber-700 dark:group-hover:to-amber-700/60 group-active:bg-gradient-to-b group-active:from-amber-100/60 group-active:to-amber-100/90 dark:group-active:from-amber-800 dark:group-active:to-amber-700",
        icon: "bg-gradient-to-b from-white to-amber-50/50 dark:from-amber-800 dark:to-amber-700/50 group-active:bg-amber-200 dark:group-active:bg-amber-800 rounded-full",
      },
      size: {
        sm: "text-xs rounded-[4px] px-4 py-1",
        default: "text-sm rounded-[10px] px-4 py-2",
        lg: "text-base rounded-[10px] px-4 py-2",
        icon: " rounded-full p-1",
      },
      animated: {
        true: "transition-all duration-300 ease-in-out",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
      animated: true,
    },
  }
);

type UnifiedButtonProps<T extends React.ElementType = "button"> = {
  variant?:
    | "primary"
    | "secondary"
    | "accent"
    | "destructive"
    | "minimal"
    | "icon";
  size?: "default" | "sm" | "lg" | "icon";
  animated?: boolean;
  asChild?: boolean;
} & React.ComponentPropsWithoutRef<T>;

type UnifiedButtonRef<T extends React.ElementType> = React.Ref<T>;

const TextureButton = React.forwardRef(function TextureButton<
  T extends React.ElementType = "button",
>(
  {
    children,
    variant = "primary",
    size = "default",
    animated = true,
    asChild = false,
    className,
    ...props
  }: UnifiedButtonProps<T>,
  ref: React.Ref<UnifiedButtonRef<T>>
) {
  const Comp = asChild ? Slot : ("button" as React.ElementType);

  return (
    <Comp
      className={cn(
        asChild ? "" : buttonVariantsOuter({ variant, size, animated }),
        className
      )}
      ref={ref}
      {...props}
    >
      <div className={cn(innerDivVariants({ variant, size, animated }))}>
        {children}
      </div>
    </Comp>
  );
});

TextureButton.displayName = "TextureButton";

const MotionButton = motion(TextureButton);

export { MotionButton, TextureButton };

// export TextureButton
