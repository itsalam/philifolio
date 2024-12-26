"use client";

import { Container } from "@/src/components/Container";
import { ThumbnailProject } from "@/src/sanity/lib/sanity.queries";
import ProjectCard from "../../(components)/ProjectCard";

type ProjectProps = {
  projects: ThumbnailProject[];
};

export default function Projects({ projects }: ProjectProps) {
  return (
    <Container id="work">
      <div className="flex flex-col gap-12 pt-20">
        {projects.map((project, i) => {
          return <ProjectCard project={project} key={i} />;
        })}
      </div>
    </Container>
  );
}
