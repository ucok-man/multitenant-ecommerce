import { cn } from "@/lib/utils";
import Link from "next/link";
import NavbarDesktop from "./navbar-desktop";
import NavbarMobile from "./navbar-mobile";

export default function Navbar() {
  return (
    <nav className="h-20 flex border-b justify-between font-medium bg-white">
      <Link href={"/"} className="pl-4 flex items-center">
        <span className={cn("text-4xl sm:text-4xl font-semibold font-poppins")}>
          Zangetsu
        </span>
      </Link>

      <NavbarDesktop />
      <NavbarMobile />
    </nav>
  );
}
