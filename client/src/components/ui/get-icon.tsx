import Image, { ImageProps } from "next/image";
import { AllHTMLAttributes } from "react";

export function ImageIcon({
  src,
  size,
  className,
}: {
  src: string;
  size?: number;
  className?: string;
}) {
  return (
    <Image
      src={src}
      width={size || 30}
      height={size || 30}
      alt="icon"
      className={className}
    />
  );
}
