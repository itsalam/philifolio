import { cn } from "@/src/lib/utils";
import { motion } from "framer-motion";
import { ArrowUpRight as ArrowUpRightBase } from "lucide-react";
import {
  ComponentPropsWithoutRef,
  ComponentRef,
  forwardRef,
  useState,
} from "react";

const ArrowUpRight = motion.create(ArrowUpRightBase);

const Link = forwardRef<
  ComponentRef<typeof motion.div>,
  ComponentPropsWithoutRef<typeof motion.div> & {
    href?: string;
    children: React.ReactNode;
  }
>((props, ref) => {
  const { href, children, onHoverStart, className, ...rest } = props;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial="initial"
      onHoverStart={(e, i) => {
        setIsHovered(true);
        onHoverStart?.(e, i);
      }}
      onHoverEnd={() => setIsHovered(false)}
      className={cn(
        "group flex flex-col gap-y-1",
        className
      )}
      {...rest}
    >
      <a
        href={href}
        className="relative w-fit overflow-hidden"
        target="_blank"
        rel="noreferrer"
      >
        <p
          className={cn(
            "inline-flex", // sizing
            "items-center overflow-hidden", // layout, overflowControl
            "group-hover:text-amber-400", // textStyles
            "transition-colors duration-300" // transitionsAnimations
          )}
        >
          {children}
          <span className="overflow-hidden">
            <ArrowUpRight
              size={16}
              animate={isHovered ? "hover" : "initial"}
              variants={{
                hover: {
                  x: [null, "100%", "-100%", "0%"],
                  y: [null, "-100%", "100%", "0%"],
                  transition: {
                    times: [0, 0.5, 0.5, 1],
                    duration: 0.33,
                  },
                },
                initial: {
                  x: "0%",
                  y: "0%",
                },
              }}
            />
          </span>
        </p>
      </a>
    </motion.div>
  );
});

Link.displayName = "Link";

export default Link;
