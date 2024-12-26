"use client";

import { Carousel } from "@/src/components/Carousel";
import SanityImage from "@/src/components/SanityImage";
import { cn } from "@/src/lib/utils";
import { QueryProjectInfoResult } from "@/src/sanity/types";
import { PortableText, PortableTextComponentProps } from "@portabletext/react";
import { FC } from "react";

export default function InfoBody({
  info,
  ...props
}: {
  info: NonNullable<NonNullable<QueryProjectInfoResult>["projectInfo"]>[number];
}) {
  const CustomBlockQuote: FC<PortableTextComponentProps<object>> = ({
    isInline,
    renderNode,
    ...props
  }) => (
    <blockquote
      className={cn(
        "text-3xl"
      )}
      {...props}
    />
  );

  return (
    <div
      className={cn(
        "flex flex-col justify-between gap-12",
        info?.invertedIsland
          ? "rounded-3xl bg-black text-white p-10 my-12"
          : "border-t-[0.5px] border-neutral-300 py-4"
      )}
      {...props}
    >
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          {info.subtitle && (
            <h3 className="text-lg pb-4 text-neutral-500 font-semibold">
              {info.subtitle}
            </h3>
          )}
          <h2 className="font-medium text-5xl">{info.title}</h2>
        </div>
        <div
          className={cn(
            "md:w-1/2",
            "flex w-full min-w-[50%] flex-col items-start gap-4", // sizing, layout
            "!leading-tight !tracking-normal" // textStyles
          )}
        >
          {info.desciption && (
            <p className="py-2 text-base">{info.desciption}</p>
          )}
          {info.points?.map((point, i) => {
            return (
              <div
                key={`point-${info.title}-${i}`}
                className="flex flex-col gap-1 [&:not(:first-child)]:border-t-[0.5px] border-neutral-300 py-2"
              >
                <h5 className="text-neutral-500 uppercase text-[10px] tracking-normal font-bold">
                  {point.subHeader}
                </h5>
                <h4 className="text-amber-600 text-[20px]">{point.title}</h4>
                {point.description && (
                  <PortableText
                    value={point.description}
                    components={{
                      block: {
                        blockquote: CustomBlockQuote,
                      },
                    }}
                  />
                )}
              </div>
            );
          })}
          {info.metrics && (
            <div className="flex justify-between w-full">
              {info.metrics.map((metric, i) => (
                <div
                  className="max-w-[25%] w-fit h-fit aspect-video"
                  key={`metric-${metric.title}-${i}`}
                >
                  <span className=" text-amber-600 text-5xl font-medium">
                    {metric.value}
                    {metric.suffix}
                  </span>
                  <p
                    className="font-semibold text-l"
                    style={{
                      textWrap: "balance",
                    }}
                  >
                    {metric.title}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {info.screens && <Carousel elements={info.screens} />}
      {info.thumbnails?.map((thumbnail, i) =>
        thumbnail.asset ? (
          <SanityImage
            className="rounded-3xl"
            src={thumbnail.asset}
            key={`thumbnail-${i}-${thumbnail.title}`}
          />
        ) : (
          <></>
        ))}
    </div>
  );
}
