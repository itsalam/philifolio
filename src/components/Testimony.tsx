"use client";

import { SanityImageSource } from "@sanity/asset-utils";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { cn } from "../lib/utils";
import { CardStyled } from "./Card";
import SanityImage from "./SanityImage";
import { TextureButton } from "./TextureButton";

export type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: SanityImageSource | string;
};
export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
}) => {
  const [isClient, setIsClient] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  const randomRotateY = () => {
    return isClient ? Math.floor(Math.random() * 21) - 10 : 0;
  };

  const Image = useCallback(
    ({ testimonial }: { testimonial: Testimonial }) => (
      <SanityImage
        src={testimonial.src}
        alt={testimonial.name}
        width={500}
        height={500}
        draggable={false}
        className="w-full rounded-3xl object-cover object-center aspect-square"
      />
    ),
    []
  );

  return (
    <div
      className={cn(
        "md:max-w-4xl md:mx-auto",
        "relative h-96 w-full max-w-sm", // basicStyles, sizing
        "font-sans antialiased" // textStyles
      )}
    >
      <AnimatePresence>
        {testimonials.map((testimonial, index) => (
          <CardStyled
            className={cn(
              "absolute w-full bg-white"
            )}
            key={index}
            // initial={{
            //   opacity: 0,
            //   scale: 0.9,
            //   z: -100,
            //   x: `${30 * index}vw`,
            //   rotate: randomRotateY(),
            // }}
            animate={{
              opacity: 1,
              scale: isActive(index) ? [null, 1] : 0.6,
              z: isActive(index) ? [null, 0] : -100,
              rotate: isActive(index) ? [null, 0] : randomRotateY(),
              zIndex: isActive(index) ? 999 : testimonials.length + 2 - index,
              x: isActive(index) ? [null, 0] : 300 * (index - active),
              filter: isActive(index)
                ? ["blur(2px)", "blur(0px)"]
                : "blur(2px)",
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              z: 100,
              rotate: randomRotateY(),
            }}
            transition={{
              duration: 0.4,
              ease: "easeInOut",
            }}
          >
            <div className="relative grid grid-cols-1 md:grid-cols-3 md:gap-6 rounded-[inherit] p-2">
              <div className="relative w-full rounded-[inherit] flex">
                <SanityImage
                  src={testimonial.src}
                  alt={testimonial.name}
                  width={500}
                  height={500}
                  draggable={false}
                  className="shrink-1 md:w-auto w-1/3 rounded-[inherit] object-cover object-center aspect-square"
                />
                <div className="block md:hidden flex-1 px-4 p-2">
                  <h3 className="text-3xl font-bold dark:text-white text-black">
                    {testimonials[index].name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-neutral-500">
                    {testimonials[index].designation}
                  </p>
                </div>
              </div>
              {/* {isActive(index) && ( */}
              <div className="realtive flex md:col-span-2 justify-between flex-col m-2 md:my-4">
                <motion.div
                  key={isActive(index) ? "active" : index}
                  initial="initial"
                  animate="animate"
                  variants={{
                    initial: {
                      opacity: 0.5,
                    },
                    animate: {
                      opacity: 1,
                    },
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                  }}
                >
                  <h3 className="hidden md:block text-2xl font-bold dark:text-white text-black">
                    {testimonials[index].name}
                  </h3>
                  <p className="hidden md:block text-sm text-gray-500 dark:text-neutral-500">
                    {testimonials[index].designation}
                  </p>
                  <motion.p className="text-md text-gray-500 mt-4 dark:text-neutral-300">
                    {testimonials[index].quote.split(" ").map((word, i) => (
                      <motion.span
                        key={i}
                        {...(isActive(index)
                          ? {
                              initial: "initial",
                              animate: "animate",
                            }
                          : { initial: "animate" })}
                        variants={{
                          initial: {
                            filter: "blur(10px)",
                            opacity: 0.5,
                          },
                          animate: {
                            filter: "blur(0px)",
                            opacity: 1,
                          },
                        }}
                        transition={{
                          duration: 0.2,
                          ease: "easeInOut",
                          delay: 0.02 * i,
                        }}
                        className="inline-block"
                      >
                        {word}&nbsp;
                      </motion.span>
                    ))}
                  </motion.p>
                </motion.div>
              </div>
              {/* )} */}
            </div>
          </CardStyled>
        ))}
      </AnimatePresence>
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-4 pt-12 md:pt-0 z-50">
        <TextureButton
          variant="minimal"
          size="icon"
          onClick={handlePrev}
          className="h-8 w-8 bg-gray-100 group/button"
        >
          <ArrowLeft className="h-5 w-5 text-black dark:text-neutral-400 group-hover/button:rotate-12 transition-transform duration-300" />
        </TextureButton>
        <TextureButton
          variant="minimal"
          size="icon"
          onClick={handleNext}
          className="h-8 w-8 bg-gray-100 group/button"
        >
          <ArrowRight className="h-5 w-5 text-black dark:text-neutral-400 group-hover/button:-rotate-12 transition-transform duration-300" />
        </TextureButton>
      </div>
    </div>
  );
};
