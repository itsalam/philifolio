"use client";

import {
  CardContent as BaseCardContent,
  CardStyled,
  CardTitle,
} from "@/src/components/Card";
import { GradientHeading } from "@/src/components/GradientHeading";
import SanityImage from "@/src/components/SanityImage";
import { MotionButton } from "@/src/components/TextureButton";
import { Badge } from "@/src/components/ui/badge";
import { cn } from "@/src/lib/utils";
import { ThumbnailProject } from "@/src/sanity/lib/sanity.queries";
import { motion } from "motion/react";
import { Link } from "next-transition-router";
import { useRouter } from "next/navigation";

const CardContent = motion.create(BaseCardContent);

type ProjectProps = {
  className?: string;
  project: ThumbnailProject;
  oritentation?: "horizontal" | "vertical";
};

export default function ProjectCard({
  className,
  project,
  oritentation = "horizontal",
}: ProjectProps) {
  const router = useRouter();
  return (
    <CardStyled
      className={cn(
        "w-full",
        oritentation === "horizontal" ? "w-full" : "md:max-w-[50%]",
        className
      )}
      initial={"aniimate"}
    >
      <motion.div
        className={cn(
          "flex h-auto flex-col-reverse rounded-[12px] p-2",
          oritentation === "horizontal" ? "md:flex-row md:h-96" : "",
          project.inComplete ? "opacity-50" : ""
        )}
      >
        <CardContent
          className={cn(
            "flex w-auto flex-col justify-between gap-2 font-body",
            oritentation === "horizontal" ? "md:w-80" : ""
          )}
        >
          <div>
            <CardTitle className="text-nowrap font-body pl-0">
              <GradientHeading asChild size={"sm"}>
                {project.title}
              </GradientHeading>
              <div className="flex gap-2 py-2">
                {project.description?.tags?.map((t) => (
                  <Badge key={t} className="bg-white px-1 py-0.5">
                    <GradientHeading size={"xxxs"}>{t}</GradientHeading>
                  </Badge>
                ))}
              </div>
            </CardTitle>
            <div className="text-md text-wrap">
              <span>
                {project.description?.shortDescBody ??
                  "Page under construction."}
              </span>
            </div>
          </div>
          {project.slug?.current ? (
            <Link href={`/${project.slug?.current}`}>
              <MotionButton
                variant="minimal"
                size="icon"
                className="w-full bg-transparent bg-gradient-to-b from-transparent to-[--accent-stop]"
                // onClick={() => router.push()}
              >
                Open Project
              </MotionButton>
            </Link>
          ) : (
            <MotionButton
              disabled
              variant="minimal"
              size="icon"
              className="w-full bg-transparent bg-gradient-to-b from-transparent to-[--accent-stop] pointer-events-none cursor-not-allowed"
              // onClick={() => router.push()}
            >
              Open Project
            </MotionButton>
          )}
        </CardContent>

        <div
          className={cn(
            "aspect-auto overflow-hidden rounded-[inherit]",
            oritentation === "horizontal" ? "md:aspect-[1.624/1]" : ""
          )}
        >
          {project.thumbnails?.[0].asset && (
            <SanityImage
              src={project.thumbnails?.[0].asset}
              alt="project thumbnail"
            />
          )}
        </div>
      </motion.div>
    </CardStyled>
  );
}
