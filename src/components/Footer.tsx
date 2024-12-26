"use client";

import { ComponentPropsWithoutRef, RefObject } from "react";

import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "motion/react";
import { forwardRef } from "react";
import FancyDisplayFont from "./FancyDisplayFont";
import { GradientHeading } from "./GradientHeading";
import Rays from "./Layout/Rays";
import { Button } from "./ui/button";

export const Footer = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof motion.div>
>(({ className, ...props }, ref) => {
  const { scrollYProgress } = useScroll({
    target: ref as RefObject<HTMLDivElement>,
    offset: ["start end", "end end"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-100, -0]);

  return (
    <motion.div
      className="h-[100dvh] relative -z-30 bg-black"
      ref={ref}
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: [0, 1],
        transition: {
          delay: 2,
        },
      }}
    >
      {/* Sticky leaf element */}
      <motion.div
        style={{ y: useMotionTemplate`${y}%` }}
        className="h-full overflow-hidden relative bg-black w-full -z-30 text-center justify-center text-xs text-neutral-500 border-t border-neutral-100 noise"
      >
        <div className="relative max-w-[420px] h-full flex flex-col justify-center mx-auto gap-4">
          <FancyDisplayFont>I'm Available</FancyDisplayFont>
          <div className="relative">
            <p className="text-white font-display text-7xl">What's Next?</p>
            <p className="text-xl pt-2" style={{ textWrap: "pretty" }}>
              Let's connect about new opportunities or fresh ideas. My door is
              always open.
            </p>
          </div>

          <Button className="rounded-xl bg-amber-500 w-80 mx-auto z-10 hover:bg-amber-400">
            Lets Connect
          </Button>
        </div>
        <GradientHeading
          colour={"pink"}
          className="!text-[10px] absolute bottom-0 left-0 border-t border-neutral-300 w-full h-fit z-10"
          asChild
        >
          <span className="font-semibold">{new Date().getFullYear()} </span>
          &#8212; Designed by Philip.{" "}
          <a href="www.vincentlam.dev">Made by Vincent Lam.</a>
        </GradientHeading>
        <Rays />
      </motion.div>
    </motion.div>
  );
});
