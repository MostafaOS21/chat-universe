import { ReactNode } from "react";

export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <section
        className="relative h-screen grid place-items-center"
        style={{
          backgroundImage: "url('/assets/images/ooorganize.svg')",
          backgroundSize: "cover",
        }}
      >
        {children}
      </section>
    </>
  );
}
