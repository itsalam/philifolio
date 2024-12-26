import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const isMobile = () => {
  if (typeof window === "undefined") return false;
  const width = window.innerWidth;
  return width <= 1024;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function pseudoRandom(index: number) {
  const seed = Math.sin(index) * 10000; // Generate a consistent seed based on the index
  return seed - Math.floor(seed); // Normalize the value to a range of 0 to 1
}
