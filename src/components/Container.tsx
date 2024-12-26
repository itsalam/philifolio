"use client";

import { cn } from "@/src/lib/utils";
import { motion, useInView } from "motion/react";
import { ComponentProps, useRef } from "react";

export const Container = ({
  children,
  className,
  reveal,
  ...props
}: ComponentProps<typeof motion.div> & { reveal?: boolean }) => {
  const ref = useRef(null);

  const inView = useInView(ref, {
    margin: "-300px",
    amount: "some",
    once: true,
  });

  return (
    <motion.div
      {...props}
      animate={{ opacity: inView ? 1 : 0 }}
      ref={ref}
      className={cn(
        `max-w-5xl w-full mx-auto overflow-visible font-display flex justify-center items-center`,
        className
      )}
    >
      {children}
    </motion.div>
  );
};
