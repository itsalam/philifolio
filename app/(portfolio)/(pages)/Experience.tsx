import { Container } from "@/src/components/Container";
import FancyDisplayFont from "@/src/components/FancyDisplayFont";
import { cn } from "@/src/lib/utils";
import { Experience } from "@/src/sanity/lib/sanity.queries";

type ProjectProps = {
  experiences: Experience[];
};

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
};

export default function ExperiencePage({ experiences }: ProjectProps) {
  return (
    <Container reveal className="relative flex h-full flex-col gap-12">
      <FancyDisplayFont>Experience</FancyDisplayFont>
      <div className="flex flex-col gap-8">
        {experiences.map((exp) => {
          return (
            <div
              className={cn(
                "[&:not(:first-child)]:border-t-[0.5px]",
                "flex flex-col gap-4 border-neutral-300", // sizing, layout, border
                "pt-4 px-4" // padding
              )}
            >
              <div className=" flex gap-1 lg:flex-row flex-col w-full justify-between font-body text-xl">
                <h4 className="text-neutral-300 text-base">{exp.role}</h4>
                <h3 className="text-white text-2xl">{exp.title}</h3>
                <h4 className="text-neutral-300 text-base">
                  {exp.startDate ? formatDate(exp.startDate) : ""}
                  {" - "}
                  {exp.isOngoing
                    ? "Ongoing"
                    : exp.endDate
                      ? formatDate(exp.endDate)
                      : ""}
                </h4>
              </div>
              <div
                className={cn(
                  "flex w-full", // sizing
                  "flex-col gap-4 font-body text-lg text-white" // layout, textStyles
                )}
              >
                {exp.points?.map((text: string, i: number) => <p>-{text}</p>)}
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
}
