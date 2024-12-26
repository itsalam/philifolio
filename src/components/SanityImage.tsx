import { urlFor } from "@/src/sanity/lib/image";
import { getImageDimensions, SanityImageSource } from "@sanity/asset-utils";
import Image from "next/image";
import { ComponentProps, useMemo } from "react";

export default function SanityImage({
  src,
  alt,
  ...props
}: Omit<ComponentProps<typeof Image>, "src" | "alt"> & {
  src: string | SanityImageSource;
  alt?: string;
}) {
  const finalSrc = useMemo(() => urlFor(src), []);
  return (
    <Image
      src={finalSrc.url()}
      alt={alt ?? "Fallback Image"}
      width={getImageDimensions(finalSrc.url()).width}
      height={getImageDimensions(finalSrc.url()).height}
      placeholder="blur"
      blurDataURL={finalSrc.width(24).height(24).blur(10).url()}
      sizes="
    (max-width: 768px) 100vw,
    (max-width: 1200px) 50vw,
    40vw"
      {...props}
    />
  );
}
