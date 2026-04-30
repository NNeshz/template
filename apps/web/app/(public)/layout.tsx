import { ReactNode } from "react";

// Aquí se importa Navbar y Footer

export default function PublicLayout({ children }: { children: ReactNode }) {
  return <main>{children}</main>;
}
