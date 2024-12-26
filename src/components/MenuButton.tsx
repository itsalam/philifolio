"use client";

import { cn } from "@/src/lib/utils";
import { Linkedin, MenuIcon, XIcon } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "next-transition-router";
import {
  ComponentProps,
  CSSProperties,
  FC,
  forwardRef,
  ReactNode,
  useCallback,
  useRef,
  useState,
} from "react";
import { useOutsideClick } from "../lib/hooks";

const CONTAINER_SIZE = 150;

interface MenuButtonProps {
  children: React.ReactNode;
}

const MotionLink = motion.create(Link);

const MenuButton: React.FC<MenuButtonProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => setIsExpanded(!isExpanded);

  useOutsideClick(containerRef, () => setIsExpanded(false));

  const MenuLink: FC<ComponentProps<typeof MotionLink>> = useCallback(({
    className,
    children,
    href,
    ...props
  }) => {
    return (
      <MotionLink
        {...props}
        variants={{
          reveal: {
            opacity: [0, 1],
            x: [10, 0],
            filter: ["blur(4px)", "blur(0px)"],
          },
        }}
        whileHover={{
          opacity: 0.75,
        }}
        className={cn(
          "text-2xl",
          className
        )}
        href={href}
      >
        {children}
      </MotionLink>
    );
  }, []);

  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    const path = href.split("/")[0].length ? href.split("/")[0].length : "/";
    const hash = href.split("/")[1];
    if (window.location.pathname !== path) {
      return;
    }
    e.preventDefault(); // Prevent default navigation behavior
    const target = document.querySelector(hash);
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    // Optionally update the URL with the hash
    window.history.pushState(null, "", hash);
  };

  return (
    <motion.div
      className="relative"
      style={
        {
          ["--border-radius"]: "24px",
        } as CSSProperties
      }
    >
      <motion.div className="absolute z-20 right-[12px] top-[12px]">
        {isExpanded ? (
          <motion.div
            className="p-[10px] group bg-neutral-800/50 dark:bg-black/50 border border-cyan-100/30 hover:border-neutral-200 text-orange-50 rounded-full shadow-2xl transition-colors duration-300 "
            onClick={() => toggleExpand()}
            layoutId="expand-toggle"
            initial={false}
            animate={{
              rotate: -360,
            }}
          >
            <XIcon
              className={cn(
                "h-7 w-7", // sizing
                "text-cyan-100/30 dark:text-neutral-400/80", // textStyles
                "group-hover:text-neutral-500",
                "transition-colors duration-200" // transitionsAnimations
              )}
            />
          </motion.div>
        ) : (
          <motion.div
            className={cn(
              "group border shadow-2xl",
              "border-cyan-100/10 bg-white p-[10px]", // border, background, padding
              "text-cyan-50 transition-colors duration-200" // textStyles, transitionsAnimations
            )}
            style={{ borderRadius: 24 }}
            onClick={toggleExpand}
            layoutId="expand-toggle"
            initial={{ rotate: 180 }}
            animate={{
              rotate: -180,
            }}
          >
            <MenuIcon className="h-7 w-7 text-black dark:text-neutral-900" />
          </motion.div>
        )}
      </motion.div>
      <motion.div
        className={cn(
          "border shadow-sm from-neutral-900 to-black",
          "relative", // basicStyles
          "rounded-[--border-radius] border-black/10 dark:border-yellow-400/20", // border
          "bg-gradient-to-b", // background
          isExpanded
            ? "bg-gradient-to-b dark:from-stone-900 dark:to-neutral-900/80"
            : "dark:from-neutral-900 dark:to-stone-950 bg-gradient-to-b"
        )}
        animate={{
          top: isExpanded ? 80 : 0,
        }}
      >
        <div className="rounded-[inherit] border    border-neutral-950/20   flex items-center justify-center">
          <div className="rounded-[calc(var(--border-radius)_-_1px)] border  border-black/10 ">
            <div className="rounded-[calc(var(--border-radius)_-_2px)] border dark:border-stone-800 border-white/50 ">
              <div className="rounded-[calc(var(--border-radius)_-_3px)] border  border-neutral-950/20   flex items-center justify-center ">
                <MenuContainer
                  isExpanded={isExpanded}
                  toggleExpand={toggleExpand}
                  ref={containerRef}
                >
                  {isExpanded ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={"reveal"}
                      variants={{
                        reveal: {
                          opacity: 1,
                          transition: {
                            staggerChildren: 0.15,
                            delayChildren: 0.3,
                          },
                        },
                      }}
                      className="flex flex-col gap-2 p-4 w-full"
                    >
                      {" "}
                      <MenuLink
                        href={"/#home"}
                        onClick={(e) => handleScroll(e, "/#home")}
                      >
                        Home
                      </MenuLink>
                      <MenuLink
                        href={"/#work"}
                        onClick={(e) => handleScroll(e, "/#work")}
                      >
                        Work
                      </MenuLink>
                      <MenuLink href="mailto:philippn_76@hotmail.com">
                        Contact
                      </MenuLink>
                      <MenuLink
                        className="border rounded-2xl w-min border-white p-2 mt-2"
                        href="https://www.linkedin.com/in/phillipdigital/"
                      >
                        <Linkedin />
                      </MenuLink>
                    </motion.div>
                  ) : null}
                </MenuContainer>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// A container that wraps content and handles animations
interface MenuButtonContainerProps {
  isExpanded: boolean;
  toggleExpand: () => void;
  children: ReactNode;
}

const MenuContainer = motion.create(
  forwardRef<HTMLDivElement, MenuButtonContainerProps>((
    { isExpanded, toggleExpand, children, ...props },
    ref
  ) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          "border shadow-lg",
          "relative z-10 flex", // basicStyles, layoutControl, sizing
          "cursor-pointer flex-col items-center space-y-1", // interactions, layout
          "rounded-[inherit] border-white/10 text-white", // border, textStyles
          !isExpanded
            ? "bg-gradient-to-b from-neutral-900 to-stone-900 dark:from-stone-700 dark:to-neutral-800/80"
            : ""
        )}
        layoutRoot
        layout
        initial={{ borderRadius: 21, width: "4rem", height: "4rem" }}
        variants={{
          reveal: {
            borderRadius: 20,
            width: CONTAINER_SIZE,
            height: CONTAINER_SIZE + 50,

            transition: {
              type: "spring",
              damping: 25,
              stiffness: 400,
              when: "beforeChildren",
              delay: 0.3,
            },
          },
          close: {
            borderRadius: 21,
            width: "4rem",
            height: "4rem",
          },
        }}
        animate={isExpanded ? "reveal" : "close"}
        {...props}
      >
        {children}
      </motion.div>
    );
  })
);

export { MenuButton, MenuContainer };
