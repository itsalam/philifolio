"use client";

import { GradientHeading } from "@/src/components/GradientHeading";
import {
  motion,
  MotionValue,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "motion/react";
import { ComponentProps, FC, useRef } from "react";

type RevealTextProps = {
  text: string;
};

const RevealWord: FC<
  ComponentProps<typeof motion.span> & {
    scrollYProgress: MotionValue<number>;
    i: number;
    len: number;
  }
> = ({ scrollYProgress, i, len, ...props }) => {
  const opacity = useTransform(
    scrollYProgress,
    [i / len, (i + 1) / len],
    [0.1, 1.0],
    { clamp: true }
  );

  const blurVal = useTransform(
    scrollYProgress,
    [i / len, (i + 1) / len],
    [5.0, 0.0],
    { clamp: true }
  );

  const blur = useMotionTemplate`blur(${blurVal}px)`;

  return (
    <motion.span
      style={{
        filter: blur,
        opacity,
      }}
      {...props}
    />
  );
};

export default function RevealText({ text }: RevealTextProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0% 60%", "50% 60%"],
  });

  return (
    <div ref={ref} className="w-full p-8 rounded-lg my-auto">
      <GradientHeading
        id="aboutQuote"
        size={"lg"}
        colour={"none"}
        className="text-center !leading-relaxed"
        asChild
        asHeader
        // style={{ textWrap: "balance" }}
      >
        {text.split(" ").map((word, i, arr) => (
          <RevealWord
            key={`${word}-${i}`}
            scrollYProgress={scrollYProgress}
            i={i}
            len={arr.length}
            // animate={}
          >
            {(i ? " " : "") + word}
          </RevealWord>
        ))}
      </GradientHeading>
    </div>
  );
}
