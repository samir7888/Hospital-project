import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export const NAME_REGEX = /^[A-Za-z]+$/;
export const NAME_WITH_SPACE_REGEX = /^[A-Za-z]+( [A-Za-z]+)*$/;
