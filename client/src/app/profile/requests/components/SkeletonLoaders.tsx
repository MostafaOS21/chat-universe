import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonLoaders = () => {
  return (
    <>
      <div className="w-full flex items-center gap-3 p-3">
        <Skeleton className="w-[40px] h-[40px]" />

        <div className="grid grid-cols-1 gap-1">
          <Skeleton className="w-[130px] h-[15px]" />
          <Skeleton className="w-[100px] h-[15px]" />
        </div>

        <div className="grid grid-cols-2 gap-1 ml-auto">
          <Skeleton className="w-[35px] h-[35px]" />
          <Skeleton className="w-[35px] h-[35px]" />
        </div>
      </div>
      <div className="w-full flex items-center gap-3 p-3">
        <Skeleton className="w-[40px] h-[40px]" />

        <div className="grid grid-cols-1 gap-1">
          <Skeleton className="w-[130px] h-[15px]" />
          <Skeleton className="w-[100px] h-[15px]" />
        </div>

        <div className="grid grid-cols-2 gap-1 ml-auto">
          <Skeleton className="w-[35px] h-[35px]" />
          <Skeleton className="w-[35px] h-[35px]" />
        </div>
      </div>
      <div className="w-full flex items-center gap-3 p-3">
        <Skeleton className="w-[40px] h-[40px]" />

        <div className="grid grid-cols-1 gap-1">
          <Skeleton className="w-[130px] h-[15px]" />
          <Skeleton className="w-[100px] h-[15px]" />
        </div>

        <div className="grid grid-cols-2 gap-1 ml-auto">
          <Skeleton className="w-[35px] h-[35px]" />
          <Skeleton className="w-[35px] h-[35px]" />
        </div>
      </div>
    </>
  );
};
