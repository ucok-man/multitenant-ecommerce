"use client";

import { Button } from "@/components/ui/button";
import { STORE_NAVBAR_ITEMS } from "@/lib/constant/store-navbar-items";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavbarDesktop() {
  const pathname = usePathname();

  return (
    <>
      <div className="hidden w-full xl:flex xl:justify-center xl:items-center gap-4">
        {STORE_NAVBAR_ITEMS.map((item, idx) => {
          const isActive = (() => {
            if (item.href === "/") {
              return item.href === pathname;
            } else {
              return pathname.startsWith(item.href);
            }
          })();

          return (
            <Button
              asChild
              key={idx}
              variant={"outline"}
              className={cn(
                "bg-transparent hover:bg-transparent rounded-full hover:border-primary border-transparent px-3.5 text-lg",
                isActive &&
                  "bg-black text-white hover:bg-black hover:text-white"
              )}
            >
              <Link href={item.href}>{item.children}</Link>
            </Button>
          );
        })}
      </div>

      <div className="hidden xl:flex">
        <Button
          asChild
          variant={"secondary"}
          className="border-l border-y-0 border-r-0 px-12 h-full rounded-none bg-white hover:bg-pink-400 transition-colors text-lg"
        >
          <Link href={"/sign-in"}>Log in</Link>
        </Button>
        <Button
          asChild
          variant={"secondary"}
          className="border-l border-y-0 border-r-0 px-12 h-full rounded-none bg-black text-white hover:bg-pink-400 hover:text-black transition-colors text-lg"
        >
          <Link href={"/sign-up"}>Start selling</Link>
        </Button>
      </div>
    </>
  );
}
