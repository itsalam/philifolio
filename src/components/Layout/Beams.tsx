"use client";

import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import React, { CSSProperties, useCallback } from "react";
import Rays from "./Rays";

const Beams: React.FC = () => {
  const pathname = usePathname();

  const hasPath = pathname.split("/")[1]?.length;
  const FixedRays = useCallback(() => <Rays />, []);

  return (
    <motion.div
      className="absolute top-0 h-full w-full -z-10 noise overflow-hidden"
      style={
        {
          ["--stop-1"]: hasPath ? "var(--neutral-800)" : "var(--neutral-100)",
          ["--mask-end"]: hasPath ? "rgba(0, 0, 0, 0.1)" : "rgba(0, 0, 0, 0.4)",
          background:
            "radial-gradient(120vw 100vh at 0% 0%, var(--stop-1) 23%, rgb(0, 0, 0) 100%)",
          mask: "radial-gradient(100vw 90vh at 0% 0%, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0.3) 102%, rgba(0, 0, 0, 0.3) 105%, var(--mask-end) 115.2883%)",
          opacity: 1,
        } as CSSProperties
      }
    >
      <FixedRays />
    </motion.div>
  );
};

export default Beams;
