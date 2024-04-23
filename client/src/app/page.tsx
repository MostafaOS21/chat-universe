import { Button } from "@/components/ui/button";
import { MainHomeButton } from "@/components/ui/main-home-button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import Image from "next/image";
import Link from "next/link";

function Header() {
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

function Footer() {
  return (
    <footer className="border-t py-4 px-5 md:px-10 flex items-center justify-center">
      <p className="text-sm text-gray-500">
        {/* TODO: Add portfolio */}
        Made with ❤️ by Mostafa Osama {new Date().getFullYear()}
      </p>
    </footer>
  );
}

// TODO: More UI work needed here
export default async function Home() {
  return (
    <>
      <Header />

      <main
        className={`flex flex-col items-center justify-center h-[calc(100vh-77.8px)] relative`}
      >
        <section className="flex flex-col items-center gap-10">
          <div>
            <h1 className="gradient-background">Start Your Chat Now!</h1>
          </div>

          <MainHomeButton />
        </section>

        <div className="absolute animate-[rotate_55s_infinite_linear] -z-[1]">
          <Image
            src={"/assets/images/ccchaos.svg"}
            width={500}
            height={500}
            alt="SVG Chaos"
          />
        </div>
      </main>

      <Footer />
    </>
  );
}
