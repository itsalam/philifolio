import {
  getExperiences,
  getHomePageInfo,
  getProjectThumbnailInfo,
} from "@/src/sanity/lib/sanity.queries";
import TestamonialSection from "../(components)/AboutCTA";
import About from "./(pages)/About";
import ExperiencePage from "./(pages)/Experience";
import Hero from "./(pages)/Hero";
import Projects from "./(pages)/Projects";

export default async function Home() {
  const [hero, projects, experiences] = await Promise.all([
    getHomePageInfo(),
    getProjectThumbnailInfo(),
    getExperiences(),
  ]);
  return (
    <>
      <Hero hero={hero} />
      <Projects projects={projects} />
      <About about={hero} />
      <ExperiencePage experiences={experiences} />
      <TestamonialSection about={hero} />
    </>
  );
}
