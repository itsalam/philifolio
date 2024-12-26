"use client";

import { SanityImageSource } from "@sanity/asset-utils";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { FC, useCallback, useEffect, useState } from "react";
import { cn } from "../lib/utils";
import SanityImage from "./SanityImage";
import { TextureButton } from "./TextureButton";
import {
  PopoverButton,
  PopoverContent,
  PopoverRoot,
  PopoverWindow,
} from "./ui/popout";

export type Element = {
  caption?: string;
  subCaption?: string;
  asset?: SanityImageSource | null;
};

export const Carousel = ({
  elements: elements,
  autoplay = false,
}: {
  elements: Element[];
  autoplay?: boolean;
}) => {
  const [isClient, setIsClient] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % elements.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + elements.length) % elements.length);
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

  const ElementContent: FC<{
    element: Element;
    index: number;
    focused?: boolean;
  }> = useCallback(({ element, index, focused }) => {
    return (
      <>
        {element.asset && (
          <SanityImage
            src={element.asset}
            alt={element.caption}
            draggable={false}
            priority
            className={cn(
              "shrink-1",
              "aspect-auto h-full w-max shrink-0", // sizing, flexboxGrid
              "rounded-[inherit] object-cover object-center", // border, object
              focused
                ? "h-max md:h-auto w-[50vw] md:w-max md:mx-[unset] mx-auto md:max-h-full"
                : "h-full w-max"
            )}
          />
        )}
        {/* {isActive(index) && ( */}
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
          className=" w-full flex md:col-span-2 flex-col m-2 md:my-4"
        >
          <h3
            className={cn(
              "md:pr-8 text-2xl font-bold dark:text-white text-black",
              focused ? "md:text-4xl pb-2" : ""
            )}
          >
            {element.caption}
          </h3>
          <p
            className={cn(
              "whitespace-pre-line", // textWrapping
              "text-sm leading-relaxed text-gray-500 dark:text-neutral-500", // textStyles
              focused
                ? "md:text-lg pt-2 border-t-[0.5px] border-neutral-300 "
                : ""
            )}
          >
            {element.subCaption}
          </p>
        </motion.div>
        <PopoverButton className="absolute top-2 right-2 w-auto h-auto bg-neutral-200 hover:scale-110" />
      </>
    );
  }, []);

  return (
    <div
      className={cn(
        "relative h-[28rem] w-full font-sans antialiased"
      )}
    >
      {elements.map((element, index) => (
        <PopoverRoot
          className={cn(
            "md:right-auto",
            "absolute h-full max-w-full border-transparent", // basicStyles, sizing, border
            "bg-transparent", // background
            !isActive(index) ? "cursor-pointer z-0" : "z-50 right-0"
          )}
          onClick={() => !isActive(index) && setActive(index)}
          key={index}
          animate={{
            opacity: 1,
            scale: isActive(index) ? [null, 1] : 0.6,
            x: isActive(index) ? [null, 0] : 440 * (index - active),
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
          <PopoverWindow className="max-w-full relative flex flex-row-reverse md:flex-row md:gap-2 rounded-2xl p-2 items-stretch h-full aspect-[5/4] ">
            <ElementContent element={element} index={index} />
          </PopoverWindow>
          <PopoverContent
            className="min-w-full md:max-w-[66vw] xl:max-w-[50vw] h-auto md:max-h-[90vh]"
            childClassName="p-4 flex md:gap-2 items-stretch h-full md:aspect-[5/4] md:flex-row flex-col"
          >
            <ElementContent element={element} index={index} focused />
          </PopoverContent>
        </PopoverRoot>
      ))}
      <div className="absolute -bottom-12 right-[4.25rem] md:left-14 md:right-auto flex gap-4 z-40">
        <TextureButton
          variant="minimal"
          size="icon"
          onClick={handlePrev}
          className="h-10 w-10 bg-gray-100 group/button"
        >
          <ArrowLeft className="h-5 w-5 text-black dark:text-neutral-400 group-hover/button:rotate-12 transition-transform duration-300" />
        </TextureButton>
        <TextureButton
          variant="minimal"
          size="icon"
          onClick={handleNext}
          className="h-10 w-10 bg-gray-100 group/button"
        >
          <ArrowRight className="h-5 w-5 text-black dark:text-neutral-400 group-hover/button:-rotate-12 transition-transform duration-300" />
        </TextureButton>
      </div>

      <div className="absolute -top-2 right-[6.0rem] md:left-[5.25rem] md:right-auto flex gap-1 z-40">
        {elements.map((e, i) => (
          <div
            key={i}
            className={cn(
              "aspect-square w-[6px]", // sizing
              "rounded-full bg-amber-600", // border, background
              "transition-opacity", // transitionsAnimations
              i <= active ? "opacity-100" : "opacity-25"
            )}
          />
        ))}
      </div>
    </div>
  );
};
