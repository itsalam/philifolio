"use client";

import { Container } from "@/src/components/Container";
import { AnimatedTestimonials } from "@/src/components/Testimony";
import { AboutPageInfo } from "@/src/sanity/lib/sanity.queries";
import { FC } from "react";

const TestamonialSection: FC<{ about: AboutPageInfo }> = ({ about }) => {
  const testimonials = about?.testamonials?.map((t) => {
    return {
      quote: t.testamony!,
      name: t.personName!,
      designation: t.personRole!,
      src: t.avatar!,
    };
  });

  return (
    <Container className="page py-20 relative">
      {testimonials && <AnimatedTestimonials testimonials={testimonials} />}
    </Container>
  );
};

export default TestamonialSection;
