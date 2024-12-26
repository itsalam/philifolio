import {
  getProjectsPageInfo,
  getProjectThumbnailInfo,
} from "@/src/sanity/lib/sanity.queries";
import { redirect } from "next/navigation";
import ProjectCard from "../../(components)/ProjectCard";
import Header from "./(project-components)/Header";
import InfoBody from "./(project-components)/InfoBody";

export default async function Slug({
  params,
}: {
  params: Promise<{ projects: string[] }>;
}) {
  const projectStr = (await params).projects.join("/");
  console.log(projectStr);
  const projectData = getProjectsPageInfo(projectStr);
  const otherProjectThumbnailsData = getProjectThumbnailInfo(projectStr);

  const [project, otherProjectThumbnails] = await Promise.all([
    projectData,
    otherProjectThumbnailsData,
  ]);

  if (!project) {
    redirect("/");
  }

  return (
    <>
      <Header project={project} />
      {project.projectInfo?.map((info, i) => {
        return <InfoBody info={info} key={i} />;
      })}
      <div>
        {otherProjectThumbnails.length !== 0 &&
          otherProjectThumbnails
            .sort(() => 0.5 - Math.random())
            .slice(0, 2)
            .map((thumbnail, i) => (
              <ProjectCard
                key={`card-${i}`}
                project={thumbnail}
                oritentation="vertical"
              />
            ))}
      </div>
    </>
  );
}
