"use client";
import { Avatar } from "@/src/components/ui/avatar";
import { HomePageInfo } from "@/src/sanity/lib/sanity.queries";
import { motion } from "motion/react";
import { ComponentProps, FC } from "react";

type ImageBadgeProps = {
  keyImageData?: NonNullable<NonNullable<HomePageInfo>["keyImage"]>[number];
} & Omit<ComponentProps<typeof Avatar>, "src">;

const ScrollDownIndicator: FC<{}> = ({}) => {
  return (
    <motion.div
      style={{
        color: "white" /* Default text color (acts as a base) */,
        mixBlendMode: "difference",
      }}
      animate={{
        opacity: [0, 0.6],
        transition: { delay: 2, duration: 1 },
      }}
      className="absolute font-body flex flex-col bottom-8 gap-2 items-center justify-center text-sm opacity-50"
    >
      Scroll down
      <motion.div className="relative flex items-start p-1 justify-center rounded-full h-10 w-5 border-2 border-white">
        <motion.div
          animate={{
            opacity: [0, 1, 1, 0],
            y: [10, -1, 16, 20],
            transition: {
              ease: "easeInOut",
              times: [0.3, 0.6, 0.9, 1],
              repeat: Infinity,
              repeatDelay: 1,
              duration: 3,
              repeatType: "loop",
            },
          }}
          className="h-2 w-2 relative rounded-full bg-white"
        />
      </motion.div>
    </motion.div>
  );
};

export default ScrollDownIndicator;
