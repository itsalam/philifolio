"use client";

import { cn } from "@/src/lib/utils";
import {
  motion,
  MotionStyle,
  useAnimationControls,
  useScroll,
  useTransform,
} from "motion/react";
import { TransitionRouter } from "next-transition-router";
import { usePathname } from "next/navigation";
import { ComponentProps, FC, useEffect, useRef } from "react";
import { Footer } from "../Footer";
import Beams from "./Beams";

export const Layout: FC<ComponentProps<typeof motion.div>> = ({
  children,
  key,
  ...props
}) => {
  const footerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();
  const pathname = usePathname();

  const hasPath = pathname.split("/")[1]?.length;

  const { scrollY, scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });

  useEffect(() => {
    // Check if there's a hash in the URL
    controls.start("animate");
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        // Remove the '#' to get the element's ID
        const id = hash.substring(1);
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    // Initial check if there's a hash in the URL
    handleHashChange();

    // Add event listener for hash changes
    window.addEventListener("hashchange", handleHashChange);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollY, [70, 100], [0, 1]);

  return (
    <TransitionRouter
      auto
      leave={async (next) => {
        await controls.start("exit").finally(next);
      }}
      enter={async (next) => {
        controls.start("animate");
        next();
      }}
    >
      <motion.div
        key={key}
        style={
          {
            ["--stop-1"]: hasPath ? "var(--neutral-800)" : "var(--neutral-100)",
            // background:
            //   "radial-gradient(100% 100% at 0% 0%, var(--stop-1) 23%, var(--stop-1) 100%)",
          } as MotionStyle
        }
        className="flex-1 w-full relative "
      >
        <motion.div
          {...props}
          className={cn(
            "relative",
            hasPath ? "bg-white" : "bg-neutral-300"
          )}
          style={
            {
              // y: useMotionTemplate`${y}dvh`,
              ["--mask-stop-1"]: 10,
              ["--mask-start"]: -10,
              mask: "linear-gradient(130deg, transparent calc((var(--mask-start) * 1%)), black calc((var(--mask-start) * 1%) + 4%), black calc((var(--mask-stop-1) * 1%) - 4%), transparent calc(var(--mask-stop-1)* 1%))",
            } as MotionStyle
          }
          animate={controls}
          // exit={"exit"}
          variants={{
            animate: {
              ["--mask-stop-1"]: [-10, 110],
              ["--mask-start"]: [-10, -10],
              filter: ["blur(4px)", "blur(0px)"],
              transition: {
                duration: 1.0,
              },
              // maxWidth: [null, 100],
            },
            exit: {
              ["--mask-start"]: [-10, 110],
              ["--mask-stop-1"]: [110, 110],
              transition: {
                duration: 1.0,
              },
            },
          }}
        >
          <motion.div className="mx-auto max-w-7xl flex flex-col gap-20 md:gap-52 lg:px-20 px-4 pb-40 flex-1 min-h-screen max-w-screen w-screen z-20 relative">
            {children}
          </motion.div>
          <Beams />
        </motion.div>
        <Footer className="opacity-0" style={{ opacity }} ref={footerRef} />
      </motion.div>
    </TransitionRouter>
  );
};
