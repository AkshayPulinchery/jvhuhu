import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Retro UI specific styles that are reused
export const brutalBorder = "border-[3px] border-black";
export const brutalShadow = "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] active:translate-y-[4px] active:translate-x-[4px] transition-all";
export const brutalShadowNoHover = "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]";
