"use client";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { cn } from "@/src/lib/utils";
import { urlFor } from "@/src/sanity/lib/image";
import { HomePageInfo } from "@/src/sanity/lib/sanity.queries";
import { motion } from "motion/react";
import { ComponentProps, FC } from "react";

type ImageBadgeProps = {
  disableAnim?: boolean;
  keyImageData?: NonNullable<NonNullable<HomePageInfo>["keyImage"]>[number];
} & Omit<ComponentProps<typeof Avatar>, "src">;

const HeroBadge: FC<ImageBadgeProps> = ({
  className,
  disableAnim,
  keyImageData,
  ...props
}) => {
  const isAReel =
    !disableAnim &&
    keyImageData?.images &&
    (keyImageData?.images?.length ?? 0) > 1;
  const images = isAReel
    ? [...(keyImageData?.images ?? []), keyImageData?.images?.[0]]
    : keyImageData?.images;

  return (
    <Avatar
      {...props}
      className={cn(
        "border-4 shadow-2xl",
        "mx-2 inline-flex h-16 w-24 border-black", // margin, sizing, border
        "drop-shadow-2xl", // filters
        className
      )}
    >
      <motion.div
        {...(images && isAReel
          ? {
              animate: {
                y: images?.map((_, i) => i * -88 - 16),
                transition: {
                  times: images?.map((_, i) => i / images.length),
                  duration: images?.length * 1.5,
                  ease: "easeInOut",
                  repeatType: "loop",
                  repeat: Infinity,
                },
              },
            }
          : {})}
        style={{
          y: -16,
          //   translateY: translateY,
        }}
        className="flex flex-col w-full -translate-y-4"
      >
        {keyImageData
          ? images?.map((img, idx) => {
              if (!img) return null;
              return (
                <AvatarImage
                  key={img._key + `-${idx}`}
                  className="h-24 w-24"
                  src={urlFor(img).url()}
                />
              );
            })
          : null}
        {/* <AvatarImage src={src} alt="@shadcn" /> */}
        <AvatarFallback>CN</AvatarFallback>
      </motion.div>
    </Avatar>
  );
};

export default HeroBadge;
