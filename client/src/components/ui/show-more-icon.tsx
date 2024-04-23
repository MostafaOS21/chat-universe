import { Button } from "./button";

export const ShowMoreIcon = () => {
  const style = `w-[10px] h-[10px] scale-[0.32] rounded-full bg-white`;

  return (
    <Button
      variant={"ghost"}
      className="flex items-center !p-0 w-[38px] h-[38px] rounded-full"
      asChild
    >
      <div>
        <span className={style}></span>
        <span className={style}></span>
        <span className={style}></span>
      </div>
    </Button>
  );
};
