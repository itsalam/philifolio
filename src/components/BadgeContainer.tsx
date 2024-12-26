"use client";

import { Badge as BaseBadge } from "@/src/components/ui/badge";
import { cn, pseudoRandom } from "@/src/lib/utils";
import {
  Box,
  Layers2,
  LocateFixed,
  LucideProps,
  Microscope,
  Navigation,
  Tag,
} from "lucide-react";
import {
  frame,
  motion,
  MotionStyle,
  MotionValue,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import {
  ComponentProps,
  CSSProperties,
  FC,
  forwardRef,
  ForwardRefExoticComponent,
  ReactNode,
  Ref,
  RefAttributes,
  RefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const badgeMap: Record<
  string,
  ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >
> = {
  "Design Systems": Layers2,
  UX: Navigation,
  Research: Microscope,
  Prototyping: Box,
  Strategy: LocateFixed,
  Branding: Tag,
};

export type BadgePlacementFunc = (index: number) => Partial<CSSProperties>;

type BadgeDisplayProps = {
  tags: string[];
  badgePlacement: BadgePlacementFunc;
} & ComponentProps<typeof motion.div>;

const Badge = motion.create(BaseBadge);

const BadgeComponent: FC<
  ComponentProps<typeof Badge> & {
    index: number;
    mouseX: MotionValue;
    mouseY: MotionValue;
    divStyle: CSSProperties;
  }
> = ({ index, className, mouseX, mouseY, divStyle, variants, ...props }) => {
  const [inRange, setInRange] = useState(false);
  const positionRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  const relX = useTransform(mouseX, (val) => {
    const posX = positionRef.current?.getBoundingClientRect().x ?? 0;
    return val - posX;
  });

  const relY = useTransform(mouseY, (val) => {
    const posY = positionRef.current?.getBoundingClientRect().y ?? 0;
    return val - posY;
  });

  const distance = useTransform(() => {
    return Math.sqrt(Math.pow(relX.get(), 2) + Math.pow(relY.get(), 2));
  });

  const inDist = useTransform(distance, (dist) => Math.abs(dist) < 100);

  const xPos = useTransform(relX, [-101, -100, 100, 101], [0, -50, 50, 0]);
  const yPos = useTransform(relY, [-101, -100, 100, 101], [0, -50, 50, 0]);

  const finalX = useTransform(xPos, (x) => {
    if (!inDist.get()) return 0;
    return x;
  });

  inDist.on("change", (v) => v !== inRange && setInRange(v));

  const finalY = useTransform(yPos, (y) => {
    if (!inDist.get()) return 0;
    return y;
  });

  const springX = useSpring(finalX, { damping: 10, stiffness: 40 });
  const springY = useSpring(finalY, { damping: 10, stiffness: 40 });

  const rotate = useMemo(() => 15 - 30 * pseudoRandom(index), []);

  return (
    <motion.div
      className="absolute flex items-center justify-center"
      style={divStyle}
      ref={positionRef}
      variants={{
        inView: {
          scale: [0, 1],
        },
      }}
    >
      <motion.div
        ref={badgeRef}
        style={
          {
            x: springX,
            y: springY,
            "--accent-start": "rgb(247, 247, 247)",
            "--accent-stop": "rgb(247, 247, 247)",
            color: "hsl(var(--muted-foreground))",
            rotate,
          } as MotionStyle
        }
        drag
        whileDrag={"hoverTo"}
        onDragEnd={() =>
          setTimeout(() => {
            springX.set(0);
            springY.set(0);
          }, 500)
        }
        animate={inRange ? "hoverTo" : "animate"}
        // drag
        className={cn(
          "shadow-2xl from-[--accent-start] to-[--accent-stop] md:p-1 md:px-4",
          "md:text-lg",
          "absolute z-20 whitespace-nowrap", // basicStyles, layoutControl, textWrapping
          "rounded-full", // border
          "bg-transparent bg-gradient-to-b group-hover:bg-gradient-to-b", // background
          "group-active:bg-gradient-to-b",
          "p-0.5 px-2", // padding
          "text-center text-sm font-normal text-muted-foreground", // textStyles
          className
        )}
        transition={{ duration: 0.3 }}
        variants={{
          ...variants,
          animate: {
            x: [null, 0, 0],
            y: [null, 0, -15, 0],
            transition: {
              duration: 5,
              repeat: Infinity,
              repeatType: "loop",
              delay: 0.66 * Math.random() * index,
            },
          },
          hoverTo: {
            x: springX.get(),
            y: springY.get(),

            "--accent-start": "rgb(255, 249, 232)",
            "--accent-stop": "var(--amber-200)",
            scale: [null, 1.2],
            rotate: [null, 0],
            transition: {
              duration: 0.3,
            },
          },
          inView: {
            scale: [0, 1],
          },
        }}
        {...props}
      />
    </motion.div>
  );
};

const BadgeDisplay = forwardRef<typeof motion.div, BadgeDisplayProps>((
  { tags, className, badgePlacement, children, ...props },
  ref
) => {
  const mouseX = useMotionValue(Infinity);
  const mouseY = useMotionValue(Infinity);

  const handleMouseMove = (e: React.MouseEvent) => {
    frame.read(() => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    });
  };

  const inView = useInView(ref as RefObject<Element | null>, {
    margin: "-100px 0px",
    amount: "some",
    once: true,
  });

  return (
    <motion.div
      onMouseMove={(e) => handleMouseMove(e)}
      ref={ref as Ref<HTMLDivElement>}
      className={cn(
        "absolute top-0 left-0 h-full w-full",
        className
      )}
      animate={inView ? "inView" : undefined}
      variants={{ inView: {} }}
      {...props}
    >
      {children as ReactNode}
      {tags.map((tag, i) => {
        const Icon = badgeMap[tag];
        return (
          <BadgeComponent
            index={i}
            mouseX={mouseX}
            mouseY={mouseY}
            // dragConstraints={ref}
            divStyle={badgePlacement(i)}
            key={`${tag}-${i}`}
            className="flex gap-1 items-center"
          >
            {tag}
            {Icon ? <Icon className="w-4 h-4 md:w-6 md:h-6 " /> : null}
          </BadgeComponent>
        );
      })}
    </motion.div>
  );
});

BadgeDisplay.displayName = "BadgeDisplay";

export default BadgeDisplay;
