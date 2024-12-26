"use client";

import { GradientHeading } from "@/src/components/GradientHeading";
import SanityImage from "@/src/components/SanityImage";
import Link from "@/src/components/ui/link";
import { cn } from "@/src/lib/utils";
import { ProjectInfo } from "@/src/sanity/lib/sanity.queries";
import { motion } from "motion/react";

const variants = {
  reveal: {
    y: [4, 0],
    filter: ["blur(4px)", "blur(0px)"],
    opacity: [0, 1],
  },
};

export default function Header({ project }: { project: ProjectInfo }) {
  return (
    <motion.div
      animate={"reveal"}
      transition={{
        staggerChildren: 0.1,
        delayChildren: 1.0,
      }}
      className="pt-52 w-full flex flex-col gap-20"
    >
      <motion.div
        animate={"reveal"}
        transition={{
          staggerChildren: 0.1,
        }}
        className="flex justify-between gap-36 md:flex-row flex-col"
      >
        <motion.div variants={variants} className="flex-1 flex flex-col gap-4">
          <GradientHeading
            asHeader
            asChild
            size={"lg"}
            colour={"pink"}
            weight="medium"
            className="tracking-[normal] !leading-[1.15]"
            // style={{ textWrap: "balance" }}
          >
            {project?.description?.shortDescBody}
          </GradientHeading>
          <div className="flex flex-col">
            <GradientHeading
              asHeader
              asChild
              size={"sm"}
              colour={"none"}
              weight="medium"
              className="tracking-wide !leading-[1.15]"
            >
              {project?.title}
            </GradientHeading>
            <span className="leading-tight">
              {project?.description?.descriptionBody}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            {project?.url && (
              <Link className="font-semibold font-body" href={project?.url}>
                {project?.url}
              </Link>
            )}
            <div className="flex gap-4">
              {project?.appleLink && (
                <Link className="font-body" href={project?.appleLink}>
                  <span
                    style={{
                      backgroundImage: `url("/appstore.svg")`,
                    }}
                    className="bg-contain bg-no-repeat inline-block w-5 aspect-square mr-1"
                  />
                  App Store
                </Link>
              )}
              {project?.androidLink && (
                <Link className="font-body" href={project?.androidLink}>
                  <span
                    style={{
                      backgroundImage: `url("/googleplay.svg")`,
                    }}
                    className="bg-contain bg-no-repeat inline-block w-5 aspect-square mr-1"
                  />
                  Google Play Store
                </Link>
              )}
            </div>
          </div>
        </motion.div>
        <motion.div
          variants={variants}
          className="w-full md:w-1/3 grow-1 shrink-0 flex flex-wrap gap-10"
        >
          {project?.description?.attributes?.map(({
            label,
            desc,
            isFullWidth,
          }) => {
            return (
              <div
                key={label}
                className={cn(
                  "flex", // sizing
                  "flex-col gap-[2px] whitespace-pre-wrap", // layout, textWrapping
                  "leading-tight", // textStyles
                  isFullWidth ? "w-full" : "w-5/12"
                )}
              >
                <h4 className="font-bold text-lg">{label}</h4>
                <p>{desc}</p>
              </div>
            );
          })}
        </motion.div>
      </motion.div>
      <motion.div
        variants={{
          reveal: {
            y: [4, 0],
            filter: ["blur(4px)", "blur(0px)"],
            opacity: [0, 1],
          },
        }}
        className="rounded-[32px] overflow-hidden"
      >
        {project?.mainImage?.asset && (
          <SanityImage
            src={project.mainImage.asset}
            alt="main project thumbnail"
          />
        )}
      </motion.div>
    </motion.div>
  );
}
