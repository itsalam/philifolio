"use client";

import HeroBadge from "@/app/(components)/HeroBadge";
import { GradientHeading } from "@/src/components/GradientHeading";
import { HomePageInfo } from "@/src/sanity/lib/sanity.queries";
import { motion } from "motion/react";
import { ComponentProps, FC } from "react";

const MotionHeading = motion.create(GradientHeading);

const HeroText: FC<
  ComponentProps<typeof MotionHeading> & { isAccent?: boolean }
> = ({ isAccent = false, ...props }) => {
  return (
    <MotionHeading
      variants={{
        reveal: {
          y: [4, 0],
          filter: ["blur(4px)", "blur(0px)"],
          opacity: [0, 1],
        },
      }}
      {...props}
    />
  );
};

const HeroCTA: FC<{ hero: HomePageInfo }> = ({ hero }) => {
  return (
    <motion.div
      animate={"reveal"}
      transition={{
        staggerChildren: 0.1,
      }}
      className="relative font-display text-pretty text-center flex flex-col items-center gap-2 mt-[5dvh] antialiased"
    >
      <HeroText className="w-fit" size="xxl" weight="base">
        {"I'm"}
        <HeroText
          isAccent
          asChild
          className="italic"
          size="xxl"
          colour="highlight"
          weight="base"
        >
          {" Phillip"}
        </HeroText>
        <HeroBadge
          disableAnim
          keyImageData={hero?.keyImage?.find(({ keyword }) => {
            return keyword?.includes("Philip") ?? undefined;
          })}
        />
        {","}
      </HeroText>
      <HeroText className="w-fit" size="xxl" weight="base">
        {"\n a Product"}
        <HeroBadge
          keyImageData={hero?.keyImage?.find(({ keyword }) => {
            return keyword?.includes("Designer") ?? undefined;
          })}
        />
        <HeroText
          asChild
          className="italic"
          size="xxl"
          colour="highlight"
          weight="base"
          isAccent
        >
          {" Designer"}
        </HeroText>
      </HeroText>
      <HeroText className="w-fit" size="xxl" weight="base">
        based in Vancouver
        <HeroBadge
          keyImageData={hero?.keyImage?.find(({ keyword }) => {
            return keyword?.includes("Vancouver") ?? undefined;
          })}
        />
      </HeroText>

      <HeroText
        size="xxs"
        colour="none"
        weight="base"
        className="text-md font-body text-balance max-w-md mt-4"
        asChild
      >
        Backed with 3+ years of experience working on innovative and mindful
        products together with startups and known brands.
      </HeroText>
    </motion.div>
  );
};

export default HeroCTA;
