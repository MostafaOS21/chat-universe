import Image from "next/image";
import { ModeToggle } from "./mode-toggle";

export function ThemeHeader() {
  return (
    <header className="border-b py-4 px-5 md:px-10 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Image
          src={"/assets/images/logo.png"}
          width={38}
          height={38}
          alt="Chat Universe Logo"
        />

        <h1 className="text-lg font-bold text-primary">Chat Universe</h1>
      </div>

      <ModeToggle />
    </header>
  );
}
