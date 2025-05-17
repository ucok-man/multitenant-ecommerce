"use client";

import { Button } from "@/components/ui/button";
import { DialogDescription, DialogHeader } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { STORE_NAVBAR_ITEMS } from "@/lib/constant/store-navbar-items";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function NavbarMobile() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className="flex xl:hidden items-center justify-center h-full"
        asChild
      >
        <Button variant={"ghost"} className="border-transparent bg-white !pr-4">
          <MenuIcon className="size-6" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="p-0 transition-none">
        <DialogHeader className="hidden" />
        <DialogDescription className="hidden" />

        <SheetHeader>
          <SheetTitle className="flex items-center font-semibold text-4xl">
            Menu
          </SheetTitle>
        </SheetHeader>

        <Separator />

        <ScrollArea className="flex flex-col h-full max-h-[320px] pb-2">
          {STORE_NAVBAR_ITEMS.map((item, idx) => (
            <Link
              onClick={() => setOpen(false)}
              key={idx}
              href={item.href}
              className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-lg font-medium"
            >
              {item.children}
            </Link>
          ))}
        </ScrollArea>

        <Separator />

        <div className="grid grid-cols-2 px-4 gap-1">
          <Button
            asChild
            variant={"secondary"}
            className="px-12 h-full rounded-none bg-pink-400 border transition-colors text-lg"
          >
            <Link href={"/sign-in"}>Log in</Link>
          </Button>
          <Button
            asChild
            variant={"secondary"}
            className="px-12 h-full rounded-none bg-black text-white hover:bg-pink-400 hover:text-black transition-colors text-lg border"
          >
            <Link href={"/sign-up"}>Start selling</Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
