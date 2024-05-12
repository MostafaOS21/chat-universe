import React from "react";
import { SkeletonLoaders } from "./SkeletonLoaders";

export default function LoadingDummySkeleton() {
  return Array(5).map((_, index) => <SkeletonLoaders key={index} />);
}
