import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// generate avatar URL
export function getAvatarUrl(name: string) {
  return `${process.env.NEXT_PUBLIC_AVATARS_URL}`.concat(name);
}
