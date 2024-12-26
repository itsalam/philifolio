"use client";

import { cn } from "@/src/lib/utils";
import { motion, MotionProps } from "motion/react";
import React, { ComponentProps } from "react";

const Ray: React.FC<ComponentProps<typeof motion.div> & MotionProps> = ({
  style,
  className,
  variants,
  ...props
}) => {
  return (
    <motion.div
      {...props}
      className={cn("h-full w-full", className)}
      style={{
        background:
          "linear-gradient(rgb(217, 217, 217) 0%, rgb(217, 217, 217) 83.9344%, rgba(217, 217, 217,0) 100%)",
        mask: "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 20.0362%, rgba(0, 0, 0, 0.55) 27.5778%, rgb(0, 0, 0) 42.3423%, rgba(0, 0, 0, 0) 48.6047%, rgba(0, 0, 0, 0.13) 67.1171%, rgb(0, 0, 0) 74.9525%, rgb(0, 0, 0) 82.4324%, rgba(0, 0, 0, 0.47) 88.6719%, rgba(0, 0, 0, 0) 97.2973%)",
        opacity: 0.25,
        transform: "skewX(45deg)",

        width: "50dvw",
        height: "120dvh",
        top: 0,
        position: "absolute",
        ...style,
      }}
      variants={{
        animate: {
          opacity: [0.2, 0.35],
          skewX: [45, 45],
          transition: {
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse",
          },
        },
        ...variants,
      }}
    />
  );
};

export default Ray;
