"use client";

import {
  motion,
  useInView,
  useMotionTemplate,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
// import { div as motion.div } from "motion/react-client";
import { usePathname } from "next/navigation";
import React, { CSSProperties, useRef } from "react";
import Ray from "./Ray";

const Rays: React.FC = () => {
  const pathname = usePathname();

  const hasPath = pathname.split("/")[1]?.length;
  const { scrollYProgress } = useScroll();

  const scrollVelocity = useVelocity(scrollYProgress);

  const smoothVelocity = useSpring(scrollYProgress, {
    damping: 50,
  });

  const finalMove = smoothVelocity;

  const beam1 = useTransform(finalMove, [0, 0.3, 0.6, 0.9], [0, 300, 0, 300], {
    clamp: true,
  });
  const beam2 = useTransform(
    finalMove,
    [0, 0.3, 0.6, 0.9],
    [-200, 200, -200, 200],
    { clamp: true }
  );
  const beam3 = useTransform(
    finalMove,
    [0, 0.3, 0.6, 0.9],
    [-150, 400, -150, 400],
    { clamp: true }
  );
  const beam4 = useTransform(
    finalMove,
    [0, 0.25, 0.5, 0.75, 1],
    [0, 500, 0, 500, 0],
    { clamp: true }
  );
  const beam5 = useTransform(
    finalMove,
    [0, 0.25, 0.5, 0.75, 1],
    [100, 0, 100, 0, 100],
    { clamp: true }
  );
  const height = useTransform(finalMove, [0, 0.1, 0.9, 1], [100, 0, 0, 100], {
    clamp: true,
  });

  const ref = useRef(null);

  const inView = useInView(ref);

  return (
    <motion.div
      className="w-full h-full absolute top-0"
      style={
        {
          ["--mask-1"]: hasPath ? "rgba(0, 0, 0, 0.60)" : "rgba(0, 0, 0, 0.6)",
          ["--mask-2"]: hasPath ? "rgba(0, 0, 0, 0.30)" : "rgba(0, 0, 0, 0.3)",

          filter: "blur(3px)",
          mask: "radial-gradient(120vw 90vh  at 0% 0%, var(--mask-1) 0%, var(--mask-2) 50%, rgba(0, 0, 0, 0.1) 110.2883%)",
        } as CSSProperties
      }
      variants={{
        initial: { opacity: 0.3 },
        animate: {
          opacity: hasPath ? 0.6 : 1,
          transition: { duration: 1.5 },
        },
      }}
      initial={"initial"}
      ref={ref}
      animate={inView ? "animate" : undefined}
    >
      <Ray
        style={{
          background:
            "linear-gradient(rgb(217, 217, 217) 0%, rgb(217, 217, 217) 70%, rgba(217, 217, 217,0) 90%)",
          mask: "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 15%, rgb(0, 0, 0) 25%, rgba(0, 0, 0, 0) 35%, rgb(0, 0, 0) 50%, rgba(0, 0, 0, 0.13) 65%, rgb(0, 0, 0) 75%, rgba(0, 0, 0, 0) 85%)",
          opacity: 0.45,
          left: useMotionTemplate`${beam1}px`,

          top: 0,
        }}
        variants={{
          animate: {
            opacity: [0.3, 0.85],

            transition: {
              duration: 9,
              repeat: Infinity,
              repeatType: "reverse",
            },
          },
        }}
      />
      <Ray
        style={{
          background:
            "linear-gradient(rgb(217, 217, 217) 0%, rgb(217, 217, 217) 80%, rgba(217, 217, 217,0) 100%)",
          mask: "linear-gradient(90deg, rgba(0, 0, 0, 0) 10%, rgb(0, 0, 0) 20%, rgba(0, 0, 0, 0.55) 30%, rgba(0, 0, 0, 0.13) 50%, rgb(0, 0, 0) 60%, rgba(0, 0, 0, 0) 70%)",
          opacity: 0.05,
          left: useMotionTemplate`${beam2}px`,

          top: 0,
        }}
        variants={{
          animate: {
            opacity: [0.2, 0.55],

            transition: {
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
            },
          },
        }}
      />
      <Ray
        style={{
          background:
            "linear-gradient(rgb(217, 217, 217) 0%, rgb(217, 217, 217) 60%, rgba(217, 217, 217,0) 100%)",
          mask: "linear-gradient(90deg, rgba(0, 0, 0, 0) 5%, rgb(0, 0, 0) 15%, rgba(0, 0, 0, 0.55) 25%, rgba(0, 0, 0, 0.424) 35%, rgb(0, 0, 0) 45%, rgba(0, 0, 0, 0.267) 55%, rgba(0, 0, 0, 0.13) 65%, rgb(0, 0, 0) 75%, rgba(0, 0, 0, 0) 85%)",
          opacity: 0.05,
          left: useMotionTemplate`${beam5}px`,

          top: 0,
        }}
        variants={{
          animate: {
            opacity: [0.1, 0.25],

            transition: {
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
            },
          },
        }}
      />
      <Ray
        style={{
          background:
            "linear-gradient(rgb(217, 217, 217) 0%, rgb(217, 217, 217) 70%, rgba(217, 217, 217,0) 100%)",
          mask: "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 20%, rgba(0, 0, 0, 0.55) 30%, rgb(0, 0, 0) 40%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.13) 60%, rgb(0, 0, 0) 70%, rgba(0, 0, 0, 0) 80%)",
          opacity: 0.05,
          left: useMotionTemplate`${beam3}px`,

          top: 0,
        }}
        variants={{
          animate: {
            opacity: [0.3, 0.65],

            transition: {
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
            },
          },
        }}
      />
      <Ray
        style={{
          background:
            "linear-gradient(rgb(217, 217, 217) 0%, rgb(217, 217, 217) 80%, rgba(217, 217, 217,0) 100%)",
          mask: "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 15%, rgba(0, 0, 0, 0.55) 25%, rgb(0, 0, 0) 35%, rgba(0, 0, 0, 0) 45%, rgba(0, 0, 0, 0.13) 55%, rgb(0, 0, 0) 65%, rgb(0, 0, 0) 75%, rgba(0, 0, 0, 0.47) 85%, rgba(0, 0, 0, 0) 95%)",
          opacity: 0.25,
          left: useMotionTemplate`${beam4}px`,
          top: 0,
        }}
        variants={{
          animate: {
            opacity: [0.2, 0.35],

            transition: {
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse",
            },
          },
        }}
      />
    </motion.div>
  );
};

export default Rays;
