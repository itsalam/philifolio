import { Container } from "@/src/components/Container";
import FancyDisplayFont from "@/src/components/FancyDisplayFont";
import Ray from "@/src/components/Layout/Ray";
import { SkilLSectionInfo } from "@/src/sanity/lib/sanity.queries";
import RevealText from "../../(components)/RevealText";
import SkillContainer from "../../(components)/SkillContainer";

type ProjectProps = {
  about: SkilLSectionInfo;
};

export default function About({ about }: ProjectProps) {
  return (
    <div className="relative w-full h-[100dvh] bg-gradient-radial via-80 antialiased via-transparent from-neutral-300 to-transparent">
      <Container reveal className="relative h-full max-w-none">
        {about?.skills && (
          <SkillContainer
            className="absolute top-0 left-0 w-full h-full z-10 overflow-visible font-body flex md:items-center"
            tags={about.skills}
          >
            <div className="flex flex-col gap-8 font-display items-center justify-center md:max-w-lg 2xl:max-w-4xl mx-auto">
              <FancyDisplayFont>Hello!</FancyDisplayFont>
              {about?.aboutQuote && <RevealText text={about.aboutQuote} />}
            </div>
          </SkillContainer>
        )}

        <div
          className="absolute top-0 left-0 w-full h-full brightness-150 contrast-200 z-0 overflow-hidden"
          style={{
            mask: "radial-gradient(rgba(0, 0, 0) 20%, rgb(0, 0, 0) 40%, rgb(0, 0, 0) 50%, rgba(0, 0, 0, 0) 75%)",
          }}
        >
          <Ray style={{ left: "30dvw" }} />
        </div>
      </Container>
    </div>
  );
}
