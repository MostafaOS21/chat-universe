"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { ChevronDown } from "lucide-react";

export default function ChangeMode() {
  const { setTheme, theme } = useTheme();

  return (
    <div className="flex flex-col gap-5 mt-5">
      <div className="flex justify-between">
        <p>Current Mode</p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={"secondary"}
              className="w-[150px] flex items-center justify-between"
            >
              Modes <ChevronDown size={20} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" defaultValue={theme}>
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
