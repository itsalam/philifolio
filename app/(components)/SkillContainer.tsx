"use client";

import BadgeDisplay, {
  BadgePlacementFunc,
} from "@/src/components/BadgeContainer";
import { pseudoRandom } from "@/src/lib/utils";
import {
  ComponentProps,
  CSSProperties,
  useEffect,
  useRef,
  useState,
} from "react";

type BadgeDisplayProps = {
  tags: string[];
} & ComponentProps<"div">;

export default function SkillContainer({ tags, ...props }: BadgeDisplayProps) {
  const [badgePlacement, setBadgePlacement] = useState<BadgePlacementFunc>(
    () => () => ({ opacity: 0 }) // This matches the BadgePlacementFunc type
  );
  const displayRef = useRef<HTMLDivElement>(null);

  const badgePlacementFunc = (
      outerRec: DOMRect,
      innerRect: DOMRect,
      elemLength: number
    ) =>
    (index: number): CSSProperties => {
      const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
      const isLeftSide = index % 2;
      const numRows = ~~elemLength / 2;
      if (isMobile) {
        let x = (index + 1) / (tags.length + 2);
        let y = innerRect.bottom + (outerRec.bottom - innerRect.bottom) / 3;
        y /= outerRec.height;
        x += pseudoRandom(index * tags.length * 2) * 0.1;
        y += pseudoRandom(index * tags.length) * 0.2;
        const positionKey = "left";
        const positionValue = `${x * 100}%`;

        return {
          [positionKey]: positionValue,
          top: `${y * 100}%`,
          willChange: "transform",
        };
      } else {
        const midHeight = (outerRec.height + innerRect.height) / 2;
        let x = isLeftSide
          ? (innerRect.left - outerRec.left) / 2
          : (outerRec.width + innerRect.width) / 2;
        let y =
          (innerRect.top - outerRec.top) / 2 +
          (midHeight * (~~(index / 2) + 0.25)) / numRows;

        x += pseudoRandom(index + 1) * 5;
        y += pseudoRandom(index - 1) * 5;
        const positionKey = isLeftSide ? "left" : "right";
        const positionValue = isLeftSide
          ? `${(x * 66) / outerRec.width}%`
          : `${66 * (1 - x / outerRec.width)}%`;

        return {
          [positionKey]: positionValue,
          top: `${(y * 100) / outerRec.height}%`,
          willChange: "transform",
        };
      }
    };

  useEffect(() => {
    const handleResize = () => {
      const aboutQuote = document.querySelector("#aboutQuote");
      const displayElem = displayRef.current;
      if (aboutQuote && displayElem) {
        const displayRect = displayElem.getBoundingClientRect();
        const quoteRect = aboutQuote.getBoundingClientRect();
        setBadgePlacement(() =>
          badgePlacementFunc(displayRect, quoteRect, tags.length));
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial call to set placement

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [tags]);

  return (
    <BadgeDisplay
      tags={tags}
      badgePlacement={badgePlacement}
      {...props}
      ref={displayRef}
    />
  );
}
