import HeroCTA from "@/app/(components)/HeroCTA";
import ScrollDownIndicator from "@/app/(components)/ScrollDownIndicator";
import { Container } from "@/src/components/Container";
import { HomePageInfo } from "@/src/sanity/lib/sanity.queries";
import { FC } from "react";

const Hero: FC<{ hero: HomePageInfo }> = ({ hero }) => {
  hero?.keyImage;
  return (
    <Container className="page h-[100dvh] py-20 relative">
      <HeroCTA hero={hero} />
      <ScrollDownIndicator />
    </Container>
  );
};

export default Hero;
